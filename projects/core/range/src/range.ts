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
  AJF_WARNING_ALERT_SERVICE,
  AjfBaseFieldComponent,
  AjfFormRendererService,
  AjfRangeFieldInstance,
  AjfWarningAlertService,
} from '@ajf/core/forms';
import {ChangeDetectorRef, Directive, Inject, Input, OnInit} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';

@Directive()
export abstract class AjfRange
  extends AjfBaseFieldComponent<AjfRangeFieldInstance>
  implements ControlValueAccessor, OnInit
{
  private _appearance: string = '';
  private _end: number = 10;
  private _name: string = '';
  private _onChangeCallback: (value: any) => void = _ => {};

  private _onTouchedCallback: () => void = () => {};

  private _start: number = 1;
  private _step: number = 1;
  private _value: number = 1;

  constructor(
    public cdr: ChangeDetectorRef,
    service: AjfFormRendererService,
    @Inject(AJF_WARNING_ALERT_SERVICE) was: AjfWarningAlertService,
  ) {
    super(cdr, service, was);
  }

  get appearance(): string {
    return this._appearance;
  }
  @Input()
  set appearance(newAppearance: string) {
    if (newAppearance != null && this._appearance != newAppearance) {
      this._appearance = newAppearance;
      this.cdr.detectChanges();
    }
  }

  get end(): number | undefined {
    return this._end;
  }
  @Input()
  set end(newEnd: number | undefined) {
    if (newEnd != null && this._end != newEnd) {
      this._end = newEnd as number;
      this.cdr.detectChanges();
    }
  }

  get name(): string | undefined {
    return this._name;
  }
  @Input()
  set name(newName: string | undefined) {
    if (newName != null && this._name != newName) {
      this._name = newName;
      this.cdr.detectChanges();
    }
  }

  get start(): number | undefined {
    return this._start;
  }
  @Input()
  set start(newStart: number | undefined) {
    if (newStart != null && this._start != newStart) {
      this._start = newStart;
      this.cdr.detectChanges();
    }
  }

  get step(): number | undefined {
    return this._step;
  }
  @Input()
  set step(newStep: number | undefined) {
    if (newStep != null && this._step !== newStep) {
      this._step = newStep;
      this.cdr.detectChanges();
    }
  }

  get value(): number {
    return this._value;
  }

  set value(newValue: number) {
    if (this._value !== newValue) {
      this._value = newValue;
      this._onChangeCallback(newValue);
      this.cdr.detectChanges();
    }
  }

  override ngOnInit(): void {
    super.ngOnInit();
    if (this.instance != null && this.instance.node != null) {
      const node = this.instance.node;
      if (node.appearance != null) {
        this.appearance = node.appearance;
      }
      if (node.end != null) {
        this.end = node.end;
      }
      if (node.start != null) {
        this.start = node.start;
      }
      if (node.step != null) {
        this.step = node.step;
      }
      if (node.name != null) {
        this.name = node.name;
      }
      if (this.instance != null && this.instance.value != null) {
        this.value = this.instance.value;
      }
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouchedCallback = fn;
  }

  reset(): void {
    this.value = 0;
    this._onTouchedCallback();
  }

  writeValue(value: number): void {
    this.value = value;
  }

  /**
   * Handles rating star clicks by updating the form control value
   * @param starValue The rating value (1-5) to set
   */
  onRatingClick(starValue: number): void {
    this._value = starValue;
    this._onChangeCallback(starValue);
    this._onTouchedCallback();
    this.cdr.detectChanges();
  }
}
