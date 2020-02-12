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
  ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ViewEncapsulation
} from '@angular/core';

import {AjfReportBuilderService} from './report-builder-service';

/**
 * this component handle a group of image object
 * there are 2 types of view
 *  ajf-icon and class
 *
 * take a json in input
 *  'icon': 'false', // if true ajf-icon activated
 *  'class': ['flag-icon'], // add class in object style
 *  'prefixClass': 'flag-icon-', // prefix of class contained on data set
 *  'title': 'flags', title of data set
 *  'data': [
 *    {
 *      'class': 'dz', strind added on prefix
 *      'info': 'Algeria' info related to object (exploit on toolTip)
 *    }
 *  ]
 * };
 *
 * @export
 */
@Component({
  selector: 'ajf-image-group',
  templateUrl: 'image-group.html',
  styleUrls: ['image-group.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AjfReportBuilderImageGroup  {

  private _icon: {fontSet: string, fontIcon: string} | null = null;
  private _classes: string = '';

  get icon(): {fontSet: string, fontIcon: string} | null { return this._icon; }
  get classes(): string { return this._classes; }

  open: boolean = false;
  valueToSearch: string = '';

  @Input()
  data: any;

  /**
   * this event is fired when the user click on formula button on quill editor rool barƒ
   *
   * @memberof QuillEditorComponent
   */
  @Output() formulaClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _service: AjfReportBuilderService) { }


  setIcon(fontSet: string, fontIcon: string) {
    this._icon = {fontSet, fontIcon};
    this._service.setIcon(this._icon);
  }

  setFlag(value: string) {
    this._classes = value;
    this._service.setFlag(value);
  }

  setSearch(value: any) {
    this.valueToSearch = value.currentTarget.value;
  }

  emitFormula() {
    this.formulaClick.emit();
  }

  getFlag(value: string) {
    let returnValue = '';

    for (let i = 0; i < this.data.class.length; i++) {
      returnValue += this.data.class[i] + ' ';
    }

    returnValue += this.data.prefixClass + value;
    return returnValue;
  }

  toggle() {
    this.open = !this.open;
  }

}
