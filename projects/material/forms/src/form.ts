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
  AjfFieldInstance,
  AjfFieldType,
  AjfFormRenderer as CoreFormRenderer,
  AjfFormRendererService,
  AjfRepeatingSlideInstance,
  AjfSlideInstance,
  isRepeatingSlideInstance,
} from '@ajf/core/forms';
import {BooleanInput} from '@angular/cdk/coercion';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {EMPTY, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'ajf-form',
  templateUrl: 'form.html',
  styleUrls: ['form.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AjfFormRenderer
  extends CoreFormRenderer
  implements AfterViewChecked, OnDestroy
{
  /**
   * @deprecated The slide strip has been replaced by the jump menu in the slide
   * header, which is always available. Kept so that existing templates still
   * compile.
   */
  @Input() topBar: boolean = false;

  /**
   * @deprecated Field rows align their labels and controls on a shared grid, so
   * there is nothing left to centre.
   */
  @Input() centeredFieldsContent: boolean = false;

  /** How many field rows sit side by side. */
  @Input() maxColumns: 1 | 2 | 3 = 1;

  /**
   * The page the slider is showing. The slide header is rendered once, above the
   * slider, so it needs to know which slide is on screen; the page slider only
   * reports that imperatively, hence the mirrored property.
   */
  currentPage = 0;

  private _slideList: AjfSlideInstance[] = [];
  private _validitySubscription: Subscription = Subscription.EMPTY;
  private _slidesSubscription: Subscription = Subscription.EMPTY;
  private _valueSubscription: Subscription = Subscription.EMPTY;
  private _pageSubscription: Subscription = Subscription.EMPTY;
  private _pageInit = false;

  constructor(rendererService: AjfFormRendererService, changeDetectorRef: ChangeDetectorRef) {
    super(rendererService, changeDetectorRef);
    this._slidesSubscription = this.slides.subscribe(slides => {
      this._slideList = slides || [];
    });
    // This component is OnPush, and children are only visited when it is
    // checked. The slide header reports live state -- how many fields are
    // filled, how many are failing -- so a value change anywhere in the form has
    // to bring the renderer back into the check.
    this._valueSubscription = this.formGroup
      .pipe(switchMap(fg => (fg ? fg.valueChanges : EMPTY)))
      .subscribe(() => this._changeDetectorRef.markForCheck());
    // Validity moves without a value moving with it -- a visibility change or a
    // recalculated formula is enough -- and the issue counts are read through
    // impure pipes, so this brings the renderer back into the check too.
    this._validitySubscription = this.errors.subscribe(() =>
      this._changeDetectorRef.markForCheck(),
    );
  }

  override ngAfterViewChecked(): void {
    super.ngAfterViewChecked();
    if (!this._pageInit && this.formSlider != null) {
      this._pageInit = true;
      this.currentPage = this.formSlider.currentPage;
      this._pageSubscription = this.formSlider.pageScrollFinish.subscribe(() => {
        this.currentPage = this.formSlider.currentPage;
        this._changeDetectorRef.markForCheck();
      });
    }
  }

  override ngOnDestroy(): void {
    this._slidesSubscription.unsubscribe();
    this._valueSubscription.unsubscribe();
    this._validitySubscription.unsubscribe();
    this._pageSubscription.unsubscribe();
    super.ngOnDestroy();
  }

  fieldStyle(field: AjfFieldInstance): any {
    if (field.node.fieldType === AjfFieldType.Formula && field.node.label === '') {
      return {display: 'none'};
    }
    return {};
  }

  /** Page to the first page of a slide, from the header's jump menu. */
  goToSlide(slide: AjfSlideInstance): void {
    this._slideTo(this._pageOf(slide));
  }

  /** Page to one repetition of the repeating slide currently on screen. */
  goToRep(slide: AjfSlideInstance, repIndex: number): void {
    this._slideTo(this._pageOf(slide) + repIndex);
  }

  goToPrevSlide(): void {
    this.formSlider?.slide({dir: 'up'});
  }

  goToNextSlide(): void {
    this.formSlider?.slide({dir: 'down'});
  }

  /**
   * The slider page a slide starts on. `AjfSlideInstance.position` cannot be
   * used directly here: it does not account for a start message page, and this
   * has to agree with the page arithmetic used by `ajfCurrentSlide`.
   */
  private _pageOf(slide: AjfSlideInstance): number {
    let page = this.hasStartMessage ? 1 : 0;
    for (const cur of this._slideList) {
      if (cur.visible === false) {
        continue;
      }
      if (cur === slide) {
        break;
      }
      page += isRepeatingSlideInstance(cur)
        ? Math.max(1, (cur as AjfRepeatingSlideInstance).reps)
        : 1;
    }
    return page;
  }

  private _slideTo(page: number): void {
    if (this.formSlider != null) {
      this.formSlider.slide({to: page});
    }
  }

  static ngAcceptInputType_fixedOrientation: BooleanInput;
  static ngAcceptInputType_hasEndMessage: BooleanInput;
  static ngAcceptInputType_hasStartMessage: BooleanInput;
  static ngAcceptInputType_hideBottomToolbar: BooleanInput;
  static ngAcceptInputType_hideNavigationButtons: BooleanInput;
  static ngAcceptInputType_hideTopToolbar: BooleanInput;
  static ngAcceptInputType_readonly: BooleanInput;
  static ngAcceptInputType_saveDisabled: BooleanInput;
}
