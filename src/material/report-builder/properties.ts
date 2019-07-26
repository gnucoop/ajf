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
  ChangeDetectionStrategy, Component, EventEmitter, OnInit, OnChanges, OnDestroy, ViewEncapsulation
} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, map, startWith, withLatestFrom} from 'rxjs/operators';

import {
  AjfAggregationType, AjfReportChartWidget, AjfReportTextWidget,
  AjfReportWidget, AjfReportWidgetType, AjfReportLayoutWidget
} from '@ajf/core/reports';
import {AjfForm} from '@ajf/core/forms';
import {AjfCondition} from '@ajf/core/models';
import {deepCopy} from '@ajf/core/utils';

import {AjfReportBuilderFormsAnalyzerDialog} from './forms-analyzer-dialog';
import {AjfFormVariables} from './models';
import {AjfReportBuilderService} from './report-builder-service';

@Component({
  moduleId: module.id,
  selector: 'ajf-report-builder-properties',
  templateUrl: 'properties.html',
  styleUrls: ['properties.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AjfReportBuilderProperties implements OnInit, OnChanges, OnDestroy {
  /**
   *  true when the first time chart type is setted
   *
   * @memberOf AjfReportBuilderProperties
   */
  initChartType = false;

  /**
   * the current widget
   *
   * @memberOf AjfReportBuilderProperties
   */
  currentWidget: AjfReportWidget | null = null;
  get currentLayoutWidget(): AjfReportLayoutWidget {
    return this.currentWidget as AjfReportLayoutWidget;
  }
  get currentTextWidget(): AjfReportTextWidget {
    return this.currentWidget as AjfReportTextWidget;
  }

  /**
   * this array contains the forms exploited for generate data labels
   *
   * @memberOf AjfReportBuilderProperties
   */
  forms: AjfForm[] = [];


  colors: string[] = [];

  /**
   * the name of the section that contains the currentWidget
   *
   * @memberOf AjfReportBuilderProperties
   */
  origin: string;

  /**
   * FAKE DATA
   */

  formsJson: any = {forms: []};

  /**
   * WIDGET
   */

  widgetName = '';
  getHTML: Observable<string | undefined>;
  getHeightWidget: Observable<number | undefined>;
  getFontSizeWidget: Observable<number | undefined>;
  getFontAlignWidget: Observable<number | undefined>;
  getBackgroundColorWidget: Observable<string>;
  getColorWidget: Observable<string>;
  getStyle: Observable<any>;
  getChartBackgroundColor: Observable<string[]>;
  getChartBorderColor: Observable<string[]>;
  getVisibility: Observable<AjfCondition>;
  getColor: Observable<String[]>;

  marginExpanded: boolean = false;
  getMarginWidget: Observable<number[] | undefined>;
  getMarginWidgetTop: Observable<number>;
  getMarginWidgetRight: Observable<number>;
  getMarginWidgetBottom: Observable<number>;
  getMarginWidgetLeft: Observable<number>;

  paddingExpanded: boolean = false;
  getPaddingWidget: Observable<number[] | undefined>;
  getPaddingWidgetTop: Observable<number>;
  getPaddingWidgetRight: Observable<number>;
  getPaddingWidgetBottom: Observable<number>;
  getPaddingWidgetLeft: Observable<number>;

  borderWidthExpanded: boolean = false;
  getBorderWidthWidget: Observable<number[] | undefined>;
  getBorderWidthWidgetTop: Observable<number>;
  getBorderWidthWidgetRight: Observable<number>;
  getBorderWidthWidgetBottom: Observable<number>;
  getBorderWidthWidgetLeft: Observable<number>;

  borderRadiusExpanded: boolean = false;
  getBorderRadiusWidget: Observable<number[] | undefined>;
  getBorderRadiusWidgetTopLeft: Observable<number>;
  getBorderRadiusWidgetTopRight: Observable<number>;
  getBorderRadiusWidgetBottomRight: Observable<number>;
  getBorderRadiusWidgetBottomLeft: Observable<number>;

  backgroundColor = '#127bdc';
  styleBackgroundColor = 'rgb(255,255,255,0)';
  borderColor = '#127bdc';
  styleColor = 'rgb(0,0,0,0)';
  wbackgroundColor: string;
  fontSize: string;
  bubble: string;

  dialogRef: MatDialogRef<AjfReportBuilderFormsAnalyzerDialog>;
  container: AjfFormVariables;



  align = [false, 'center', 'right', 'justify'];

  fonts = [
    false,
    'blackr',
    'black-italic',
    'bold',
    'bold-condensed',
    'bold-condensed-italic',
    'bold-italic',
    'condensed',
    'condensed-italic',
    'italic',
    'light',
    'light-italic',
    'medium',
    'medium-italic',
    'thinr',
    'thin-italic'
  ];
  currentModule: any = {};
  quillModules = {
    toolbar: [
      ['formula'],
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      // ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      // [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': this.colors },
      { 'background': this.colors }],          // dropdown with defaults from theme
      [{ 'font': this.fonts }],
      [{ 'align': this.align }],

      ['clean'],                                         // remove formatting button

      // ['link', 'class', 'video']                         // link and image, video
    ]
  };

  /**
   * CHART
   */


  getChartYLabels: Observable<string[]>;

  chartBorderColor: string[] = [];
  chartBorderWidth = 3;

  /**
   *
   * IMAGE
   */

  imageUrl = 'https://angular.io/resources/images/logos/angular2/angular.png';

  /**
   *
   * TEXT
   */

  htmlText = '';


  /**
   * these variables indicate that the user want to change section
   */
  reportStyles = false;
  sectionStyles = false;
  widgetStyles = true;
  sectionColor = false;
  widgetColor = false;
  visibilitySection = false;
  currentColor = '';

  private _icon: { fontSet: string, fontIcon: string } | null = null;
  get icon(): { fontSet: string, fontIcon: string } | null { return this._icon; }

  iconSet: any = {
    'icon': 'true',
    'title': 'report',
    'data': null
  };

  flagSet: any = {
    'icon': 'false',
    'class': ['flag-icon'],
    'prefixClass': 'flag-icon-',
    'title': 'flags',
    'data': [
      {
        'class': 'dz',
        'info': 'Algeria'
      },
      {
        'class': 'ao',
        'info': 'Angola'
      },
      {
        'class': 'bj',
        'info': 'Benin'
      },
      {
        'class': 'bw',
        'info': 'Botswana'
      },
      {
        'class': 'bf',
        'info': 'Burkina Faso'
      },
      {
        'class': 'bi',
        'info': 'Burundi'
      },
      {
        'class': 'cm',
        'info': 'Cameroon'
      },
      {
        'class': 'cv',
        'info': 'Cabo Verde'
      },
      {
        'class': 'cf',
        'info': 'The Central African Republic'
      },
      {
        'class': 'td',
        'info': 'Chad'
      },
      {
        'class': 'km',
        'info': 'The Comoros'
      },
      {
        'class': 'ci',
        'info': 'Cote D\'avoire'
      },
      {
        'class': 'cd',
        'info': 'The Democratic Republic of Congo'
      },
      {
        'class': 'dj',
        'info': 'Dijibouti'
      },
      {
        'class': 'eg',
        'info': 'Egypt'
      },
      {
        'class': 'gq',
        'info': 'Equatorial Guinea'
      },
      {
        'class': 'er',
        'info': 'Eritrea'
      },
      {
        'class': 'et',
        'info': 'Ethiopia'
      },
      {
        'class': 'tf',
        'info': 'French Southern Territories'
      },
      {
        'class': 'ga',
        'info': 'Gabon'
      },
      {
        'class': 'gm',
        'info': 'The Gambia'
      },
      {
        'class': 'gh',
        'info': 'Ghana'
      },
      {
        'class': 'gn',
        'info': 'Guinea'
      },
      {
        'class': 'gw',
        'info': 'Guinea-Bissau'
      },
      {
        'class': 'ke',
        'info': 'Kenya'
      },
      {
        'class': 'ls',
        'info': 'Leshotho'
      },
      {
        'class': 'lr',
        'info': 'Liberia'
      },
      {
        'class': 'ly',
        'info': 'Libya'
      },
      {
        'class': 'mg',
        'info': 'Madagascar'
      },
      {
        'class': 'mw',
        'info': 'Malawy'
      },
      {
        'class': 'ml',
        'info': 'Mali'
      },
      {
        'class': 'mr',
        'info': 'Mauritania'
      },
      {
        'class': 'mu',
        'info': 'Mauritius'
      },
      {
        'class': 'yt',
        'info': 'Mayotte'
      },
      {
        'class': 'ma',
        'info': 'Marocco'
      },
      {
        'class': 'mz',
        'info': 'Mozambique'
      },
      {
        'class': 'na',
        'info': 'Namibia'
      },
      {
        'class': 'ne',
        'info': 'Niger'
      },
      {
        'class': 'ng',
        'info': 'Nigeria'
      },
      {
        'class': 'cg',
        'info': 'Republic of the Congo'
      },
      {
        'class': 'rw',
        'info': 'Rwnda'
      },
      {
        'class': 're',
        'info': 'rèunion'
      },
      {
        'class': 'sh',
        'info': 'Saint Helena, Ascension and Tristan da Cunha'
      },
      {
        'class': 'st',
        'info': 'Sao Tome and Principe'
      },
      {
        'class': 'sn',
        'info': 'Senegal'
      },
      {
        'class': 'sc',
        'info': 'Seychelles'
      },
      {
        'class': 'sl',
        'info': 'Sierra Leone'
      },
      {
        'class': 'so',
        'info': 'Somalia'
      },
      {
        'class': 'za',
        'info': 'South Africa'
      },
      {
        'class': 'ss',
        'info': 'South Sudan'
      },
      {
        'class': 'sd',
        'info': 'Sudan'
      },
      {
        'class': 'sz',
        'info': 'Swaziland'
      },
      {
        'class': 'tz',
        'info': 'Tanzania'
      },
      {
        'class': 'tg',
        'info': 'Togo'
      },
      {
        'class': 'tn',
        'info': 'Tunisia'
      },
      {
        'class': 'ug',
        'info': 'Uganda'
      },
      {
        'class': 'eh',
        'info': 'Western Sahara'
      },
      {
        'class': 'zm',
        'info': 'Zambia'
      },
      {
        'class': 'zw',
        'info': 'Zimbawe'
      },
      {
        'class': 'iq',
        'info': 'Iraq'
      },
      {
        'class': 'lb',
        'info': 'Lebanon'
      },
      {
        'class': 'bd',
        'info': 'Bangladesh'
      },
      {
        'class': 'ir',
        'info': 'Iran (Islamic Republic of)'
      },
      {
        'class': 'my',
        'info': 'Malaysia'
      },
      {
        'class': 'np',
        'info': 'Nepal'
      },
      {
        'class': 'pk',
        'info': 'Pakistan'
      },
      {
        'class': 'th',
        'info': 'Thailand'
      },
      {
        'class': 'jo',
        'info': 'Jordan'
      },
      {
        'class': 'ye',
        'info': 'Yemen'
      }
    ]
  };

  private _currentWidgetSub: Subscription = Subscription.EMPTY;
  private _formsSub: Subscription = Subscription.EMPTY;
  private _colorSub: Subscription = Subscription.EMPTY;
  private _headerStyleSub: Subscription = Subscription.EMPTY;
  private _contentStylesSub: Subscription = Subscription.EMPTY;
  private _footerStylesSub: Subscription = Subscription.EMPTY;
  private _originSub: Subscription = Subscription.EMPTY;
  private _stylesUpdatesSubs: Subscription = Subscription.EMPTY;

  private _updateWidgetMarginEvt: EventEmitter<{ idx: number, value: any }> =
  new EventEmitter<{ idx: number, value: any }>();
  private _updateWidgetPaddingEvt: EventEmitter<{ idx: number, value: any }> =
  new EventEmitter<{ idx: number, value: any }>();
  private _updateWidgetBorderWidthEvt: EventEmitter<{ idx: number, value: any }> =
  new EventEmitter<{ idx: number, value: any }>();
  private _updateWidgetBorderRadiusEvt: EventEmitter<{ idx: number, value: any }> =
  new EventEmitter<{ idx: number, value: any }>();

  constructor(
    private _dialog: MatDialog,
    private _service: AjfReportBuilderService
  ) {
    this.setForms();

    this.iconSet.data = Object.keys(_service.iconSets).filter(x => x != 'ajf-icon').map(i => {
      return { name: i, icons: _service.iconSets[i] };
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
    this._originSub = this._service.origin.subscribe(s => {
      this.origin = s;
    });
  }


  /**
   *
   * UTILS
   */


  /**
   * return a number value
   *
   * @param value
   *
   * @memberOf AjfReportBuilderProperties
   */
  toNumber(value: string): number {
    let numberPattern = /^(-)?\d+/g;

    if (value == null) {
      return 0;
    } else {
      const matches = value.match(numberPattern);
      if (matches == null || matches.length == 0) { return 0; }
      return Number(matches[0]);
    }
  }

  toNumberArray(value: string): number[] {
    if (value == null) {
      return [];
    } else {
      return (value || '').replace('px', '').split(' ')
        .filter(v => v !== '' && v != null)
        .map(v => this.toNumber(v));
    }
  }

  fillPxNumberArray(value: number[]) {
    const vl = value.length;
    switch (vl) {
      case 0:
        return [0, 0, 0, 0];
      case 1:
        const v = value[0];
        return [v, v, v, v];
      case 2:
        const v21 = value[0];
        const v22 = value[1];
        return [v21, v22, v21, v22];
      case 3:
        const v31 = value[0];
        const v32 = value[1];
        const v33 = value[2];
        return [v31, v32, v33, v32];
      default:
        return value;
    }
  }

  percent(value: number) {
    let temp = this.roundTo(value * 100, 3);
    return temp;
  }

  roundTo(value: number, decimalPositions: number) {
    let i = value * Math.pow(10, decimalPositions);

    i = Math.floor(i);

    return i / Math.pow(10, decimalPositions);
  }
  /**
   * call to service to set the forms
   *
   * @memberOf AjfReportBuilderProperties
   */

  setForms(): void {
    let forms: AjfForm[] = [];
    try {
      for (let i = 0; i < this.formsJson.forms.length; i++) {
        forms.push(AjfForm.fromJson(this.formsJson.forms[i]));
      }
      this._service.setReportForms(forms);
    } catch (e) { }
  }

  /**
   * call to service to set the width of the idx column of layout widget
   *
   * @param col
   * @param idx
   *
   * @memberOf AjfReportBuilderProperties
   */
  instantColumnValue(col: number, idx: number) {
    this._service.instantColumnValue(col, idx);
  }

  /**
   *  force copy of style
   *
   * @memberOf AjfReportBuilderProperties
   */
  // TODO delete this
  setStyle() {
    if (this.currentWidget == null) { return; }
    this.currentWidget.styles = deepCopy(this.currentWidget.styles);
    this._service.updateCurrentWidget(this.currentWidget);
  }

  /**
   * call to service to add new style to widget
   *
   * @param label
   * @param value
   *
   * @memberOf AjfReportBuilderProperties
   */
  setWidgetStyles(label: string, value: any) {
    this._service.setWidgetStyles(label, value);
    this.currentColor = value;
    this.setStyle();
  }

  setWidgetMargin(idx: number, value: any): void {
    this._updateWidgetMarginEvt.emit({ idx, value });
  }

  setWidgetPadding(idx: number, value: any): void {
    this._updateWidgetPaddingEvt.emit({ idx, value });
  }

  setWidgetBorderWidth(idx: number, value: any): void {
    this._updateWidgetBorderWidthEvt.emit({ idx, value });
  }

  setWidgetBorderRadius(idx: number, value: any): void {
    this._updateWidgetBorderRadiusEvt.emit({ idx, value });
  }

  /**
   * call to service to add new style to section
   *
   * @param label
   * @param value
   *
   * @memberOf AjfReportBuilderProperties
   */
  setSectionStyles(label: string, value: any) {
    this._service.setSectionStyles(this.origin, label, value);
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
  setReportStyles(label: string, value: any) {
    this._service.setReportStyles(label, value);
    this.styleBackgroundColor = value;
  }

  /**
   * add custom color
   *
   *
   * @memberOf AjfReportBuilderProperties
   */
  addCustomColor() {
    this._service.addCustomColor(this.currentColor);
    this._service.updateCurrentWidget(this.currentWidget);
  }

  /**
   * get the module exploit to quill text editor
   *
   * @returns
   *
   * @memberOf AjfReportBuilderProperties
   */
  getModule() {
    return this.quillModules;
  }

  /**
   * true is the input type value is equal to current widget type
   *
   * @param value
   * @returns
   *
   * @memberOf AjfReportBuilderProperties
   */
  isChartTypeSelected(value: number) {
    if (this.initChartType == false) {
      return false;
    }
    const myObj = <AjfReportChartWidget>this.currentWidget;
    if (value === myObj.chartType) {
      return true;
    } else {
      return false;
    }
  }


  /* layout functions */

  /**
   * call to service to add a column to current layout widget
   *
   *
   * @memberOf AjfReportBuilderProperties
   */
  addColumn() {
    this._service.addColumn();
  }

  /**
   * call to service to add a obj to current layout widget
   *
   * @param idx
   *
   * @memberOf AjfReportBuilderProperties
   */
  fixedColumn(idx: number) {
    this._service.fixedColumn(idx);
  }

  /**
   * call to service to remove obj of current layout widget
   *
   * @param idx
   *
   * @memberOf AjfReportBuilderProperties
   */
  unfixedColumn(idx: number) {
    this._service.remove('unfixedColumn', idx);
  }

  /* image functions */

  /**
   * call to service to set image url
   *
   *
   * @memberOf AjfReportBuilderProperties
   */
  setImageUrl() {
    this._service.setImageUrl(this.imageUrl);
  }

  setIcon(icon: { fontSet: string, fontIcon: string }) {
    this._icon = icon;
    this._service.setIcon(icon);
  }

  /* chart functions */

  /**
   * call to service to set the type of chart
   *
   * @param type
   *
   * @memberOf AjfReportBuilderProperties
   */
  setChartType(type: number) {
    this.initChartType = true;
    this._service.setChartType(type);
  }

  setChartBorderColor(value: number) {
    this._service.setChartBorderWidth(value);
  }

  tabValue: string = 'backgroundColor';
  setTab(event: any) {
    if (event.index === 0) {
      this.tabValue = 'backgroundColor';
    } else {
      this.tabValue = 'borderColor';
    }
  }

  /**
   * call to service to remove background color to current chart
   *
   * @param index
   *
   * @memberOf AjfReportBuilderProperties
   */
  removeChartBackgroundColor(index: number) {
    this._service.removeChartBackgroundColor(index);
  }

  /**
   * call to service to remove border color to current chart
   *
   * @param index
   *
   * @memberOf AjfReportBuilderProperties
   */
  removeChartBorderColor(index: number) {
    this._service.removeChartBorderColor(index);
  }

  hideMenu() {
    this._service.updateCurrentWidget(null);
  }

  openFormulaDialog(event: any) {
    this.dialogRef = this._dialog.open(AjfReportBuilderFormsAnalyzerDialog);
    this.dialogRef.componentInstance.aggregation = AjfAggregationType.None;
    this.dialogRef.componentInstance.isFormula = true;
    if (event != null && event.reference != null) {
      this.dialogRef.componentInstance.formula = event.formula;
      this.dialogRef.componentInstance.reference = event.reference;
    }

  }

  ngOnInit(): void {
    this._formsSub = this._service.reportForms
      .subscribe(x => {
        this.forms = x || [];
      });

    this._currentWidgetSub = this._service.currentWidget
      .subscribe(x => {
        if (x != null) {
          if (this.currentWidget !== x) {
            this.currentWidget = x;
            this.widgetName = AjfReportWidgetType[x.widgetType];
            this.reportStyles = false;
            this.sectionStyles = false;
            this.widgetStyles = false;
            this.sectionColor = false;
            this.widgetColor = false;
            this.visibilitySection = false;
          }
        } else {
          this.currentWidget = null;
          this.widgetName = '';
        }
      });
    this._colorSub = this._service.colors
      .subscribe(x => {
        if (x && x.length > 0) {
          this.colors = x;

          this.quillModules = {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              // ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],               // custom button values
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
              // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
              // [{ 'direction': 'rtl' }],                         // text direction

              [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

              [{ 'color': this.colors },
              { 'background': this.colors }],          // dropdown with defaults from theme
              [{ 'font': this.fonts }],
              [{ 'align': this.align }],
              ['formula'],
              ['clean'],                                         // remove formatting button

              // ['link', 'class', 'video']                         // link and image, video
            ]
          };
        }
      });


    this.getHTML = this._service.currentWidget.pipe(
      map((widget: AjfReportWidget | null) => {
        if (widget != null) {
          const myObj = <AjfReportTextWidget>this.currentWidget;
          return myObj.htmlText;
        }
        return '';
      }),
      distinctUntilChanged(),
      startWith('<p><br></p>')
    );


    this.getHeightWidget = this._service.currentWidget.pipe(
      filter(x => x != null),
      map((myObj: AjfReportWidget | null) => {
        if (myObj != null) {
          let value = this.toNumber(myObj.styles['height']);
          if (value != null || value != null) {
            return value;
          }
        }
      }),
      distinctUntilChanged()
    );

    this.getFontSizeWidget = this._service.currentWidget.pipe(
      map((myObj: AjfReportWidget | null) => {
        if (myObj != null) {
          return (this.toNumber(myObj.styles['font-size']) || 12);
        }
      }),
      distinctUntilChanged()
    );

    this.getFontAlignWidget = this._service.currentWidget.pipe(
      map((myObj: AjfReportWidget | null) => {
        if (myObj != null) {
          return ((myObj.styles['text-align']) || 'center');
        }
      }),
      distinctUntilChanged()
    );

    this.getBorderWidthWidget = this._service.currentWidget.pipe(
      map((myObj: AjfReportWidget | null) => {
        if (myObj != null) {
          return this.fillPxNumberArray(this.toNumberArray(myObj.styles['border-width']));
        }
      }),
      distinctUntilChanged(),
      startWith([0, 0, 0, 0])
    );
    this.getBorderWidthWidgetTop = this.getBorderWidthWidget.pipe(
      filter(m => m != null),
      map(m => m![0])
    );
    this.getBorderWidthWidgetRight = this.getBorderWidthWidget.pipe(
      filter(m => m != null),
      map(m => m![1])
    );
    this.getBorderWidthWidgetBottom = this.getBorderWidthWidget.pipe(
      filter(m => m != null),
      map(m => m![2])
    );
    this.getBorderWidthWidgetLeft = this.getBorderWidthWidget.pipe(
      filter(m => m != null),
      map(m => m![3])
    );

    this.getBorderRadiusWidget = this._service.currentWidget.pipe(
      map((myObj: AjfReportWidget | null) => {
        if (myObj != null) {
          return this.fillPxNumberArray(this.toNumberArray(myObj.styles['border-radius']));
        }
      }),
      distinctUntilChanged(),
      startWith([0, 0, 0, 0])
    );
    this.getBorderRadiusWidgetTopLeft = this.getBorderRadiusWidget.pipe(
      filter(m => m != null),
      map(m => m![0])
    );
    this.getBorderRadiusWidgetTopRight = this.getBorderRadiusWidget.pipe(
      filter(m => m != null),
      map(m => m![1])
    );
    this.getBorderRadiusWidgetBottomRight = this.getBorderRadiusWidget.pipe(
      filter(m => m != null),
      map(m => m![2])
    );
    this.getBorderRadiusWidgetBottomLeft = this.getBorderRadiusWidget.pipe(
      filter(m => m != null),
      map(m => m![3])
    );

    this.getMarginWidget = this._service.currentWidget.pipe(
      map((myObj: AjfReportWidget | null) => {
        if (myObj != null && myObj.styles != null && myObj.styles['margin'] != null) {
          return this.fillPxNumberArray(this.toNumberArray(myObj.styles['margin']));
        }
      }),
      distinctUntilChanged(),
      startWith([0, 0, 0, 0])
    );
    this.getMarginWidgetTop = this.getMarginWidget.pipe(
      filter(m => m != null),
      map(m => m![0])
    );
    this.getMarginWidgetRight = this.getMarginWidget.pipe(
      filter(m => m != null),
      map(m => m![1])
    );
    this.getMarginWidgetBottom = this.getMarginWidget.pipe(
      filter(m => m != null),
      map(m => m![2])
    );
    this.getMarginWidgetLeft = this.getMarginWidget.pipe(
      filter(m => m != null),
      map(m => m![3])
    );

    this.getPaddingWidget = this._service.currentWidget.pipe(
      map((myObj: AjfReportWidget | null) => {
        if (myObj != null && myObj.styles != null && myObj.styles['padding'] != null) {
          return this.fillPxNumberArray(this.toNumberArray(myObj.styles['padding']));
        }
      }),
      distinctUntilChanged()
    );
    this.getPaddingWidgetTop = this.getPaddingWidget.pipe(
      filter(m => m != null),
      map(m => m![0])
    );
    this.getPaddingWidgetRight = this.getPaddingWidget.pipe(
      filter(m => m != null),
      map(m => m![1])
    );
    this.getPaddingWidgetBottom = this.getPaddingWidget.pipe(
      filter(m => m != null),
      map(m => m![2])
    );
    this.getPaddingWidgetLeft = this.getPaddingWidget.pipe(
      filter(m => m != null),
      map(m => m![3])
    );

    this.getBackgroundColorWidget = this._service.currentWidget.pipe(
      map((myObj: AjfReportWidget | null) => {
        if (myObj != null && myObj.styles != null) {
          return myObj.styles['backgroundColor'] || '';
        }
      }),
      distinctUntilChanged()
    );

    this.getColorWidget = this._service.currentWidget.pipe(
      map((myObj: AjfReportWidget | null) => {
        if (myObj != null && myObj.styles != null) {
          return myObj.styles['color'] || '';
        }
      }),
      distinctUntilChanged()
    );

    this._stylesUpdatesSubs = (<Observable<{idx: any; value: any}>>this._updateWidgetMarginEvt)
      .pipe(withLatestFrom(this.getMarginWidget))
      .subscribe((r: [{ idx: number, value: any }, number[] | undefined]) => {
        if (r == null) { return; }
        const idx = r[0].idx;
        const value = r[0].value;
        const v = r[1] || [0, 0, 0, 0];
        if (v == null || v.length < idx) { return; }
        v[idx] = value;
        this.setWidgetStyles('margin', v);
      });

    this._stylesUpdatesSubs.add((<Observable<{idx: any; value: any}>>this._updateWidgetPaddingEvt)
      .pipe(withLatestFrom(this.getPaddingWidget))
      .subscribe((r: [{ idx: number, value: any }, number[] | undefined]) => {
        if (r == null) { return; }
        const idx = r[0].idx;
        const value = r[0].value;
        const v = r[1] || [0, 0, 0, 0];
        if (v == null || v.length < idx) { return; }
        v[idx] = value;
        this.setWidgetStyles('padding', v);
      }));

    this._stylesUpdatesSubs
      .add((<Observable<{idx: any; value: any}>>this._updateWidgetBorderWidthEvt)
        .pipe(withLatestFrom(this.getBorderWidthWidget))
        .subscribe((r: [{ idx: number, value: any }, number[] | undefined]) => {
          if (r == null) { return; }
          const idx = r[0].idx;
          const value = r[0].value;
          const v = r[1] || [0, 0, 0, 0];
          if (v == null || v.length < idx) { return; }
          v[idx] = value;
          this.setWidgetStyles('border-width', v);
        })
      );

    this._stylesUpdatesSubs.add(
      (<Observable<{idx: any; value: any}>>this._updateWidgetBorderRadiusEvt)
        .pipe(withLatestFrom(this.getBorderRadiusWidget))
        .subscribe((r: [{ idx: number, value: any }, number[] | undefined]) => {
          if (r == null) { return; }
          const idx = r[0].idx;
          const value = r[0].value;
          const v = r[1] || [0, 0, 0, 0];
          if (v == null || v.length < idx) { return; }
          v[idx] = value;
          this.setWidgetStyles('border-radius', v);
        })
      );
  }

  ngOnChanges(changes: any) {
    this.currentWidget = changes.widget.currentValue;
    if (this.currentWidget == null) { return; }
    this.widgetName = AjfReportWidgetType[this.currentWidget.widgetType];
  }

  ngOnDestroy(): void {
    this._currentWidgetSub.unsubscribe();
    this._formsSub.unsubscribe();
    this._colorSub.unsubscribe();
    this._headerStyleSub.unsubscribe();
    this._contentStylesSub.unsubscribe();
    this._footerStylesSub.unsubscribe();
    this._originSub.unsubscribe();
    this._stylesUpdatesSubs.unsubscribe();
  }

}
