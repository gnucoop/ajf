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

import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {ChangeDetectorRef, Directive, EventEmitter, Input, Renderer2,
  OnDestroy} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {BrowserBarcodeReader, Result} from '@zxing/library';
import {Observable, from, of, Subscription} from 'rxjs';
import {catchError, switchMap, debounceTime} from 'rxjs/operators';

@Directive()
export abstract class AjfBarcode implements ControlValueAccessor, OnDestroy {
  protected _readonly: boolean;
  get readonly(): boolean { return this._readonly; }
  @Input() set readonly(readonly: boolean) {
    this._readonly = coerceBooleanProperty(readonly);
    this._cdr.markForCheck();
  }

  readonly codeReader = new BrowserBarcodeReader();

  readonly startDetection = new EventEmitter<void>();
  readonly startCalculation = new EventEmitter<string>();

  readonly _startDetectionSub: Subscription = Subscription.EMPTY;
  readonly _startCalculationSub: Subscription = Subscription.EMPTY;

  private _canvas: HTMLCanvasElement;
  get canvasCtx() {return this._canvas.getContext('2d')!; }

  /**
   * A html video element created at runtime
   *
   * @memberof AjfBarcode
   */
  private _video: HTMLVideoElement;
  get videoSource(): HTMLVideoElement {return this._video; }

  /**
   * implement the control form value.
   * rappresent the barcode value.
   *
   * @memberof AjfBarcode
   */
  private _barcodeValue = '';
  get value(): string { return this._barcodeValue; }
  set value(value: string) {
    if (this._barcodeValue !== value) {
      this._barcodeValue = value;
      this._cdr.detectChanges();
      this._onChangeCallback(value);
    }
  }

  private _toggle = 'drop';
  get toggle() { return this._toggle; }
  set toggle(val: string) {
    this._toggle = val;
    this._cdr.markForCheck();
  }

  private _onChangeCallback = (_: any) => { };
  private _onTouchedCallback = () => {};

  constructor(private _cdr: ChangeDetectorRef, private _renderer: Renderer2) {
    this._init();

    this._startDetectionSub = this.startDetection.asObservable()
      .pipe(
          debounceTime(300),
          switchMap(() => {
              const data: string = this._getDataFromVideo(this.videoSource);
              return this._readBarcodeFromData(data);
          }),
          catchError(() => {
              return of({} as Result);
          })
      )
      .subscribe((result: any) => {
          if (!result.text) {
              this.startDetection.emit();
          } else {
              this.toggle = 'drop';
              this.value = result.text;
          }
      });

    this._startCalculationSub = this.startCalculation.asObservable()
      .pipe(
          switchMap((data: string) => {
              return this._readBarcodeFromData(data);
          })
      ).subscribe((result: any) => {
          if (result.text) {
              this.toggle = 'drop';
              this.value = result.text;
          }
      });
  }

  reset(): void {
    this.value = '';
    this._onTouchedCallback();
  }

  takeSnapshot(): void {
    this.startDetection.emit();
  }

  onSelectFile(evt: Event): void {
    if (evt == null || evt.target == null) { return; }
    const target = evt.target as HTMLInputElement;
    const files = target.files;
    if (files != null && files[0]) {
      let reader = new FileReader();

      reader.readAsDataURL(files[0]);
      reader.onload = (ev: ProgressEvent) => {
        const data: string = (ev.target as FileReader).result as string;
        this.startCalculation.emit(data);
        this._cdr.detectChanges();
      };
    }
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

  ngOnDestroy(): void {
    this._startCalculationSub.unsubscribe();
    this._startDetectionSub.unsubscribe();
  }

  private _init(): void {
    this._initCanvas();
    this._initVideo();
  }

  private _initCanvas(): void {
    this._canvas = this._renderer.createElement('canvas');
    this._canvas.height = 480;
    this._canvas.width = 640;
  }

  private _initVideo(): void {
    this._video = this._renderer.createElement('video');
    this._video.height = 480;
    this._video.width = 640;
  }

  /**
   * write a frame of HTMLVideoElement into HTMLCanvasElement and
   * return the result of toDataURL('image/png')
   *
   * @param video
   * @memberof AjfBarcode
   */
  private _getDataFromVideo(video: HTMLVideoElement): string {
    this.canvasCtx.drawImage(video, 0, 0, 640, 480);
    return this._canvas.toDataURL('image/png');
  }

  /**
   * call @zxing library method with HTMLImageElement as parameter
   *
   * @param img
   * @memberof AjfBarcode
   */
  private _readBarcodeFromImage(img: HTMLImageElement): Observable<Result> {
    return from(this.codeReader.decodeFromImage(img))
        .pipe(catchError(e => of(e as Result)));
  }

  /**
   * build an image by data and call _readBarcodeFromImage
   *
   * @param data
   * @memberof AjfBarcode
   */
  private _readBarcodeFromData(data: string): Observable<Result> {
    const image: HTMLImageElement = this._createImage(data);
    return this._readBarcodeFromImage(image);
  }

  /**
   * build an image by data
   *
   * @param data
   * @memberof AjfBarcode
   */
  private _createImage(data: string): HTMLImageElement {
    const image: HTMLImageElement = this._renderer.createElement('img');
    if (data !== null && typeof data === 'string') {
      image.src = data;
    }
    return image;
  }
}
