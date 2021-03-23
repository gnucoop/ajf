/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {HttpClient} from '@angular/common/http';
import {ChangeDetectorRef, Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Observable, of as obsOf} from 'rxjs';
import {catchError, filter, map, startWith, switchMap} from 'rxjs/operators';

import {AjfBaseFieldComponent} from './base-field';
import {AjfFormRendererService} from './form-renderer';
import {AJF_WARNING_ALERT_SERVICE, AjfWarningAlertService} from './warning-alert-service';

export type AjfVideoProvider = 'youtube'|'vimeo';

interface VideoInfo {
  provider: AjfVideoProvider;
  id: string;
}

/**
 * It allows the loading of video(youtube or vimeo) url inside an AjfForm.
 *
 * @export
 * @class AjfVideoUrlFieldComponent
 */
export class AjfVideoUrlFieldComponent extends AjfBaseFieldComponent {
  readonly validUrl: Observable<boolean>;
  readonly videoThumbnail: Observable<SafeResourceUrl>;

  constructor(
      cdr: ChangeDetectorRef, service: AjfFormRendererService,
      @Inject(AJF_WARNING_ALERT_SERVICE) was: AjfWarningAlertService, domSanitizer: DomSanitizer,
      httpClient: HttpClient) {
    super(cdr, service, was);

    const video = this.control.pipe(
        filter(control => control != null),
        switchMap(control => {
          control = control as FormControl;
          return control.valueChanges.pipe(
              startWith(control.value),
          );
        }),
        filter(value => value != null),
        map(value => getVideoProviderAndId(value as string)),
    );
    this.validUrl = video.pipe(map(v => v != null));
    this.videoThumbnail = video.pipe(
        filter(info => info != null),
        switchMap(info => videoPreviewUrl(httpClient, info as VideoInfo)),
        filter(url => url != null),
        map(url => domSanitizer.bypassSecurityTrustResourceUrl(url as string)),
    );
  }
}

/**
 * it returns a url of thumbnail related to video or null.
 *
 * @param httpClient
 * @param video
 * @return {*}
 */
function videoPreviewUrl(httpClient: HttpClient, video: VideoInfo): Observable<string|null> {
  if (video.provider === 'youtube') {
    return obsOf(`https://img.youtube.com/vi/${video.id}/default.jpg`);
  }
  if (video.provider === 'vimeo') {
    return httpClient
               .get<{thumbnail_url: string}>(
                   `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${video.id}`)
               .pipe(
                   map(response => response.thumbnail_url),
                   catchError(() => obsOf(null)),
                   ) as Observable<string|null>;
  }
  return obsOf('');
}

/**
 * It checks the url param, if url is an youtube o vimeo domain return
 * an videoInfo else null
 *
 * @param url
 * @return {*}
 */
function getVideoProviderAndId(url: string): VideoInfo|null {
  let provider: AjfVideoProvider|null = null;
  let id: string|null = null;
  if (/youtube|youtu\.be|y2u\.be|i.ytimg\./.test(url)) {
    provider = 'youtube';
    id = getYouTubeVideoId(url);
  } else if (/vimeo/.test(url)) {
    provider = 'vimeo';
    id = getVimeoVideoId(url);
  }
  if (provider == null || id == null) {
    return null;
  }
  return {provider, id};
}

/**
 * it gets the id of vimeo video url.
 *
 * @param url
 * @return {*}
 */
function getVimeoVideoId(url: string): string|null {
  if (url.indexOf('#') > -1) {
    url = url.split('#')[0];
  }
  if (url.indexOf('?') > -1 && url.indexOf('clip_id=') === -1) {
    url = url.split('?')[0];
  }

  let id: string|null = null;
  let arr: string[];

  const vimeoPipe = [
    'https?:\/\/vimeo\.com\/[0-9]+$', 'https?:\/\/player\.vimeo\.com\/video\/[0-9]+$',
    'https?:\/\/vimeo\.com\/channels', 'groups', 'album'
  ].join('|');

  const vimeoRegex = new RegExp(vimeoPipe, 'gim');

  if (vimeoRegex.test(url)) {
    arr = url.split('/');
    if (arr && arr.length) {
      id = arr.pop() as string;
    }
  } else if (/clip_id=/gim.test(url)) {
    arr = url.split('clip_id=');
    if (arr && arr.length) {
      id = arr[1].split('&')[0];
    }
  }

  return id;
}

/**
 * it gets the id of youtube video url.
 *
 * @param url
 * @return {*}
 */
function getYouTubeVideoId(url: string): string|null {
  const shortcode = /youtube:\/\/|https?:\/\/youtu\.be\/|http:\/\/y2u\.be\//g;
  if (shortcode.test(url)) {
    const shortcodeId = url.split(shortcode)[1];
    return stripParameters(shortcodeId);
  }
  // /v/ or /vi/
  const inlinev = /\/v\/|\/vi\//g;

  if (inlinev.test(url)) {
    const inlineId = url.split(inlinev)[1];
    return stripParameters(inlineId);
  }

  // v= or vi=
  const parameterV = /v=|vi=/g;

  if (parameterV.test(url)) {
    const arr = url.split(parameterV);
    return arr[1].split('&')[0];
  }

  // v= or vi=
  const parameterWebp = /\/an_webp\//g;

  if (parameterWebp.test(url)) {
    const webp = url.split(parameterWebp)[1];
    return stripParameters(webp);
  }

  // embed
  const embedReg = /\/embed\//g;

  if (embedReg.test(url)) {
    const embedId = url.split(embedReg)[1];
    return stripParameters(embedId);
  }

  // ignore /user/username pattern
  const usernameReg = /\/user\/([a-zA-Z0-9]*)$/g;

  if (usernameReg.test(url)) {
    return null;
  }

  // user
  const userReg = /\/user\/(?!.*videos)/g;

  if (userReg.test(url)) {
    const elements = url.split('/');
    return stripParameters(elements.pop() as string);
  }

  // attribution_link
  const attrReg = /\/attribution_link\?.*v%3D([^%&]*)(%26|&|$)/;

  if (attrReg.test(url)) {
    return (url.match(attrReg) as string[])[1];
  }

  return null;
}

function stripParameters(url: string): string {
  // Split parameters or split folder separator
  if (url.indexOf('?') > -1) {
    return url.split('?')[0];
  } else if (url.indexOf('/') > -1) {
    return url.split('/')[0];
  }
  return url;
}
