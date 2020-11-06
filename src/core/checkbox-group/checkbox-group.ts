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

import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  AfterContentInit,
  Directive,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';


export const AJF_CHECKBOX_GROUP_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AjfCheckboxGroup),
  multi: true
};

export class AjfCheckboxGroupItemChange<T> {
  source: AjfCheckboxGroupItem<T>;
  value: any;
}

export class AjfCheckboxGroupChange<T> {
  source: AjfCheckboxGroup<T>;
  value: any;
}

let _uniqueIdCounter = 0;


@Directive({
  selector: 'ajf-checkbox-group,[ajf-checkbox-group]',
  providers: [AJF_CHECKBOX_GROUP_VALUE_ACCESSOR]
})
export class AjfCheckboxGroup<T> implements AfterContentInit, ControlValueAccessor {
  checkboxes: AjfCheckboxGroupItem<T>[] = [];

  /** The value for the button toggle group. Should match currently selected button toggle. */
  private _value: T[] = [];
  get value(): T[] {
    return this._value;
  }
  @Input()
  set value(newValue: T[]) {
    if (this._value !== newValue) {
      this._value = newValue;
      this._updateSelectedCheckboxesFromValue();
      this._emitChangeEvent();
    }
  }

  /** The HTML name attribute applied to toggles in this group. */
  private _name: string;
  get name(): string {
    return this._name;
  }
  @Input()
  set name(value: string) {
    this._name = value;
    this._updateCheckboxesNames();
  }

  /** Disables all toggles in the group. */
  private _disabled: boolean = false;
  get disabled(): boolean {
    return this._disabled;
  }
  @Input()
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
  }

  /** The currently selected button toggle, should match the value. */
  private _selected: AjfCheckboxGroupItem<T>[] = [];
  get selected() {
    return this._selected;
  }
  set selected(selected: AjfCheckboxGroupItem<T>[]) {
    this._selected = selected;
    let values: T[] = [];
    if (selected) {
      selected.forEach(c => {
        values.push(c.value);
        if (!c.checked) {
          c.checked = true;
        }
      });
    }
    this._value = values;
  }

  /** Event emitted when the group's value changes. */
  private _change: EventEmitter<AjfCheckboxGroupChange<T>> =
      new EventEmitter<AjfCheckboxGroupChange<T>>();
  @Output()
  readonly change: Observable<AjfCheckboxGroupChange<T>> =
      this._change as Observable<AjfCheckboxGroupChange<T>>;

  /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
  onTouched: () => any = () => {};

  /**
   * Implemented as part of ControlValueAccessor.
   */
  writeValue(value: T[]) {
    this.value = value;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  registerOnChange(fn: (value: T[]) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  addValue(value: T) {
    let curValue = (this._value || []).slice(0);
    if (curValue.indexOf(value) === -1) {
      curValue.push(value);
      this.value = curValue;
    }
  }

  removeValue(value: T) {
    let curValue = (this._value || []).slice(0);
    let idx = curValue.indexOf(value);
    if (idx > -1) {
      curValue.splice(idx, 1);
      this.value = curValue;
    }
  }

  ngAfterContentInit(): void {
    this._updateCheckboxesNames();
    this._updateSelectedCheckboxesFromValue();
  }

  registerItem(item: AjfCheckboxGroupItem<T>): void {
    this.checkboxes.push(item);
  }

  /** The method to be called in order to update ngModel. */
  private _controlValueAccessorChangeFn: (value: any) => void = (_) => {};

  private _updateCheckboxesNames(): void {
    if (this.checkboxes == null) {
      return;
    }
    this.checkboxes.forEach((checkbox) => {
      if (checkbox == null) {
        return;
      }
      checkbox.name = this._name;
    });
  }

  private _updateSelectedCheckboxesFromValue(): void {
    if (this.checkboxes == null) {
      return;
    }
    this.checkboxes.forEach(checkbox => {
      if (checkbox == null) {
        return;
      }
      if ((this._value || []).indexOf(checkbox.value) > -1) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    });
  }

  /** Dispatch change event with current selection and group value. */
  private _emitChangeEvent(): void {
    let event = new AjfCheckboxGroupChange<T>();
    event.source = this;
    event.value = this._value;
    this._controlValueAccessorChangeFn(event.value);
    this._change.emit(event);
  }

  static ngAcceptInputType_disabled: BooleanInput;
}

@Directive()
export class AjfCheckboxGroupItem<T> implements OnInit {
  /** The unique ID for this button toggle. */
  private _checkboxId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  readonly checkboxId: Observable<string> = this._checkboxId as Observable<string>;

  @Input()
  set id(id: string) {
    this._checkboxId.next(id);
  }

  @Input() name: string;

  /** The parent button toggle group (exclusive selection). Optional. */
  readonly checkboxGroup: AjfCheckboxGroup<T>;

  /** Whether or not this button toggle is checked. */
  private _checkedState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly checkedState: Observable<boolean> = this._checkedState as Observable<boolean>;
  get checked(): boolean {
    return this._checkedState.getValue();
  }
  @Input()
  set checked(checked: boolean) {
    this._checkedState.next(checked);
  }

  /** Whether or not this button toggle is disabled. */
  private _disabledState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly disabledState: Observable<boolean> = this._disabledState as Observable<boolean>;
  get disabled(): boolean {
    const disabled = this._disabledState.getValue();
    return disabled || (this.checkboxGroup != null && this.checkboxGroup.disabled);
  }
  @Input()
  set disabled(disabled: boolean) {
    this._disabledState.next(disabled != null && disabled !== false);
  }

  /** Value assigned to this button toggle. */
  private _value: T;
  get value(): T {
    return this._value;
  }
  @Input()
  set value(value: T) {
    if (this._value !== value) {
      this._value = value;
    }
  }

  private _checkedIconVal: BehaviorSubject<string> = new BehaviorSubject<string>('');
  get checkedIcon(): string {
    return this._checkedIconVal.getValue();
  }
  @Input()
  set checkedIcon(icon: string) {
    this._checkedIconVal.next(icon);
  }

  private _notCheckedIconVal: BehaviorSubject<string> = new BehaviorSubject<string>('');
  get notCheckedIcon(): string {
    return this._notCheckedIconVal.getValue();
  }
  @Input()
  set notCheckedIcon(icon: string) {
    this._notCheckedIconVal.next(icon);
  }

  readonly icon: Observable<string>;

  /** Event emitted when the group value changes. */
  private _change: EventEmitter<AjfCheckboxGroupItemChange<T>> =
      new EventEmitter<AjfCheckboxGroupItemChange<T>>();
  @Output()
  readonly change: Observable<AjfCheckboxGroupItemChange<T>> =
      this._change as Observable<AjfCheckboxGroupItemChange<T>>;

  constructor(checkboxGroup?: AjfCheckboxGroup<T>) {
    this.icon = combineLatest(this._checkedState, this._checkedIconVal, this._notCheckedIconVal)
                    .pipe(
                        map(([checked, checkedIcon, notCheckedIcon]) =>
                                (checked ? checkedIcon : notCheckedIcon) as string),
                    );

    if (checkboxGroup) {
      this.checkboxGroup = checkboxGroup;
      this.checkboxGroup.registerItem(this);
    }
  }

  ngOnInit() {
    if (this.id == null) {
      this.id = `ajf-checkbox-group-item-${_uniqueIdCounter++}`;
    }

    if (this.checkboxGroup && this.checkboxGroup.value &&
        this.checkboxGroup.value.indexOf(this._value) > -1) {
      this.checked = true;
    }
  }

  /** Checks the button toggle due to an interaction with the underlying native input. */
  onInputChange(event: Event) {
    event.stopPropagation();

    this._toggle();
  }

  /** Toggle the state of the current button toggle. */
  private _toggle(): void {
    this.checked = !this.checked;

    if (this.checkboxGroup != null) {
      if (this.checked) {
        this.checkboxGroup.addValue(this._value);
      } else {
        this.checkboxGroup.removeValue(this._value);
      }
    }
  }
}
