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

import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2
} from '@angular/core';

@Directive({selector: '[ajfVideoDirective]'})
export class AjfVideoDirective implements AfterViewInit {
  private _source: HTMLVideoElement;
  get source() {
    return this._source;
  }
  @Input()
  set source(source: HTMLVideoElement) {
    this._source = source;
    this._initCam();
  }

  @Output() isInit: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _el: ElementRef, private _renderer: Renderer2) {}

  private _initCam() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(<MediaStreamConstraints>{video: true})
          .then((stream: MediaStream) => {
            (this._source as any).srcObject = stream;
            (this._source as any).play();
          })
          .catch((err: MediaStreamError) => {
            console.log(err);
          });
    }
  }

  ngAfterViewInit(): void {
    this._renderer.appendChild(this._el.nativeElement, this._source);
    this.isInit.emit();
  }
}
