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

import {AjfPageSlider, AjfPageSliderOrientation} from '@ajf/core/page-slider';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {delayWhen, map, withLatestFrom} from 'rxjs/operators';

import {AjfFormField} from './field';
import {AjfFormInitStatus, AjfFormRendererService} from './form-renderer';

import {AjfFieldType} from './interface/fields/field-type';
import {AjfForm} from './interface/forms/form';
import {AjfNodeGroupInstance} from './interface/nodes-instances/node-group-instance';
import {AjfNodeInstance} from './interface/nodes-instances/node-instance';
import {AjfRepeatingSlideInstance} from './interface/slides-instances/repeating-slide-instance';
import {AjfSlideInstance} from './interface/slides-instances/slide-instance';
import {nodeInstanceCompleteName} from './utils/nodes-instances/node-instance-complete-name';

export class AjfFormActionEvent {
  source: AjfFormRenderer;
  value: Object;
  action: string;
}

@Directive()
export abstract class AjfFormRenderer implements AfterViewChecked, AfterViewInit, OnDestroy {
  // formGroup is an Observable FormGroup type
  readonly formGroup: Observable<FormGroup|null>;

  //  slides is an observable AjfSlide array type
  readonly slides: Observable<AjfSlideInstance[]>;
  readonly slidesNum: Observable<number>;
  readonly errors: Observable<number>;
  readonly formIsInit: Observable<boolean>;

  // ajfFieldTypes [ Text, Number, Boolean, SingleChoice, MultipleChoice,
  // Formula, Empty, Composed, LENGTH ]
  readonly ajfFieldTypes = AjfFieldType;

  @Input() title: string;

  private _orientationChange: EventEmitter<AjfPageSliderOrientation> =
      new EventEmitter<AjfPageSliderOrientation>();
  @Output()
  readonly orientationChange: Observable<AjfPageSliderOrientation> =
      this._orientationChange as Observable<AjfPageSliderOrientation>;

  private _saveDisabled: boolean = false;
  get saveDisabled(): boolean {
    return this._saveDisabled;
  }
  @Input()
  set saveDisabled(saveDisabled: boolean) {
    this._saveDisabled = coerceBooleanProperty(saveDisabled);
    this._changeDetectorRef.markForCheck();
  }

  private _hasStartMessage = false;
  get hasStartMessage(): boolean {
    return this._hasStartMessage;
  }
  @Input()
  set hasStartMessage(hasStartMessage: boolean) {
    this._hasStartMessage = coerceBooleanProperty(hasStartMessage);
    this._changeDetectorRef.markForCheck();
  }

  private _hasEndMessage = false;
  get hasEndMessage(): boolean {
    return this._hasEndMessage;
  }
  @Input()
  set hasEndMessage(hasEndMessage: boolean) {
    this._hasEndMessage = coerceBooleanProperty(hasEndMessage);
    this._changeDetectorRef.markForCheck();
  }

  private _hideTopToolbar = false;
  get hideTopToolbar(): boolean {
    return this._hideTopToolbar;
  }
  @Input()
  set hideTopToolbar(hideTopToolbar: boolean) {
    this._hideTopToolbar = coerceBooleanProperty(hideTopToolbar);
    this._changeDetectorRef.markForCheck();
  }

  private _hideBottomToolbar = false;
  get hideBottompToolbar(): boolean {
    return this._hideBottomToolbar;
  }
  @Input()
  set hideBottomToolbar(hideBottomToolbar: boolean) {
    this._hideBottomToolbar = coerceBooleanProperty(hideBottomToolbar);
    this._changeDetectorRef.markForCheck();
  }

  private _hideNavigationButtons = false;
  get hideNavigationButtons(): boolean {
    return this._hideNavigationButtons;
  }
  @Input()
  set hideNavigationButtons(hideNavigationButtons: boolean) {
    this._hideNavigationButtons = coerceBooleanProperty(hideNavigationButtons);
    this._changeDetectorRef.markForCheck();
  }

  private _fixedOrientation = false;
  get fixedOrientation(): boolean {
    return this._fixedOrientation;
  }
  @Input()
  set fixedOrientation(fixedOrientation: boolean) {
    this._fixedOrientation = coerceBooleanProperty(fixedOrientation);
    this._changeDetectorRef.markForCheck();
  }

  private _readonly = false;
  get readonly(): boolean {
    return this._readonly;
  }
  @Input()
  set readonly(readonly: boolean) {
    this._readonly = coerceBooleanProperty(readonly);
    this._changeDetectorRef.markForCheck();
  }

  private _orientation: AjfPageSliderOrientation = 'horizontal';
  get orientation(): AjfPageSliderOrientation {
    return this._orientation;
  }
  @Input()
  set orientation(orientation: AjfPageSliderOrientation) {
    if (orientation !== 'horizontal' && orientation !== 'vertical') {
      return;
    }
    if (orientation !== this._orientation) {
      this._orientation = orientation;
      this._changeDetectorRef.markForCheck();
      this._orientationChange.emit(this._orientation);
    }
  }

  @ViewChild('formSlider', {static: false}) formSlider: AjfPageSlider;
  @ViewChildren(AjfFormField) fields: QueryList<AjfFormField>;

  private _errorMoveEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  // _errorPositions is a private subject structure that contains next and prev
  private _errorPositions: Observable<number[]>;

  // _form is a private ajFForm
  private _form: AjfForm;
  // _init is a private boolean
  private _init = false;

  private _nextSlideSubscription: Subscription = Subscription.EMPTY;
  private _errorMoveSubscription: Subscription = Subscription.EMPTY;

  private _formAction: EventEmitter<AjfFormActionEvent> = new EventEmitter<AjfFormActionEvent>();
  @Output()
  readonly formAction: Observable<AjfFormActionEvent> =
      this._formAction as Observable<AjfFormActionEvent>;

  @Input()
  set form(form: AjfForm) {
    this._form = form;

    if (this._init) {
      this._rendererService.setForm(this._form);
    }
  }

  /**
   * this constructor will init current formula by ajfBuilderService
   */
  constructor(
      private _rendererService: AjfFormRendererService,
      protected _changeDetectorRef: ChangeDetectorRef) {
    this.formGroup = _rendererService.formGroup;
    this.slides = _rendererService.nodesTree;
    this._errorPositions = _rendererService.errorPositions;
    this.errors = _rendererService.errors;
    this.slidesNum = _rendererService.slidesNum;
    this.formIsInit =
        _rendererService.formInitEvent.pipe(map(e => e === AjfFormInitStatus.Complete));
  }

  /**
   * this method will scroll to next error received by subscribe
   */
  goToNextError(): void {
    this._errorMoveEvent.emit(true);
  }
  /**
   * this method will scroll to prev error received by subscribe
   */
  goToPrevError(): void {
    this._errorMoveEvent.emit(false);
  }

  /**
   * this method will add group
   */
  addGroup(nodeGroup: AjfNodeGroupInstance|AjfSlideInstance|AjfRepeatingSlideInstance): void {
    let s = this._rendererService.addGroup(nodeGroup as AjfNodeGroupInstance)
                .pipe(
                    delayWhen(() => this.formSlider.pageScrollFinish),
                    )
                .subscribe(
                    (r) => {
                      if (r && this.formSlider != null) {
                        this.formSlider.slide({dir: 'down'});
                      }
                    },
                    (_e) => {
                      if (s) {
                        s.unsubscribe();
                      }
                    },
                    () => {
                      if (s) {
                        s.unsubscribe();
                      }
                    });
  }

  /**
   * this method will remove group
   */
  removeGroup(nodeGroup: AjfNodeGroupInstance|AjfSlideInstance|AjfRepeatingSlideInstance): void {
    let s = this._rendererService.removeGroup(nodeGroup as AjfNodeGroupInstance)
                .pipe(
                    delayWhen(() => this.formSlider.pageScrollFinish),
                    )
                .subscribe(
                    (r) => {
                      if (r && this.formSlider != null) {
                        this.formSlider.slide({dir: 'up'});
                      }
                    },
                    (_e) => {
                      if (s) {
                        s.unsubscribe();
                      }
                    },
                    () => {
                      if (s) {
                        s.unsubscribe();
                      }
                    });
  }

  onSave(_evt: any): void {
    this._formAction.emit(
        {source: this, action: 'save', value: this._rendererService.getFormValue()});
  }

  onFormAction(_evt: any, action: string) {
    this._formAction.emit(
        {source: this, value: this._rendererService.getFormValue(), action: action});
  }

  /**
   * this method will set current form in rederer service when init form
   */
  ngAfterViewInit(): void {
    if (this._form != null) {
      this._rendererService.setForm(this._form);
      this._changeDetectorRef.detectChanges();
    }
  }

  ngAfterViewChecked(): void {
    if (!this._init && this.formSlider != null) {
      this._init = true;

      this._errorMoveSubscription =
          (<Observable<boolean>>this._errorMoveEvent)
              .pipe(withLatestFrom(this._errorPositions))
              .subscribe(([move, errs]) => {
                const currentPosition = this.formSlider.currentPage - (+this.hasStartMessage) + 1;
                if (errs == null) {
                  return;
                }
                const errors = errs as number[];

                let found = false;
                let prevIdx = -1;
                let nextIdx = -1;
                let idx = 0;
                let errorsLen = errors.length;
                while (!found && idx < errorsLen) {
                  if (errors[idx] == currentPosition) {
                    found = true;
                    prevIdx = idx > 0 ? idx - 1 : errorsLen - 1;
                    nextIdx = idx < errorsLen - 1 ? idx + 1 : 0;
                  } else if (errors[idx] > currentPosition) {
                    found = true;
                    prevIdx = idx > 0 ? idx - 1 : errorsLen - 1;
                    nextIdx = idx;
                  }
                  idx++;
                }
                if (!found) {
                  prevIdx = errorsLen - 1;
                  nextIdx = 0;
                }

                this.formSlider.slide({to: move ? errors[nextIdx] - 1 : errors[prevIdx] - 1});
                this._changeDetectorRef.detectChanges();
              });
    }
  }

  ngOnDestroy(): void {
    this._nextSlideSubscription.unsubscribe();
    this._errorMoveSubscription.unsubscribe();
    this._orientationChange.complete();
    this._errorMoveEvent.complete();
    this._formAction.complete();
  }

  orientationChangeHandler(orientation: AjfPageSliderOrientation): void {
    this.orientation = orientation;
  }

  trackNodeById(_: number, node: AjfNodeInstance): string {
    return nodeInstanceCompleteName(node);
  }
}
