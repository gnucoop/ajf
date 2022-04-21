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

import {ChangeDetectorRef, Directive, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {BrowserMultiFormatReader, IScannerControls} from '@zxing/browser';

type AjfVideoFacingMode = 'user' | 'environment';

@Directive()
export abstract class AjfBarcode implements ControlValueAccessor {
  @ViewChild('barcodeVideo', {read: ElementRef}) barcodeVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('barcodeVideoPreview', {read: ElementRef})
  barcodeVideoPreview!: ElementRef<HTMLDivElement>;
  @ViewChild('barcodeImagePreview', {read: ElementRef})
  barcodeImagePreview!: ElementRef<HTMLImageElement>;

  /**
   * A html video element created at runtime
   *
   * @memberof AjfBarcode
   */
  private _video?: HTMLVideoElement;
  get videoSource(): HTMLVideoElement | undefined {
    return this._video;
  }

  /**
   * implement the control form value.
   * rappresent the barcode value.
   *
   * @memberof AjfBarcode
   */
  private _barcodeValue = '';
  get value(): string {
    return this._barcodeValue;
  }
  set value(value: string) {
    if (this._barcodeValue !== value) {
      this._barcodeValue = value;
      this._cdr.detectChanges();
      this._onChangeCallback(value);
    }
  }

  private _supportsVideoStream = false;
  get supportsVideoStream(): boolean {
    return this._supportsVideoStream;
  }

  private _toggle = 'drop';
  get toggle() {
    return this._toggle;
  }
  set toggle(val: string) {
    this._toggle = val;
    this._cdr.markForCheck();
  }

  private _showSwitchButton = false;
  get showSwitchButton(): boolean {
    return this._showSwitchButton;
  }

  private _deviceId?: string;
  private _streams = [] as AjfVideoFacingMode[];
  private _currentStream = -1;
  private _scannerControls?: IScannerControls;
  private _codeReader = new BrowserMultiFormatReader();

  private _onChangeCallback = (_: any) => {};
  private _onTouchedCallback = () => {};

  constructor(protected _cdr: ChangeDetectorRef, private _renderer: Renderer2) {
    this._supportsVideoStream =
      navigator.mediaDevices != null &&
      navigator.mediaDevices.enumerateDevices != null &&
      navigator.mediaDevices.getUserMedia != null;
    this._initVideoStreams();
  }

  reset(): void {
    this.value = '';
    this._onTouchedCallback();
  }

  onSelectFile(evt: Event): void {
    if (evt == null || evt.target == null) {
      return;
    }
    const target = evt.target as HTMLInputElement;
    const files = target.files as FileList;
    this._onSelect(files);
  }

  onSelectDrop(files: FileList): void {
    if (files == null) {
      return;
    }
    this._onSelect(files);
  }

  onTabChange(idx: number): void {
    if (this._scannerControls != null) {
      this._scannerControls.stop();
      this._scannerControls = undefined;
    }
    if (idx === 1) {
      this._setCurrentStream();
      if (this.barcodeVideo == null || this.barcodeVideoPreview == null) {
        return;
      }
      const video = this.barcodeVideo.nativeElement;
      const preview = this.barcodeVideoPreview.nativeElement;
      this._renderer.addClass(preview, 'ajf-video-preview-hidden');
      this._codeReader
        .decodeFromVideoElement(video, result => {
          if (result == null) {
            return;
          }
          if (this._scannerControls != null) {
            this._scannerControls.stop();
          }
          video.pause();
          const points = result.getResultPoints();
          const nw = points[0];
          const se = points[1];
          const lx = Math.max((nw.getX() / video.videoWidth) * video.clientWidth, -10, 0);
          const ly = Math.max((nw.getY() / video.videoHeight) * video.clientHeight - 10, 0);
          const rx = Math.min(
            (se.getX() / video.videoWidth) * video.clientWidth + 10,
            video.clientWidth,
          );
          const ry = Math.min(
            (se.getY() / video.videoHeight) * video.clientHeight + 10,
            video.clientHeight,
          );
          this._renderer.setStyle(preview, 'top', `${ly}px`);
          this._renderer.setStyle(preview, 'left', `${lx}px`);
          this._renderer.setStyle(preview, 'width', `${rx - lx}px`);
          this._renderer.setStyle(preview, 'height', `${ry - ly}px`);
          this._renderer.removeClass(preview, 'ajf-video-preview-hidden');
          this.value = result.getText();
        })
        .then(controls => (this._scannerControls = controls));
    }
  }

  switchCamera(): void {
    const newStream = (this._currentStream + 1) % this._streams.length;
    if (newStream === this._currentStream) {
      return;
    }
    this._currentStream = newStream;
    this._setCurrentStream();
  }

  /** ControlValueAccessor implements */
  writeValue(value: string) {
    this._barcodeValue = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouchedCallback = fn;
  }

  private _onSelect(files: FileList): void {
    if (files != null && files.length > 0 && files[0]) {
      let reader = new FileReader();

      reader.readAsDataURL(files[0]);
      reader.onload = (ev: ProgressEvent) => {
        if (!ev.loaded) {
          return;
        }
        const data = reader.result as string;
        this._setImagePreview(`url(${data})`);
        this._codeReader
          .decodeFromImageUrl(data)
          .then(res => {
            this.value = res.getText();
          })
          .catch(() => {});
      };
    }
  }

  private _setImagePreview(img: string): void {
    if (this.barcodeImagePreview != null) {
      this._renderer.setStyle(this.barcodeImagePreview.nativeElement, 'background-image', img);
    }
  }

  private _initVideoStreams(): void {
    if (!this._supportsVideoStream) {
      return;
    }
    navigator.mediaDevices
      .enumerateDevices()
      .then(devices => {
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        if (videoDevices.length === 0) {
          this._supportsVideoStream = false;
          throw new Error('No video device found');
        }
        return videoDevices[0];
      })
      .then(device => {
        const {deviceId} = device;
        const facingModes = ['environment', 'user'] as AjfVideoFacingMode[];
        const streamQueries = facingModes.map(facingMode => {
          return navigator.mediaDevices
            .getUserMedia({
              audio: false,
              video: {deviceId, advanced: [{facingMode}]},
            })
            .then(stream => ({stream, facingMode}));
        });
        this._deviceId = deviceId;
        return Promise.all(streamQueries);
      })
      .then(streams => {
        this._streams = [];
        const tracksIds = [] as string[];
        const tracksLabels = [] as string[];
        streams.forEach(({stream, facingMode}) => {
          if (stream == null) {
            return;
          }
          const tracks = stream.getTracks();
          let addStream = false;
          if (
            tracks.find(t => tracksIds.indexOf(t.id) === -1 && tracksLabels.indexOf(t.label) === -1)
          ) {
            tracks.forEach(t => {
              tracksIds.push(t.id);
              tracksLabels.push(t.label);
            });
            addStream = true;
          }
          if (addStream) {
            this._streams.push(facingMode);
          }
        });
        if (this._streams.length === 0) {
          throw new Error('No stream available');
        }
        this._showSwitchButton = this._streams.length > 1;
        this._currentStream = 0;
        this._setCurrentStream();
      })
      .catch(() => (this._supportsVideoStream = false))
      .finally(() => this._cdr.markForCheck());
  }

  private _setCurrentStream(): void {
    if (
      this.barcodeVideo == null ||
      this._deviceId == null ||
      this._streams.length === 0 ||
      this._currentStream < 0 ||
      this._currentStream >= this._streams.length
    ) {
      return;
    }
    const video = this.barcodeVideo.nativeElement;
    const facingMode = this._streams[this._currentStream];
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {deviceId: this._deviceId, advanced: [{facingMode}]},
      })
      .then(stream => {
        video.srcObject = stream;
      });
  }
}
