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

import {AjfWidget} from '@ajf/core/reports';
import {deepCopy} from '@ajf/core/utils';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';

import {AjfReportBuilderService} from './report-builder-service';
import {AjfReportBuilderThemeColorDialog} from './theme-color-dialog';

/**
 * this component manages the report text
 *
 * @export
 */
@Component({
  selector: 'ajf-theme-color',
  templateUrl: 'theme-color.html',
  styleUrls: ['theme-color.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AjfReportBuilderThemeColor implements OnInit, OnDestroy {
  currentWidget: AjfWidget|null = null;

  alphaColor: number = 1;
  colors: string[];
  currentColor: string;

  getColorWidget: Observable<string>;

  dialogRef: MatDialogRef<AjfReportBuilderThemeColorDialog>;

  styleBackgroundColor = 'rgb(255,255,255,0)';
  styleColor = 'rgb(0,0,0,0)';

  @Input() section: string;

  @Input() label: string;

  @Input() init: string;

  /**
   * the name of the section that contains the currentWidget
   *
   * @memberOf AjfReportBuilderProperties
   */
  origin: string;

  private _colorsSub: Subscription = Subscription.EMPTY;
  private _currentWidgetSub: Subscription = Subscription.EMPTY;
  private _originSub: Subscription = Subscription.EMPTY;
  private _headerStyleSub: Subscription = Subscription.EMPTY;
  private _contentStylesSub: Subscription = Subscription.EMPTY;
  private _footerStylesSub: Subscription = Subscription.EMPTY;

  constructor(private _service: AjfReportBuilderService, public dialog: MatDialog) {}

  setStyles(value: any) {
    switch (this.section) {
      case 'widget':
        this.setWidgetStyles(value);
        break;
      case 'report':
        this.setReportStyles(value);
        break;
      case 'section':
        this.setSectionStyles(value);
        break;
      case 'chart':
        this.setChartStyle(value);
        break;
    }
  }

  setChartStyle(value: any) {
    if (this.label === 'backgroundColor') {
      this.addChartBackgroundColor(value);
    } else {
      this.addChartBorderColor(value);
    }
  }

  setAlphaColor(value: any) {
    value = value.toFixed(2);
    for (let i = 0; i < this.colors.length; i++) {
      let lastComma = this.colors[i].lastIndexOf(',');
      this.colors[i] = this.colors[i].substring(0, lastComma) + ',' + value + ')';
    }
  }

  /**
   * call to service to add new style to widget
   *
   * @param label
   * @param value
   *
   * @memberOf AjfReportBuilderProperties
   */
  setWidgetStyles(value: any) {
    if (this.section === 'chart') {
      this.setChartStyle(value);
    } else {
      this._service.setWidgetStyles(this.label, value);
      this.currentColor = value;
      this.setStyle();
    }
  }

  /**
   * call to service to add new style to section
   *
   * @param label
   * @param value
   *
   * @memberOf AjfReportBuilderProperties
   */
  setSectionStyles(value: any) {
    this._service.setSectionStyles(this.origin, this.label, value);
    this.styleColor = value;
  }

  /**
   * call to service to add new style to report
   *
   * @param label
   * @param value
   *
   * @memberOf AjfReportBuilderProperties
   */
  setReportStyles(value: any) {
    this._service.setReportStyles(this.label, value);
    this.styleBackgroundColor = value;
  }

  /**
   * call to service to add background color to current chart
   *
   *
   * @memberOf AjfReportBuilderProperties
   */
  addChartBackgroundColor(value: any) {
    this._service.addChartBackgroundColor(value);
  }

  /**
   * call to service to add border color to current chart
   *
   *
   * @memberOf AjfReportBuilderProperties
   */
  addChartBorderColor(value: any) {
    this._service.addChartBorderColor(value);
  }

  setStyle() {
    if (this.currentWidget == null) {
      return;
    }
    this.currentWidget.styles = deepCopy(this.currentWidget.styles);
    this._service.updateCurrentWidget(this.currentWidget);
  }

  openDialog() {
    this.dialogRef = this.dialog.open(AjfReportBuilderThemeColorDialog);
  }

  ngOnInit() {
    this._colorsSub = this._service.colors.subscribe(x => {
      this.colors = x;
    });

    this._currentWidgetSub = this._service.currentWidget.subscribe(x => {
      if (x != null) {
        if (this.currentWidget !== x) {
          this.currentWidget = x;
        }
      } else {
        this.currentWidget = null;
      }
    });

    this.getColorWidget = this._service.currentWidget.pipe(
        map((myObj: AjfWidget|null) => {
          if (myObj != null) {
            return myObj.styles['color'] || '';
          }
        }),
        distinctUntilChanged());

    this._originSub = this._service.origin.subscribe(s => {
      this.origin = s;
    });

    this._headerStyleSub = this._service.headerStyles.subscribe(s => {
      if (s['background-color'] != null) {
        this.styleBackgroundColor = s['background-color'];
      }
    });
    this._contentStylesSub = this._service.contentStyles.subscribe(s => {
      if (s['background-color'] != null) {
        this.styleBackgroundColor = s['background-color'];
      }
    });
    this._footerStylesSub = this._service.footerStyles.subscribe(s => {
      if (s['background-color'] != null) {
        this.styleBackgroundColor = s['background-color'];
      }
    });
  }

  ngOnDestroy(): void {
    this._colorsSub.unsubscribe();
    this._currentWidgetSub.unsubscribe();
    this._originSub.unsubscribe();
    this._headerStyleSub.unsubscribe();
    this._contentStylesSub.unsubscribe();
    this._footerStylesSub.unsubscribe();
  }
}
