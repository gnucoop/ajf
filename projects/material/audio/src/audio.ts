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

import {AjfAudio} from '@ajf/core/audio';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'ajf-audio',
  templateUrl: 'audio.html',
  styleUrls: ['audio.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AjfAudioComponent,
      multi: true,
    },
  ],
})
export class AjfAudioComponent extends AjfAudio implements OnDestroy {
  @Input() readonly = false;

  isRecording = false;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: any[] = [];

  constructor(cdr: ChangeDetectorRef, private _sanitizer: DomSanitizer) {
    super(cdr);
  }

  ngOnDestroy(): void {
    this.stopRecording();
  }

  /**
   * Sanitizes the audio source for playback, either from the base64 content
   * or, as a fallback, from the stored url.
   */
  get safeAudioSrc(): SafeUrl | string | null {
    if (!this.value) return null;
    if (!this.value.content && this.value.deleteUrl) return null;

    const rawUrl =
      this.value.content && this.value.content.length ? this.value.content : this.value.url;
    if (!rawUrl) return null;

    return this._sanitizer.bypassSecurityTrustUrl(rawUrl);
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio: true});
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = event => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, {type: 'audio/webm'});

        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          const head = 'data:audio/webm;base64,';
          const audioFileSize = Math.round(((base64data.length - head.length) * 3) / 4);
          // Keeps the old url to delete old audio from storage
          this.value = {
            name: 'audio.webm',
            type: 'audio/webm',
            size: audioFileSize,
            content: base64data,
            url: this.value?.url ?? undefined,
            deleteUrl: false,
          };
          this._cdr.markForCheck();
        };
      };

      this.mediaRecorder.start();
      this.isRecording = true;
      this._cdr.markForCheck();
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
      this._cdr.markForCheck();
    }
  }

  /**
   * Clears the recording value and preview (keeps the old url to delete old audio from storage)
   */
  clearRecording(): void {
    this.audioChunks = [];
    this.value = {
      name: 'audio.webm',
      type: 'audio/webm',
      size: undefined,
      content: undefined,
      url: this.value?.url ?? undefined,
      deleteUrl: true,
    };
    this._cdr.markForCheck();
  }
}
