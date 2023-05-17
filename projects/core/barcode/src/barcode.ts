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
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {MatSelect} from '@angular/material/select';
import {BrowserMultiFormatReader, IScannerControls} from '@zxing/browser';
import {Observable, from, throwError} from 'rxjs';
import {catchError, map, take, tap} from 'rxjs/operators';

@Directive()
export abstract class AjfBarcode implements ControlValueAccessor {
  resetEvt: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('barcodeVideo', {read: ElementRef}) barcodeVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('barcodeVideoPreview', {read: ElementRef})
  barcodeVideoPreview!: ElementRef<HTMLDivElement>;
  @ViewChild('barcodeImagePreview', {read: ElementRef})
  barcodeImagePreview!: ElementRef<HTMLImageElement>;
  /**
   * The Mat select component for choosing the preferred video source
   */
  @ViewChild('videoSourceSelect') videoSourceSelect!: MatSelect;

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

  /**
   * An observable of all video mediaDevices
   */
  private _videoDevices: Observable<MediaDeviceInfo[]>;
  get videoDevices() {
    return this._videoDevices;
  }

  /**
   * The mediastream currently being streamed
   */
  private _currentVideoStream: MediaStream | null = null;
  get currentVideoStream() {
    return this._currentVideoStream;
  }

  private _scannerControls?: IScannerControls;
  private _codeReader = new BrowserMultiFormatReader();

  private _onChangeCallback = (_: any) => {};
  private _onTouchedCallback = () => {};

  constructor(protected _cdr: ChangeDetectorRef, private _renderer: Renderer2) {
    this._supportsVideoStream =
      navigator.mediaDevices != null && navigator.mediaDevices.enumerateDevices != null;
    this._videoDevices = this._getVideoDevices();
  }

  reset(): void {
    this.value = '';
    const video = this.barcodeVideo.nativeElement;
    this.resetEvt.emit();
    this.initVideoStreams();
    video.play();
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
      this.initVideoStreams();
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
        .then(controls => {
          this._scannerControls = controls;
          this.stopCurrentStream();
          video.pause();
        });
    }
  }

  switchCamera(): void {
    this.initVideoStreams();
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

  protected initVideoStreams(): void {
    this.getStream().pipe(take(1)).subscribe();
  }

  /**
   * Gets all video mediaDevices (cameras)
   * @returns An observable with all video mediaDevices
   */
  private _getVideoDevices(): Observable<MediaDeviceInfo[]> {
    return from(navigator.mediaDevices.enumerateDevices()).pipe(
      map(devices => devices.filter(device => device.kind === 'videoinput')),
    );
  }

  /**
   * Gets the current video stream and updates the video element source
   * @returns An observable of the current media stream
   */
  protected getStream(): Observable<MediaStream> {
    if (this._currentVideoStream) {
      this._currentVideoStream.getTracks().forEach(track => {
        track.stop();
      });
    }
    const videoSource: string | undefined = this.videoSourceSelect?.value as string | undefined;
    const constraints = {
      video: {deviceId: videoSource ? {exact: videoSource} : undefined},
    };
    return from(navigator.mediaDevices.getUserMedia(constraints)).pipe(
      tap(stream => {
        this._gotStream(stream);
      }),
      catchError(err => throwError(() => err)),
    );
  }

  /**
   * Updates the video element source with the current video stream
   * @param stream The video stream
   */
  private _gotStream(stream: MediaStream | null) {
    this._currentVideoStream = stream;
    this.barcodeVideo.nativeElement.srcObject = stream;
    this._cdr.markForCheck();
  }

  stopCurrentStream(): void {
    const video = this.barcodeVideo.nativeElement;
    const stream: MediaStream | null = video.srcObject as MediaStream | null;
    if (stream == null) return;
    const tracks = stream.getVideoTracks();
    tracks.forEach(track => track.stop());
  }
}
