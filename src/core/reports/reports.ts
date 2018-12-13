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

import {AjfForm} from '@ajf/core/forms';
import {AjfJsonSerializable} from '@ajf/core/models';
import {deepCopy} from '@ajf/core/utils';

import {AjfReportStyles} from './report-styles';
import {AjfReportWidget} from './widgets';


export class AjfReportContainer extends AjfJsonSerializable {
  private _content: AjfReportWidget[];
  get content(): AjfReportWidget[] { return this._content; }

  private _styles: AjfReportStyles;
  get styles(): AjfReportStyles { return this._styles; }

  static fromJson(obj: any): AjfReportContainer {
    obj = deepCopy(obj);
    let keys: string[] = Object.keys(obj);

    if (keys.indexOf('content') > -1 && obj['content'] instanceof Array) {
      obj['content'] = obj['content'].map((cw: any) => AjfReportWidget.fromJson(cw));
    }

    return new AjfReportContainer(obj);
  }

  constructor(obj?: any) {
    super(obj);

    this.jsonExportedMembers = this.jsonExportedMembers.concat(['content', 'styles']);

    this._content = obj && obj.content || [];
    this._styles = obj && obj.styles || {};
  }
}
/**
 * Class that represents a report.
 * A report is defined as three trees of report widgets (@see AjfReportWidget),
 * displayed each in the header / content / footer of the report.
 *
 */
export class AjfReport extends AjfJsonSerializable {
  /**
   * Collection of widgets that compose the report header
   */
  private _header: AjfReportContainer;
  get header(): AjfReportContainer { return this._header; }

  /**
   * Collection of widgets that compose the report footer
   */
  private _footer: AjfReportContainer;
  get footer(): AjfReportContainer { return this._footer; }

  /**
   * Collection of widgets that compose the report content
   */
  private _content: AjfReportContainer;
  get content(): AjfReportContainer { return this._content; }

  private _styles: AjfReportStyles;
  get styles(): AjfReportStyles { return this._styles; }

  set styles(styles: AjfReportStyles) {
    this._styles = styles;
  }

  /**
   * collection of forms that generate the report variables
   *
   * @memberOf AjfReport
   */
  private _forms: AjfForm[];
  get forms(): AjfForm[] { return this._forms; }
  set forms(forms: AjfForm[]) {
    this._forms = forms;
  }

  /**
   * Creates a report starting from a JSON representation.
   * The form definition can be nested in the report JSON.
   * @param obj : any The JSON representation of the report
   * @param form : AjfForm The form that defines the data structure
   * @return AjfReport The report
   */
  static fromJson(obj: any, forms?: AjfForm[]): AjfReport {
    obj = deepCopy(obj);
    const keys: string[] = Object.keys(obj);

    const containers: string[] = ['header', 'footer', 'content'];
    containers.forEach((c) => {
      if (keys.indexOf(c) > -1) {
        obj[c] = AjfReportContainer.fromJson(obj[c]);
      }
    });

    return new AjfReport(forms || [], obj);
  }

  /**
   * Creates a report.
   * @param form : AjfForm The form that defines the data structure
   * @param obj : any Report initial data
   */
  constructor(forms: AjfForm[], obj?: any) {
    super(obj);

    this._forms = forms.slice(0);

    this.jsonExportedMembers = this.jsonExportedMembers
      .concat(['header', 'footer', 'content', 'styles']);

    this._header = obj && obj.header || null;
    this._footer = obj && obj.footer || null;
    this._content = obj && obj.content || null;
    this._styles = obj && obj.styles || null;
  }
}
