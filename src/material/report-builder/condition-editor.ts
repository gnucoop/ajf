/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {Subscription, timer} from 'rxjs';

import {AjfCondition} from '@ajf/core/models';
import {AjfFormVariables} from './models';
import {AjfReportBuilderService} from './report-builder-service';
import {sanitizeConditionString} from './utils';


@Component({
  moduleId: module.id,
  selector: 'ajf-report-builder-condition-editor',
  templateUrl: 'condition-editor.html',
  styleUrls: ['condition-editor.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * This class will define an ajf builder builder condition editor
 * @implements : OnDestroy
 * @implements : AfterViewInit
 */
export class AjfReportBuilderConditionEditor implements OnInit, OnDestroy {

  @Input()
  visibility: AjfCondition;

  formsVariables: AjfFormVariables[];
  isValid = false;
  names: string[] = [];
  currentId: number;

  // conditionText is a string
  conditionText = 'true';

  a: any;
  b: any;


  @ViewChild('conditionTextArea', {static: false}) conditionTextArea: any;
  @ViewChild('errorMessage', {static: false}) errorMessage: any;

  //  operators is an array of any type that contains all allow operators
  operators: string[] = [
    '( )', '\' \'',
    '<', '<=', '==', '>=', '>', '!=', '!',
    '&&', '||',
    '+', '-', '*', '/', '%',
    'true', 'false'
  ];

  private _conditionNamesSub: Subscription = Subscription.EMPTY;

  /**
   * this constructor will init current condition by ajfBuilderservice
   * and init condition and availableFieldNames subscriptions
   */
  constructor(
    private _service: AjfReportBuilderService
  ) {

  }
  extractNames(formsVariables: AjfFormVariables[]) {
    this.names.length = 0;
    for (let i = 0; i < formsVariables.length; i++) {
      this.names = this.names.concat(formsVariables[i].names);
    }
  }

  setCurrent(id: number, index: number) {
    this.currentId = id;
    this.appendText(this.formsVariables[id].names[index]);
    this.checkValidation();
  }

  /**
   * this method will return success if the current condtion is valid
   * @return boolean
   */
  validateCondition(): boolean {
    return AjfCondition.validate(this.conditionText, this.names);
  }

  // TODO complete the comment
  /**
   * this method will append text to json
   * @param text      : string -
   * @param goBackNum : number -
   */
  appendText(text: string, _goBackNum?: number): void {
    if (text == null || this.conditionTextArea == null) {
      return;
    }

    let el = this.conditionTextArea.nativeElement;
    let sStart: number = Math.min(el.selectionStart, el.selectionEnd);
    let sEnd: number = Math.max(el.selectionStart, el.selectionEnd);
    let startingString: string = this.conditionText.substr(0, sStart);
    let endingString: string = this.conditionText.substr(sEnd);
    let initialLenght: number = startingString.length;
    let newStr = '';

    startingString = sanitizeConditionString(startingString);
    endingString = sanitizeConditionString(endingString);
    sStart += startingString.length - initialLenght +
      text.length + (startingString.length > 0 ? 2 : 1);
    newStr = startingString.length > 0 ? `${startingString} ` : '';
    this.conditionText = `${newStr}${text} ${endingString}`;

    const s = timer(0).subscribe(() => {
      if (s && !s.closed) { s.unsubscribe(); }
      if (el.createTextRange) {
        let range = el.createTextRange();
        range.move('character', sStart);
        range.select();
      } else {
        if (el.selectionStart) {
          el.focus();
          el.setSelectionRange(sStart, sStart);
        } else {
          el.focus();
        }
      }
    });
  }

  checkValidation() {
    this.isValid = this.validateCondition();
    if (this.isValid) {
      this.saveCondition();
    }
  }

  /**
   * this method will save current condition
   */
  saveCondition(): void {
    this._service.saveCondition(this.conditionText);
  }

  /**
   * this method will hide the error message
   */
  hideErrorMessage(): void {
    if (this.errorMessage == null) {
      return;
    }
  }

  ngOnInit(): void {
    this.conditionText = this.visibility.condition;
    this.isValid = true;

    if (this.conditionText == 'true') {
      this.conditionText = '';
    }

    this._conditionNamesSub = this._service.conditionNames
      .subscribe((x) => {
        this.formsVariables = x;
        if (x != null) {
          this.extractNames(this.formsVariables);
        }
      });

  }
  /**
   * this method will destroy a conditionSubscriptions
   */
  ngOnDestroy(): void {
    this._conditionNamesSub.unsubscribe();
  }
}
