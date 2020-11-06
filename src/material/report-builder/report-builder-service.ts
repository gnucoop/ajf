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

import {AjfField, AjfFieldType, AjfForm, AjfNode, AjfNodeType, flattenNodes} from '@ajf/core/forms';
import {AjfFormula, createFormula} from '@ajf/core/models';
import {
  AjfAggregation,
  AjfChartWidget,
  AjfColumnWidget,
  AjfCustomWidget,
  AjfDataWidget,
  AjfImageWidget,
  AjfLayoutWidget,
  AjfReport,
  AjfReportContainer,
  AjfStyles,
  AjfTableWidget,
  AjfTextWidget,
  AjfWidget,
  AjfWidgetType,
  createAggregation,
  createWidget
} from '@ajf/core/reports';
import {deepCopy} from '@ajf/core/utils';
import {EventEmitter, Inject, Injectable, Optional} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {
  combineLatest,
  filter,
  map,
  publishReplay,
  refCount,
  scan,
  share,
  startWith
} from 'rxjs/operators';

import {AjfFormVariables, AjfReportIcons, AjfReportsConfig, AjfWidgetsContainer} from './models';
import {
  AjfColorOperation,
  AjfCustomWidgetsOperation,
  AjfFormVariablesOperation,
  AjfReportFormsOperation,
  AjfStylesOperation,
  AjfWidgetOperation,
  AjfWidgetsOperation
} from './operations';
import {AJF_REPORTS_CONFIG} from './tokens';

/**
 * This service contains all the logic to model the report widget.
 *
 * @export
 */
@Injectable()
export class AjfReportBuilderService {
  /**
   *  this Observable observe the customWidgets obj
   *
   * @memberOf AjfReportBuilderService
   */
  private _customWidgets: Observable<AjfCustomWidget[]>;
  private _customWidgetsUpdate: Subject<AjfCustomWidgetsOperation> =
      new Subject<AjfCustomWidgetsOperation>();

  /**
   * this Observable observe the name of the section that contains the current widget.
   *
   * @memberOf AjfReportBuilderService
   */
  private _origin: Observable<string>;
  private _originUpdate: Subject<string> = new Subject<string>();

  /**
   * this Observable observe the exported json
   *
   * @memberOf AjfReportBuilderService
   */
  private _savedReport: Observable<AjfReport>;
  private _savedReportUpdate: Subject<AjfReport> = new Subject<AjfReport>();

  private _jsonStack: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  private _lastDeletedJson: string|undefined;

  private _emptyContent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  /**
   *  this Observable observe if is fired drag mouse event.
   *
   * @memberOf AjfReportBuilderService
   */
  private _onDragged: Observable<boolean>;
  private _onDraggedUpdate: Subject<boolean> = new Subject<boolean>();


  private _onOver: Observable<boolean>;
  private _onOverUpdate: Subject<boolean> = new Subject<boolean>();


  /**
   * this Observable observe the status of permanent zoom
   *
   * @memberOf AjfReportBuilderService
   */
  private _fixedZoom: Observable<boolean>;
  private _fixedZoomUpdate: Subject<boolean> = new Subject<boolean>();


  /**
   *  this Observable observe if is fired drag mouse event.
   *
   * @memberOf AjfReportBuilderService
   */
  private _onDragEnter: Observable<any>;
  private _onDragEnterUpdate: Subject<any> = new Subject<any>();

  /**
   * Observe the header widget array.
   *
   * @memberOf AjfReportBuilderService
   */
  private _headerWidgets: Observable<AjfWidgetsContainer>;
  private _headerWidgetsUpdate: Subject<AjfWidgetsOperation> = new Subject<AjfWidgetsOperation>();

  /**
   * observe the header styles.
   *
   * @memberOf AjfReportBuilderService
   */
  private _headerStyles: Observable<AjfStyles>;

  /**
   * Observe the content widget array
   *
   * @memberOf AjfReportBuilderService
   */
  private _contentWidgets: Observable<AjfWidgetsContainer>;
  private _contentWidgetsUpdate: Subject<AjfWidgetsOperation> = new Subject<AjfWidgetsOperation>();

  /**
   * this Observable observe the content styles.
   *
   * @memberOf AjfReportBuilderService
   */
  private _contentStyles: Observable<AjfStyles>;

  /**
   * this Observable observe the footer widget array.
   *
   * @memberOf AjfReportBuilderService
   */
  private _footerWidgets: Observable<AjfWidgetsContainer>;
  private _footerWidgetsUpdate: Subject<AjfWidgetsOperation> = new Subject<AjfWidgetsOperation>();


  private _color: Observable<string[]>;
  private _colorUpdate: Subject<AjfColorOperation> = new Subject<AjfColorOperation>();
  private _defaultColor: string[] = [
    'rgba(0, 0, 0, 1)',       'rgba(51, 153, 255, 1)',  'rgba(153, 204, 0, 1)',
    'rgba(255, 102, 0, 1)',   'rgba(0, 204, 204, 1)',   'rgba(204, 204, 153, 1)',
    'rgba(255, 153, 0, 1)',   'rgba(230, 0, 0, 1)',     'rgba(255, 153, 0, 1)',
    'rgba(255, 255, 0, 1)',   'rgba(0, 138, 0, 1)',     'rgba(0, 102, 204, 1)',
    'rgba(153, 51, 255, 1)',  'rgba(255, 255, 255, 1)', 'rgba(250, 204, 204, 1)',
    'rgba(255, 235, 204, 1)', 'rgba(255, 255, 204, 1)', 'rgba(204, 232, 204, 1)',
    'rgba(204, 224, 245, 1)', 'rgba(235, 214, 255, 1)', 'rgba(187, 187, 187, 1)',
    'rgba(240, 102, 102, 1)', 'rgba(255, 194, 102, 1)', 'rgba(255, 255, 102, 1)',
    'rgba(102, 185, 102, 1)', 'rgba(102, 163, 224, 1)', 'rgba(194, 133, 255, 1)',
    'rgba(136, 136, 136, 1)', 'rgba(161, 0, 0, 1)',     'rgba(178, 107, 0, 1)',
    'rgba(178, 178, 0, 1)',   'rgba(0, 97, 0, 1)',      'rgba(0, 71, 178, 1)',
    'rgba(107, 36, 178, 1)',  'rgba(68, 68, 68, 1)',    'rgba(92, 0, 0, 1)',
    'rgba(102, 61, 0, 1)',    'rgba(102, 102, 0, 1)',   'rgba(0, 55, 0, 1)',
    'rgba(0, 41, 102, 1)',    'rgba(61, 20, 102, 1)'
  ];


  /**
   * this Observable observe the footer styles.
   *
   * @memberOf AjfReportBuilderService
   */
  private _footerStyles: Observable<AjfStyles>;

  /**
   *  this Observable observe the current widget which holds the focus.
   *
   * @memberOf AjfReportBuilderService
   */
  private _currentWidget: Observable<AjfWidget|null>;
  private _currentWidgetUpdate: BehaviorSubject<AjfWidgetOperation|null> =
      new BehaviorSubject<AjfWidgetOperation|null>(null);


  /**
   * Observe the AjfFormVariables exploit for field selecting from forms
   *
   * @memberOf AjfReportBuilderService
   */
  private _formsVariables: Observable<AjfFormVariables[]>;
  private _formsVariablesUpdate: BehaviorSubject<AjfFormVariablesOperation|null> =
      new BehaviorSubject<AjfFormVariablesOperation|null>(null);

  /**
   * Observe the AjfFormVariables exploit for field selecting from forms
   *
   * @memberOf AjfReportBuilderService
   */
  private _conditionNames: Observable<AjfFormVariables[]>;
  private _conditionNamesUpdate: BehaviorSubject<AjfFormVariablesOperation|null> =
      new BehaviorSubject<AjfFormVariablesOperation|null>(null);

  /**
   * this BehaviorSubject update export report.
   *
   * @memberOf AjfReportBuilderService
   */
  private _saveReport: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  /**
   * this BehaviorSubject contains the AjfReport.
   *
   * @memberOf AjfReportBuilderService
   */
  private _report: BehaviorSubject<AjfReport|null> = new BehaviorSubject<AjfReport|null>(null);

  /**
   *  this Observable observe the styles of report.
   *
   * @memberOf AjfReportBuilderService
   */
  private _reportStyles: Observable<AjfStyles>;
  private _reportStylesUpdate: Subject<AjfStylesOperation> = new Subject<AjfStylesOperation>();

  /**
   * observe the forms fetched
   *
   * @memberOf AjfReportBuilderService
   */
  private _reportForms: Observable<AjfForm[]>;
  private _reportFormsUpdate: Subject<AjfReportFormsOperation> =
      new Subject<AjfReportFormsOperation>();

  /**
   * dictionary for  widgetsUpdate
   *
   * @memberOf AjfReportBuilderService
   */
  private _updates: any = {
    header: this._headerWidgetsUpdate,
    content: this._contentWidgetsUpdate,
    footer: this._footerWidgetsUpdate,
    color: this._colorUpdate,
    customWidgets: this._customWidgetsUpdate
  };

  /**
   * event emitter that notify when wont to save report
   *
   * @memberOf AjfReportBuilderService
   */
  private _saveReportEvent: EventEmitter<void> = new EventEmitter<void>();

  private _saveFormulaTOHtml: EventEmitter<any> = new EventEmitter<any>();

  getFormulaToHtmlEvent(): Observable<string> {
    return this._saveFormulaTOHtml as Observable<string>;
  }

  /**
   * event emitter that notify when column width changed
   *
   * @memberOf AjfReportBuilderService
   */
  columnWidthChangedEmitter: EventEmitter<void> = new EventEmitter<void>();

  private _iconSets: AjfReportIcons = {'ajf-icon': []};
  get iconSets(): AjfReportIcons {
    return this._iconSets;
  }

  /**
   * Creates an instance of AjfReportBuilderService.
   *
   * @memberOf AjfReportBuilderService
   */
  constructor(@Optional() @Inject(AJF_REPORTS_CONFIG) reportsConfig: AjfReportsConfig) {
    this._lastDeletedJson = '';

    if (reportsConfig != null) {
      if (reportsConfig.icons != null) {
        this._iconSets = {...this._iconSets, ...reportsConfig.icons};
      }
    }

    this._origin = (<Observable<string>>this._originUpdate).pipe(startWith('header'), share());

    this._savedReport = (<Observable<AjfReport>>this._savedReportUpdate).pipe(share());

    this._onDragged = (<Observable<boolean>>this._onDraggedUpdate).pipe(startWith(false), share());

    this._onOver = (<Observable<boolean>>this._onOverUpdate).pipe(startWith(false), share());

    this._fixedZoom = (<Observable<boolean>>this._fixedZoomUpdate).pipe(startWith(false), share());

    this._onDragEnter = this._onDragEnterUpdate.pipe(share());

    this._reportStyles = (<Observable<AjfStylesOperation>>this._reportStylesUpdate)
                             .pipe(scan((styles: AjfStyles, op: AjfStylesOperation) => {
                                     return op(styles);
                                   }, <AjfStyles>{}), share(), startWith(<AjfStyles>{}));

    this._reportForms = (<Observable<AjfReportFormsOperation>>this._reportFormsUpdate)
                            .pipe(scan((forms: AjfForm[], op: AjfReportFormsOperation) => {
                                    return op(forms);
                                  }, []), share(), startWith([]));

    this._customWidgets =
        (<Observable<AjfCustomWidgetsOperation>>this._customWidgetsUpdate)
            .pipe(scan((widgets: AjfCustomWidget[], op: AjfCustomWidgetsOperation) => {
                    return op(widgets);
                  }, []), share(), startWith([]));

    this._formsVariables =
        (<Observable<AjfFormVariablesOperation>>this._formsVariablesUpdate)
            .pipe(
                filter(s => s != null),
                scan((variables: AjfFormVariables[], op: AjfFormVariablesOperation) => {
                  return op(variables);
                }, []), publishReplay(1), refCount());

    this._conditionNames =
        (<Observable<AjfFormVariablesOperation>>this._conditionNamesUpdate)
            .pipe(
                filter(s => s != null),
                scan((variables: AjfFormVariables[], op: AjfFormVariablesOperation) => {
                  return op(variables);
                }, []), share(), startWith([]));

    this._headerWidgets = (<Observable<AjfWidgetsOperation>>this._headerWidgetsUpdate)
                              .pipe(
                                  scan(
                                      (widgets: AjfWidgetsContainer, op: AjfWidgetsOperation) => {
                                        return op(widgets);
                                      },
                                      <AjfWidgetsContainer>{widgets: [], styles: {}}),
                                  startWith(<AjfWidgetsContainer>{widgets: [], styles: {}}),
                                  publishReplay(1), refCount());

    this._headerStyles = this._headerWidgets.pipe(map((widgets: AjfWidgetsContainer) => {
      return widgets != null ? widgets.styles : {};
    }));

    this._contentWidgets = (<Observable<AjfWidgetsOperation>>this._contentWidgetsUpdate)
                               .pipe(
                                   scan(
                                       (widgets: AjfWidgetsContainer, op: AjfWidgetsOperation) => {
                                         return op(widgets);
                                       },
                                       <AjfWidgetsContainer>{widgets: [], styles: {}}),
                                   startWith(<AjfWidgetsContainer>{widgets: [], styles: {}}),
                                   publishReplay(1), refCount());

    this._contentStyles = this._contentWidgets.pipe(map((widgets: AjfWidgetsContainer) => {
      return widgets != null ? widgets.styles : {};
    }));

    this._footerWidgets = (<Observable<AjfWidgetsOperation>>this._footerWidgetsUpdate)
                              .pipe(
                                  scan(
                                      (widgets: AjfWidgetsContainer, op: AjfWidgetsOperation) => {
                                        return op(widgets);
                                      },
                                      <AjfWidgetsContainer>{widgets: [], styles: {}}),
                                  startWith(<AjfWidgetsContainer>{widgets: [], styles: {}}),
                                  publishReplay(1), refCount());

    this._footerStyles = this._footerWidgets.pipe(map((widgets: AjfWidgetsContainer) => {
      return widgets != null ? widgets.styles : {};
    }));

    this._color = (<Observable<AjfColorOperation>>this._colorUpdate)
                      .pipe(scan((color: string[], op: AjfColorOperation) => {
                              return op(color);
                            }, this._defaultColor), share(), startWith(this._defaultColor));

    this._currentWidget = this._currentWidgetUpdate.pipe(
        filter(s => s != null),
        map(s => s!),
        scan(
            (widget: AjfWidget|null, op: AjfWidgetOperation) => {
              return op(widget);
            },
            null as unknown as AjfWidget),
        publishReplay(1),
        refCount(),
    );

    this._reportForms
        .pipe(filter(f => f.length != 0), map((forms: AjfForm[]) => {
                return (_c: AjfFormVariables[]): AjfFormVariables[] => {
                  return this.fillFormsVariables(forms);
                };
              }))
        .subscribe(this._formsVariablesUpdate);

    this._reportForms
        .pipe(filter(f => f.length != 0), map((forms: AjfForm[]) => {
                return (_c: AjfFormVariables[]): AjfFormVariables[] => {
                  return this.fillFormsVariables(forms);
                };
              }))
        .subscribe(this._conditionNamesUpdate);

    const reportObs = this._report;

    reportObs
        .pipe(map((r: AjfReport|null) => {
          return (_colors: string[]): string[] => {
            let tempColors: string[] = this._defaultColor;
            if (r == null) {
              return [];
            } else {
              this.parseColor(r.styles, tempColors);
              if (r.content) {
                this.parseColor(r.content.styles, tempColors);
              }
              if (r.footer) {
                this.parseColor(r.footer.styles, tempColors);
              }
              if (r.header) {
                this.parseColor(r.header.styles, tempColors);
                for (let i = 0; i < r.header.content.length; i++) {
                  let obj = r.header.content[i];
                  this.parseColor(obj.styles, tempColors);
                  if (obj.widgetType === AjfWidgetType.Layout) {
                    let layoutObj = obj as AjfLayoutWidget;
                    for (let j = 0; j < layoutObj.content.length; j++) {
                      let columnObj = layoutObj.content[j] as AjfColumnWidget;
                      this.parseColor(columnObj.styles, tempColors);
                      for (let z = 0; z < columnObj.content.length; z++) {
                        let widgetObj = columnObj.content[z];
                        this.parseColor(widgetObj.styles, tempColors);
                      }
                    }
                  }
                }
              }
            }
            return <string[]>tempColors;
          };
        }))
        .subscribe(this._colorUpdate);

    reportObs
        .pipe(map((r: AjfReport|null) => {
          return (_styles: AjfStyles): AjfStyles => {
            if (r == null || r.styles == null) {
              return <AjfStyles>{};
            } else {
              return <AjfStyles>r.styles;
            }
          };
        }))
        .subscribe(this._reportStylesUpdate);

    reportObs
        .pipe(map((r: AjfReport|null) => {
          return (_widgets: AjfWidgetsContainer): AjfWidgetsContainer => {
            if (r == null || r.header == null) {
              return <AjfWidgetsContainer>{widgets: [], styles: {}};
            } else {
              return <AjfWidgetsContainer>{
                widgets: r.header.content || [],
                styles: r.header.styles || {}
              };
            }
          };
        }))
        .subscribe(this._headerWidgetsUpdate);

    reportObs
        .pipe(map((r: AjfReport|null) => {
          return (_widgets: AjfWidgetsContainer): AjfWidgetsContainer => {
            if (r == null || r.content == null) {
              return <AjfWidgetsContainer>{widgets: [], styles: {}};
            } else {
              return <AjfWidgetsContainer>{
                widgets: r.content.content || [],
                styles: r.content.styles || {}
              };
            }
          };
        }))
        .subscribe(this._contentWidgetsUpdate);

    reportObs
        .pipe(map((r: AjfReport|null) => {
          return (_widgets: AjfWidgetsContainer): AjfWidgetsContainer => {
            if (r == null || r.footer == null) {
              return <AjfWidgetsContainer>{widgets: [], styles: {}};
            } else {
              return <AjfWidgetsContainer>{
                widgets: r.footer.content || [],
                styles: r.footer.styles || {}
              };
            }
          };
        }))
        .subscribe(this._footerWidgetsUpdate);

    this._saveReport.pipe(map((json: any) => {
      return (_r: any): any => {
        if (json = null) {
          return {};
        }
        return json;
      };
    }));

    this._saveReportEvent
        .pipe(
            combineLatest(this.report, this.reportForms),
            combineLatest(
                this._headerWidgets.pipe(filter(w => w != null)),
                this._contentWidgets.pipe(filter(w => w != null)),
                this._footerWidgets.pipe(filter(w => w != null)),
                this._reportStyles.pipe(filter(w => w != null)),
                ))
        .subscribe(r => {
          let obj: any = {};
          // const curRo = r[0][1];
          // const forms = r[0][2] != null ? r[0][2] || []
          //     : (curRo != null ? curRo.forms || [] : []);

          const [hco, cco, fco] = [r[1], r[2], r[3]] as AjfWidgetsContainer[];

          obj.header = {content: hco.widgets.map(w => deepCopy(w)), styles: hco.styles} as
              AjfReportContainer;
          obj.content = {content: cco.widgets.map(w => deepCopy(w)), styles: cco.styles} as
              AjfReportContainer;
          obj.footer = {content: fco.widgets.map(w => deepCopy(w)), styles: fco.styles} as
              AjfReportContainer;
          obj.styles = r[4];

          const ro = {
            header: {content: hco.widgets, styles: hco.styles},
            content: {content: cco.widgets, styles: cco.styles},
            footer: {content: fco.widgets, styles: fco.styles},
            styles: r[4]
          } as AjfReport;

          this.setSaveReport(obj);
          this._savedReportUpdate.next(ro);
          this.pushJsonStack(JSON.stringify(obj));
        });
  }

  /**
   *
   *  functions
   *
   */

  /**
   * utils:
   * remove AjfNodeGroup, AjfSlide, AjfRepeatingSlide, AjfStringField from ajfnode array
   *
   * @param nodes
   *
   * @memberOf AjfReportBuilderService
   */
  filterNodes(nodes: AjfNode[]): AjfNode[] {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.nodeType === AjfNodeType.AjfNodeGroup || node.nodeType === AjfNodeType.AjfSlide ||
          node.nodeType === AjfNodeType.AjfRepeatingSlide ||
          (node.nodeType === AjfNodeType.AjfField &&
           (node as AjfField).fieldType === AjfFieldType.String)) {
        nodes.splice(i, 1);
        i--;
      }
    }
    return nodes;
  }

  parseColor(cssStyles: any, colors: string[]): void {
    const styleKeys = ['background-color', 'backgroundColor', 'color'];
    styleKeys.forEach((k) => {
      if (cssStyles[k] && colors.indexOf(cssStyles[k]) == -1) {
        colors.push(cssStyles[k]);
      }
    });
  }

  fillFormsVariables(forms: AjfForm[]) {
    let variables: AjfFormVariables[] = [];
    for (let i = 0; i < forms.length; i++) {
      variables[i] = {nodes: [], labels: [], names: [], types: []};

      if (forms[i].nodes != null && forms[i].nodes.length > 0) {
        variables[i].nodes = this.filterNodes(flattenNodes(forms[i].nodes));
      }
      variables[i].labels = this.extractLabelsNodes(variables[i].nodes);
      variables[i].names = this.extractNamesNodes(variables[i].nodes);
      variables[i].types = this.extractTypesNodes(variables[i].nodes);
    }
    return variables;
  }
  /**
   * utils:
   *  the obj returned contains the label field of ajfNode
   * @param nodes
   *
   * @memberOf AjfReportBuilderService
   */
  extractLabelsNodes(nodes: AjfNode[]): any {
    let obj: string[] = [];
    for (let i = 0; i < nodes.length; i++) {
      obj.push(nodes[i].label);
    }
    return obj;
  }

  extractNamesNodes(nodes: AjfNode[]): any {
    let obj: string[] = [];
    for (let i = 0; i < nodes.length; i++) {
      obj.push(nodes[i].name);
    }
    return obj;
  }
  extractTypesNodes(nodes: AjfNode[]): any {
    let obj: AjfFieldType[] = [];
    for (let i = 0; i < nodes.length; i++) {
      let p: AjfField = <AjfField>nodes[i];
      obj.push(p.fieldType);
    }
    return obj;
  }

  setOrigin(origin: string): void {
    this._originUpdate.next(origin);
  }

  /**
   * utils:
   * This method round the value to the decimal position
   *
   * @param value
   * @param decimalpositions
   *
   * @memberOf AjfReportBuilderService
   */
  roundTo(value: number, decimalPositions: number) {
    let i = value * Math.pow(10, decimalPositions);

    i = Math.floor(i);

    return i / Math.pow(10, decimalPositions);
  }

  /**
   * utils:
   * This validator check if the value is a number.
   *
   * @param value
   *
   * @memberOf AjfReportBuilderService
   */
  isNumber(value: any): boolean {
    return /^\d+(\.\d+)?/.test(value);
  }

  isNumberArray(value: any[]): boolean {
    for (let i = 0; i < value.length; i++) {
      if (!this.isNumber(value[i])) {
        return false;
      }
    }
    return true;
  }

  /**
   * get _onDragged Observable
   *
   * @readonly
   * @memberOf AjfReportBuilderService
   */
  get onDragged(): Observable<any> {
    return this._onDragged;
  }

  /**
   * get _onOver Observable
   *
   * @readonly
   * @memberOf AjfReportBuilderService
   */
  get onOver(): Observable<any> {
    return this._onOver;
  }

  /**
   * get _fixedZoom Observable
   *
   * @readonly
   * @memberOf AjfReportBuilderService
   */
  get fixedZoom(): Observable<boolean> {
    return this._fixedZoom;
  }

  /**
   *  change status of _fixedZoom in true
   *
   *
   * @memberOf AjfReportBuilderService
   */
  fixedZoomIn(): void {
    this._fixedZoomUpdate.next(true);
  }

  /**
   *  change status of _fixedZoom in false
   *
   *
   * @memberOf AjfReportBuilderService
   */
  fixedZoomOut(): void {
    this._fixedZoomUpdate.next(false);
  }

  /**
   * get _onDragEnter observable
   *
   * @readonly
   * @memberOf AjfReportBuilderService
   */
  get onDragEnter(): Observable<any> {
    return this._onDragEnter;
  }

  /**
   *  update _onDragEnter with  section(header,content,footer) and index
   *
   * @memberOf AjfReportBuilderService
   */
  dragEnter(array: string, index: number): void {
    this._onDragEnterUpdate.next({array, index});
  }

  /**
   *  update _ondragged with true
   *
   * @memberOf AjfReportBuilderService
   */
  dragStarted(): void {
    this._onDraggedUpdate.next(true);
  }

  /**
   *  update _onDragged with false
   *
   * @memberOf AjfReportBuilderService
   */

  dragEnded(): void {
    this._onDraggedUpdate.next(false);
  }


  /**
   *  update _onOver with true
   *
   *
   * @memberOf AjfReportBuilderService
   */
  overStarted(): void {
    this._onOverUpdate.next(true);
  }


  /**
   * update _onOver with false
   *
   *
   * @memberOf AjfReportBuilderService
   */
  overEnded(): void {
    this._onOverUpdate.next(false);
  }

  /**
   *
   *  update _onDragged with false
   *
   * @memberOf AjfReportBuilderService
   */
  dragLeave(): void {
    this._onDragEnterUpdate.next({});
  }

  /**
   * Get the report
   *
   * @readonly
   * @memberOf AjfReportBuilderService
   */
  get report(): Observable<AjfReport|null> {
    return this._report as Observable<AjfReport|null>;
  }

  /**
   * emit save report event
   *
   *
   * @memberOf AjfReportBuilderService
   */
  saveReport() {
    if (this._saveReportEvent != null) {
      this._saveReportEvent.emit();
    }
  }

  saveImageFormula(formula: AjfFormula) {
    this._currentWidgetUpdate.next((widget: AjfWidget|null): AjfWidget|null => {
      if (widget == null) {
        return widget;
      }
      const w = widget as AjfImageWidget;
      w.flag = formula;
      w.icon = formula;
      return w;
    });
  }

  saveFormulaToHtml(htmlFormula: string, reference: any) {
    if (this._saveFormulaTOHtml != null) {
      const obj = {'formula': htmlFormula, 'reference': reference};
      this._saveFormulaTOHtml.emit(obj);
    }
  }

  setEmptyContent(val: boolean): void {
    this._emptyContent.next(val);
  }


  pushJsonStack(json: string): void {
    let currentStack = this._jsonStack.getValue();

    if (currentStack.indexOf(json) === -1 && json !== this._lastDeletedJson) {
      currentStack.push(json);
    }

    this._jsonStack.next(currentStack);
  }

  popJsonStack(): string|undefined {
    let emptyJson = '{"header":{"content":[],"styles":{}},' +
        '"content":{"content":[],"styles":{}},"' +
        'footer":{"content":[],"styles":{}},"styles":{}}';
    let currentStack = this._jsonStack.getValue();
    currentStack.pop();
    this._lastDeletedJson = currentStack.pop();

    if (currentStack.length <= 0) {
      this._lastDeletedJson = '';
      this._jsonStack.next([]);
      this.updateCurrentWidget(null);
      this.setEmptyContent(true);
      return emptyJson;
    }
    this._jsonStack.next(currentStack);

    return this._lastDeletedJson;
  }


  /**
   * get the emitter
   *
   * @readonly
   *
   * @memberOf AjfReportBuilderService
   */
  get columnWidthChanged() {
    return this.columnWidthChangedEmitter;
  }

  /**
   * get _customWidgets Observable
   *
   * @readonly
   * @memberOf AjfReportBuilderService
   */
  get customWidgets(): Observable<AjfCustomWidget[]> {
    return this._customWidgets;
  }

  /**
   * Get the header widget
   *
   * @readonly
   * @memberOf AjfReportBuilderService
   */
  get headerWidgets(): Observable<AjfWidgetsContainer> {
    return this._headerWidgets;
  }

  /**
   * Get the header styles
   *
   * @readonly
   * @memberOf AjfReportBuilderService
   */
  get headerStyles(): Observable<AjfStyles> {
    return this._headerStyles;
  }

  /**
   * Get the Content widget
   *
   * @readonly
   * @memberOf AjfReportBuilderService
   */
  get contentWidgets(): Observable<AjfWidgetsContainer> {
    return this._contentWidgets;
  }

  /**
   * Get the content styles
   *
   * @readonly
   * @memberOf AjfReportBuilderService
   */
  get contentStyles(): Observable<AjfStyles> {
    return this._contentStyles;
  }

  /**
   * Get the footer widget
   *
   * @readonly
   * @memberOf AjfReportBuilderService
   */
  get footerWidgets(): Observable<AjfWidgetsContainer> {
    return this._footerWidgets;
  }

  /**
   * Get the footer styles
   *
   * @readonly
   * @memberOf AjfReportBuilderService
   */
  get footerStyles(): Observable<AjfStyles> {
    return this._footerStyles;
  }

  /**
   * Get the colors of report
   *
   * @readonly
   * @memberOf AjfReportBuilderService
   */
  get colors(): Observable<string[]> {
    return this._color;
  }

  get emptyContent(): Observable<boolean> {
    return <Observable<boolean>>this._emptyContent;
  }

  /**
   *
   * @param type
   * @param newWidget
   *
   * @memberOf AjfReportBuilderService
   */
  updateArrayWidgets(type: string, newWidget: AjfWidgetsContainer) {
    if ((type !== 'header') && (type !== 'content') && (type !== 'footer')) {
      throw new Error('Unknown type ' + type);
    }
    this._updates[type].next((_widgets: AjfWidgetsContainer): AjfWidgetsContainer => {
      return newWidget;
    });
  }

  /**
   * get _formsVariables Observable
   *
   * @readonly
   * @memberOf AjfReportBuilderService
   */
  get formsVariables(): Observable<AjfFormVariables[]> {
    return this._formsVariables;
  }

  get conditionNames(): Observable<AjfFormVariables[]> {
    return this._conditionNames;
  }
  /**
   * Get the current widget
   *
   * @readonly
   * @memberOf AjfReportBuilderService
   */
  get currentWidget(): Observable<AjfWidget|null> {
    return this._currentWidget;
  }

  /**
   * This method Update _currentWidgetUpdate with newWidget.
   *
   * @param newWidget
   *
   * @memberOf AjfReportBuilderService
   */
  updateCurrentWidget(newWidget: AjfWidget|null) {
    this._currentWidgetUpdate.next((_widget: AjfWidget|null): AjfWidget|null => {
      this._saveReportEvent.emit();
      return newWidget;
    });
  }

  /**
   * Get the report
   *
   * @readonly
   * @memberOf AjfReportBuilderService
   */
  get getSaveReport(): Observable<any> {
    return this._saveReport as Observable<any>;
  }

  /**
   * get _jsonSavedReport obeservable
   *
   * @readonly
   * @memberOf AjfReportBuilderService
   */
  get reportSaved(): Observable<AjfReport> {
    return this._savedReport;
  }


  /**
   * get _reportStyles observable
   *
   * @readonly
   * @memberOf AjfReportBuilderService
   */
  get reportStyles(): Observable<AjfStyles> {
    return this._reportStyles;
  }

  /**
   * get _reportForms observable
   *
   * @readonly
   * @memberOf AjfReportBuilderService
   */
  get reportForms(): Observable<AjfForm[]> {
    return this._reportForms;
  }

  /**
   * get the _origin Observable
   *
   * @readonly
   * @memberOf AjfReportBuilderService
   */
  get origin(): Observable<string> {
    return this._origin;
  }

  /**
   * This method assigns the new width to the idx column
   * and recalculates the width of the remaining columns of the layout.
   * The range value are from 0,1 to 1.
   *
   * RULES:
   * The min value for column is 0,1.
   * The sum of all columns width is always 1.
   * The method round the values.
   * If is present only one column the width is always 1.
   *
   * When the new value `>` old value:
   * the width of the remaining columns decreases.
   * When the new value `<` old value:
   * the width of the remaining columns increases.
   *
   * When values ​​are periodic, rounding assigns the gap to the current value.
   * For example: 3 columns with 0,33 believe 1 column 0,34 and 2 columns 0,33.
   *
   * @param newValue
   * @param idx
   *
   * @memberOf AjfReportBuilderService
   */
  instantColumnValue(newValue: number, idx: number) {
    this._currentWidgetUpdate.next((widget: AjfWidget|null): AjfWidget|null => {
      if (widget == null) {
        return widget;
      }
      let myObj = <AjfLayoutWidget>widget;

      let size = myObj.columns.length;

      let spreadValue = 0;
      let objNum = 0;
      let sum = 0;
      let idxFirstNoObj = -1;

      let add = false;
      let foundFirstNoObj = false;

      let re1 = new RegExp('(^[0]\.\[1-9][0-9]$)');
      let re2 = new RegExp('(^[0]\.\[1-9]$)');
      let re3 = new RegExp('^[1]$');

      let oldValue = myObj.columns[idx];

      newValue = Number(this.roundTo(newValue, 2).toFixed(2));

      if (myObj.columns[idx] == null) {
        throw new Error('invalid value');
      }

      for (let j = 0; j < size; j++) {
        if (myObj.columns[j] === -1) {
          objNum++;
        }
      }

      if (oldValue == -1) {
        oldValue = 0.1;
        objNum--;
        newValue = Number(this.roundTo(1 / (size - objNum), 2).toFixed(2));
        myObj.columns[idx] = 0.1;
      } else if (oldValue < 0.1) {
        oldValue = 0.1;
      }


      if (newValue !== -1) {
        if (myObj.columns.length === 1) {
          myObj.columns[0] = 1;
          return myObj;
        }

        if (newValue < 0.1) {
          newValue = 0.1;
        } else if (newValue + 0.1 * (size - objNum - 1) > 1) {
          newValue = 1 - (0.1 * (size - objNum - 1));
        }

        if ((oldValue === newValue) && (oldValue === 0.1)) {
          myObj.columns[idx] = newValue;
          return myObj;
        }

        if (oldValue > newValue) {
          add = true;
          spreadValue = (oldValue - newValue) / (size - objNum - 1);
        } else {
          add = false;
          spreadValue = (newValue - oldValue) / (size - objNum - 1);
        }

        spreadValue = Number(this.roundTo(spreadValue, 2).toFixed(2));

        if (spreadValue < 0.01) {
          spreadValue = 0.1;
        }

      } else {
        myObj.columns[idx] = -1;
        objNum++;
        add = true;
        if (myObj.columns.length == 1) {
          spreadValue = 1;
        } else {
          spreadValue = (oldValue) / (size - objNum);
        }
      }

      for (let i = 0; i < size; i++) {
        if (myObj.columns[i] !== -1) {
          if ((i == idx)) {
            myObj.columns[idx] = newValue;
          } else {
            if (add) {
              myObj.columns[i] += spreadValue;
              if ((myObj.columns[i] > 0.9) && (myObj.columns.length - objNum != 1)) {
                myObj.columns[i] = 0.90;
              }

            } else {
              myObj.columns[i] -= spreadValue;
              if (myObj.columns[i] < 0.1) {
                myObj.columns[i] = 0.10;
              }
            }

            myObj.columns[i] = Number(this.roundTo(myObj.columns[i], 2).toFixed(2));
            sum += myObj.columns[i];
          }

          sum = Number(this.roundTo(sum, 2).toFixed(2));

          if (foundFirstNoObj == false) {
            idxFirstNoObj = i;
            foundFirstNoObj = true;
          }
        }
      }

      if (newValue === -1) {
        myObj.columns[idx] = -1;
        if (foundFirstNoObj) {
          myObj.columns[idxFirstNoObj] += Number(this.roundTo(1 - sum, 2).toFixed(2));
        }
      } else {
        myObj.columns[idx] = Number(this.roundTo(1 - sum, 2).toFixed(2));
      }

      for (let j = 0; j < myObj.columns.length; j++) {
        if (myObj.columns[j] !== -1 && !re1.test(String(myObj.columns[j])) &&
            !re2.test(String(myObj.columns[j])) && !re3.test(String(myObj.columns[j]))) {
          this.instantColumnValue(0.10, j);
        }
      }
      this.columnWidthChangedEmitter.emit();
      this._saveReportEvent.emit();
      return myObj;
    });
  }

  /**
   * This method set the imageUrl on the current AjfImageWidget.
   *
   * @param imageUrl
   *
   * @memberOf AjfReportBuilderService
   */
  setImageUrl(imageUrl: string) {
    this._currentWidgetUpdate.next((widget: AjfWidget|null): AjfWidget|null => {
      if (widget == null) {
        return null;
      }
      const myObj = widget as AjfImageWidget;
      myObj.url = createFormula({formula: `"${imageUrl}"`});
      return myObj;
    });
  }

  setIcon(icon: {fontSet: string, fontIcon: string}) {
    this._currentWidgetUpdate.next((widget: AjfWidget|null): AjfWidget|null => {
      if (widget == null) {
        return null;
      }
      const myObj = widget as AjfImageWidget;
      myObj.icon = createFormula({formula: `"${icon}"`});
      return myObj;
    });
  }

  setFlag(value: string) {
    this._currentWidgetUpdate.next((widget: AjfWidget|null): AjfWidget|null => {
      if (widget == null) {
        return null;
      }
      const myObj = widget as AjfImageWidget;
      myObj.flag = createFormula({formula: `"${value}"`});
      return myObj;
    });
  }

  saveCondition(conditionText: string) {
    this._currentWidgetUpdate.next((widget: AjfWidget|null): AjfWidget|null => {
      if (widget == null) {
        return null;
      }
      if (widget.visibility != null) {
        widget.visibility.condition = conditionText;
      }
      return widget;
    });
  }

  saveChartFormula(
      _label: string, _level: number, _mainIndex: number, _index: number, formulaText: string,
      aggregationType: number) {
    this._currentWidgetUpdate.next((w: AjfWidget|null): AjfWidget|null => {
      if (w == null) {
        return null;
      }
      const widget = w as AjfChartWidget;
      if (widget != null && widget.dataset != null) {
        let formula: AjfFormula = createFormula({});
        let aggregation: AjfAggregation = createAggregation({});
        // let obj: any;

        formula.formula = formulaText;
        aggregation.aggregation = aggregationType;

        // obj = {
        //   'formula': formula.toJson(),
        //   'aggregation': aggregation.toJson(),
        //   'label': label
        // };

        // dataset = AjfDataset.fromJson(obj);
        // check if the row that contains main data is defined
        /* if (widget.dataset[0] == null) {
          widget.dataset[0] = [];
        }

        if (level == 0 && mainIndex == -1 && index == -1) {

          widget.dataset[0].push(dataset);
        } else if (level == 1 && mainIndex == -1 && index == -1) {

          widget.dataset[widget.dataset.length] = [];
          widget.dataset[widget.dataset.length - 1].push(dataset);
        } else if (index === - 1) {
          widget.dataset[mainIndex + 1].push(dataset);
        } else {
          widget.dataset[mainIndex].splice(index, 1, dataset);
        } */
      }
      return widget;
    });
  }

  saveTableFormula(
      _label: string, aggregationType: number, formulaText: string, _mainIndex: number,
      _index: number) {
    this._currentWidgetUpdate.next((w: AjfWidget|null): AjfWidget|null => {
      if (w == null) {
        return null;
      }
      const widget = w as AjfTableWidget;
      if (widget.dataset != null) {
        let formula: AjfFormula = createFormula({});
        let aggregation: AjfAggregation = createAggregation({});
        // let dataset: AjfDataset = new AjfDataset();
        // let rowDataset: AjfDataset[] = [];
        // let obj: any;

        formula.formula = formulaText;
        aggregation.aggregation = aggregationType;

        // obj = {
        //   'formula': formula.toJson(),
        //   'aggregation': aggregation.toJson(),
        //   'label': label
        // };

        // dataset = AjfDataset.fromJson(obj);
        /* if (mainIndex === - 1) {
          widget.dataset[widget.dataset.length] = [];
          widget.dataset[widget.dataset.length - 1].push(dataset);
        } else {
          if (index === -1) {
            widget.dataset[mainIndex].push(dataset);
          } else {
            widget.dataset[mainIndex].splice(index, 1, dataset);
          }
        } */
      }
      return widget;
    });
  }

  removeTableMainData(index: number) {
    this._removeFromCurrentWidgetArrayProperty('dataset', index);
  }

  removeData(_mainIndex: number, _index: number) {
    this._currentWidgetUpdate.next((widget: AjfWidget|null): AjfWidget|null => {
      let myObj = <AjfDataWidget>widget;

      /* if (index === -1) {
        myObj.dataset.splice(mainIndex, 1);
      } else {
        myObj.dataset[mainIndex].splice(index, 1);
      } */

      return myObj;
    });
  }

  /**
   * update type field of AjfChartWidget current widget
   *
   * @param type
   *
   * @memberOf AjfReportBuilderService
   */
  setChartType(type: number) {
    this._setCurrentWidgetProperty('type', type);
  }

  /**
   * remove  idx element of xLabels field of AjfChartWidget current widget
   *
   * @param idx
   *
   * @memberOf AjfReportBuilderService
   */
  removeMainData(_idx: number) {
    this._currentWidgetUpdate.next((widget: AjfWidget|null): AjfWidget|null => {
      let myObj = <AjfChartWidget>widget;
      // myObj.dataset[0].splice(idx, 1);

      return myObj;
    });
  }

  removeRelatedData(_mainIdx: number, _idx: number) {
    this._currentWidgetUpdate.next((widget: AjfWidget|null): AjfWidget|null => {
      let myObj = <AjfChartWidget>widget;
      /* if (idx == -1) {
        myObj.dataset.splice(mainIdx + 1, 1);
      } else {
        myObj.dataset[mainIdx + 1].splice(idx, 1);
      } */

      return myObj;
    });
  }


  /**
   * update backgroundColor field of AjfChartWidget current widget
   *
   * @param colors
   *
   * @memberOf AjfReportBuilderService
   */
  setChartBackgroundColor(colors: string[]) {
    this._setCurrentWidgetProperty('backgroundColor', colors);
  }

  addChartBackgroundColor(color: string) {
    this._addToCurrentWidgetArrayProperty('backgroundColor', color);
  }

  removeChartBackgroundColor(idx: number) {
    this._removeFromCurrentWidgetArrayProperty('backgroundColor', idx);
  }

  /**
   * update borderColor field of AjfChartWidget current widget
   *
   * @param colors
   *
   * @memberOf AjfReportBuilderService
   */
  setChartBorderColor(colors: string[]) {
    this._setCurrentWidgetProperty('borderColor', colors);
  }

  setChartBorderWidth(value: number) {
    this._setCurrentWidgetProperty('borderWidth', value);
  }

  addChartBorderColor(color: string) {
    this._addToCurrentWidgetArrayProperty('borderColor', color);
  }

  removeChartBorderColor(idx: number) {
    this._removeFromCurrentWidgetArrayProperty('borderColor', idx);
  }

  /**
   * This method set the AjfReport.
   *
   * @param report
   *
   * @memberOf AjfReportBuilderService
   */
  setReport(report: AjfReport): void {
    this._report.next(report);
  }

  /**
   * This method set the export report.
   *
   * @param report
   *
   * @memberOf AjfReportBuilderService
   */
  setSaveReport(json: any): void {
    this._saveReport.next(json);
  }

  /**
   * This method set the font attribute on the current AjfWidget.
   *
   * There is a check on font-size attribute,
   * if is no specificate the type of size font set 'pt' as default.
   *
   * @param label
   * @param value
   *
   * @memberOf AjfReportBuilderService
   */
  setWidgetStyles(label: string, value: string|string[]) {
    this._currentWidgetUpdate.next((widget: AjfWidget|null): AjfWidget|null => {
      let myObj = <AjfTextWidget>widget;

      const pxStyles =
          ['font-size', 'height', 'width', 'border-width', 'border-radius', 'padding', 'margin'];
      const isPxStyle = pxStyles.indexOf(label) > -1;
      if (isPxStyle && !(value instanceof Array) && this.isNumber(value)) {
        value += 'px';
      } else if (isPxStyle && value instanceof Array && this.isNumberArray(value)) {
        value = `${value.join('px ')}px`;
      }

      myObj.styles[label] = value;

      return myObj;
    });
  }

  /**
   * this method update the styles of origin widget array
   *
   * @param origin can be header content or footer
   * @param label for example background-color
   * @param value for example rgb(255,255,255,1)
   *
   * @memberOf AjfReportBuilderService
   */
  setSectionStyles(origin: string, label: string, value: string) {
    if ((origin !== 'header') && (origin !== 'content') && (origin !== 'footer')) {
      throw new Error('uncknow origin ' + origin);
    }

    this._updates[origin].next((widget: AjfWidgetsContainer): AjfWidgetsContainer => {
      widget.styles[label] = value;

      widget.styles = <AjfStyles>{...widget.styles};

      return widget;
    });
  }

  /**
   * this method set the style of the whole report.
   *
   * @param label for example background-color
   * @param value for example rgb(255,255,255,1)
   *
   * @memberOf AjfReportBuilderService
   */
  setReportStyles(label: string, value: string) {
    this._reportStylesUpdate.next((styles: AjfStyles): AjfStyles => {
      if (styles == null) {
        styles = {};
      } else {
        styles[label] = value;
        styles = <AjfStyles>{...styles};
      }
      return styles;
    });
  }

  /**
   *  update forms
   *
   * @param forms
   *
   * @memberOf AjfReportBuilderService
   */
  setReportForms(forms: AjfForm[]) {
    this._reportFormsUpdate.next((_form: AjfForm[]): AjfForm[] => {
      return forms || [];
    });
  }

  /**
   * update customWidgets
   *
   * @param widget
   * @param [position]
   *
   * @memberOf AjfReportBuilderService
   */
  addCustomWidgets(widget: AjfCustomWidget, position?: number) {
    this._customWidgetsUpdate.next((customWidgets: AjfCustomWidget[]): AjfCustomWidget[] => {
      customWidgets = customWidgets || [];
      if (position != null && position >= 0) {
        customWidgets.splice(position, 0, widget);
      } else {
        customWidgets.push(widget);
      }
      return customWidgets;
    });
  }

  /**
   * reset customWidgets
   *
   * @param widget
   * @param [position]
   *
   * @memberOf AjfReportBuilderService
   */
  resetCustomWidgets() {
    this._customWidgetsUpdate.next((customWidgets: AjfCustomWidget[]): AjfCustomWidget[] => {
      customWidgets.length = 0;
      return customWidgets;
    });
  }

  /**
   * update label of widget
   *
   * @param label
   * @param position
   *
   * @memberOf AjfReportBuilderService
   */
  changeLabelCustomWidget(label: string, position: number) {
    this._customWidgetsUpdate.next((customWidgets: AjfCustomWidget[]): AjfCustomWidget[] => {
      customWidgets[position].type = label;
      return customWidgets;
    });
  }

  /**
   * Add an AjfWidget on _headerWidgetsUpdate
   *
   * @param widget
   * @param [position]
   *
   * @memberOf AjfReportBuilderService
   */
  addHeaderWidget(widget: AjfWidget, position?: number) {
    this._addWidgetToContainer(this._headerWidgetsUpdate, widget, position);
  }

  /**
   * Add an AjfWidget on _contentWidgetsUpdate
   *
   * @param widget
   * @param [position]
   *
   * @memberOf AjfReportBuilderService
   */
  addContentWidget(widget: AjfWidget, position?: number) {
    this._addWidgetToContainer(this._contentWidgetsUpdate, widget, position);
  }

  /**
   * Add an AjfWidget on _footerWidgetsUpdate
   *
   * @param widget
   * @param [position]
   *
   * @memberOf AjfReportBuilderService
   */
  addfooterWidget(widget: AjfWidget, position?: number) {
    this._addWidgetToContainer(this._footerWidgetsUpdate, widget, position);
  }

  unfixedColumn(idx: number) {
    this._currentWidgetUpdate.next((widget: AjfWidget|null): AjfWidget|null => {
      if (widget == null) {
        return widget;
      }
      let myObj = <AjfLayoutWidget>widget;
      let num = myObj.columns.length;
      let checkSum = 0;
      let objNum = 0;
      let value = 1;
      let spreadValue: any;
      myObj.columns[idx] = 0;

      for (let j = 0; j < num; j++) {
        if (myObj.columns[j] === -1) {
          objNum++;
        }
      }

      value = Number(this.roundTo(1 / (num - objNum), 2).toFixed(2));

      for (let i = 0; i < num; i++) {
        if (myObj.columns[i] !== -1) {
          myObj.columns[i] = value;
          checkSum = Number(this.roundTo(checkSum + value, 2).toFixed(2));
        }
      }

      checkSum = Number(this.roundTo(checkSum, 2).toFixed(2));

      if (checkSum > 1) {
        spreadValue = parseFloat(this.roundTo(((checkSum - 1) % 1), 2).toFixed(2));
        myObj.columns[idx] -= spreadValue;
        myObj.columns[idx] = this.roundTo(myObj.columns[idx], 2);
      } else if (checkSum < 1) {
        myObj.columns[idx] += (1 - (checkSum % 1));
        myObj.columns[idx] = Number(this.roundTo(myObj.columns[idx], 2).toFixed(2));
      }

      return myObj;
    });
  }

  /**
   * Add column on the current AjfLayoutWidget.
   *
   * When adding a column the width of the other columns is recalculated
   * by dividing it by the number of column
   *
   * @memberOf AjfReportBuilderService
   */
  addColumn() {
    this._currentWidgetUpdate.next((widget: AjfWidget|null): AjfWidget|null => {
      if (widget == null) {
        return null;
      }
      let myObj = <AjfLayoutWidget>widget;
      let tempObj: number[] = [];
      let num = myObj.columns.length + 1;
      let checkSum = 0;
      let objNum = 0;
      let value = 1;
      let tmpValue: any;

      if (num > 10) {
        throw new Error('exceed max columns');
      }

      for (let j = 0; j < num; j++) {
        if (myObj.columns[j] === -1) {
          objNum++;
        }
      }
      value = Number(this.roundTo(1 / (num - objNum), 2).toFixed(2));

      for (let i = 0; i < num; i++) {
        if (myObj.columns[i] === -1) {
          tempObj.push(-1);
        } else {
          tempObj.push(value);
          checkSum = Number(this.roundTo(checkSum + value, 2).toFixed(2));
        }
      }
      checkSum = Number(this.roundTo(checkSum, 2).toFixed(2));

      if (checkSum > 1) {
        tmpValue = parseFloat(this.roundTo(((checkSum - 1) % 1), 2).toFixed(2));
        tempObj[0] -= tmpValue;
        tempObj[0] = this.roundTo(tempObj[0], 2);
      } else if (checkSum < 1) {
        tempObj[0] += (1 - (checkSum % 1));
        tempObj[0] = Number(this.roundTo(tempObj[0], 2).toFixed(2));
      }

      myObj.columns = tempObj;

      // TODO: @trik what's value?!?
      const columnObj = createWidget({
        widgetType: 7,
        // value: myObj.columns[myObj.columns.length - 1],
      });

      myObj.content.push(columnObj);
      this._saveReportEvent.emit();
      return myObj;
    });
  }

  removeWidgetToColumn(column: AjfColumnWidget, index: number) {
    column.content.splice(index, 1);
  }

  /**
   * This method remove a widget on the current AjfReport.
   *
   * @param node
   * the position array:
   *
   * header -`>` headerWidgets
   * content -`>` contentWidgets
   * footer -`>` footerWidgets
   * column -`>` column of layout
   * layoutContent -`>` content of layout
   * obj -`>` obj of layout
   * customWidget -`>` custom widget
   *
   * @param idx the position array
   *
   * @memberOf AjfReportBuilderService
   */
  remove(node: string, idx: number) {
    switch (node) {
      case 'header':
      case 'content':
      case 'footer':
        this._updates[node].next((widgets: AjfWidgetsContainer): AjfWidgetsContainer => {
          if (widgets.widgets.length === 0) {
            throw new Error('you can not remove from empty array');
          }
          if (widgets.widgets[idx] == null) {
            throw new Error('invalid index');
          }
          widgets.widgets.splice(idx, 1);
          this.updateCurrentWidget(null);
          return widgets;
        });
        break;
      case 'layout':
        this._currentWidgetUpdate.next((widget: AjfWidget|null): AjfWidget|null => {
          if (widget == null) {
            return null;
          }
          const myObj = widget as AjfLayoutWidget;

          if (myObj.columns.length === 1) {
            (myObj.content[0] as AjfColumnWidget).content.length = 0;
            return myObj;
          }

          if (myObj.columns[idx] == null) {
            throw new Error('this content is undefined');
          } else {
            let spread = myObj.columns[idx] / (myObj.columns.length - 1);

            if (myObj.columns.length > 1) {
              myObj.columns.splice(idx, 1);
              myObj.content.splice(idx, 1);
            }

            for (let i = 0; i < myObj.columns.length; i++) {
              myObj.columns[i] += spread;
            }
            this.instantColumnValue(myObj.columns[0], 0);
          }
          return myObj;
        });
        break;
      case 'column':
      case 'layoutContent':
      case 'unfixedColumn':
        this._currentWidgetUpdate.next((widget: AjfWidget|null): AjfWidget|null => {
          if (widget == null) {
            return null;
          }
          let myObj = <AjfLayoutWidget>widget;

          if (node === 'column') {
            let clm = <AjfColumnWidget>widget;
            clm.content.splice(idx, 1);
          } else if (node === 'layoutContent') {
            if (myObj.columns.length === 0) {
              throw new Error('the column length is 0');
            }
            if (myObj.content.length === 0) {
              throw new Error('can not remove any widget from empty content');
            }
            if (myObj.columns[idx] != null && myObj.content[idx] == null) {
              throw new Error('this content is undefined');
            }
          } else if (node === 'unfixedColumn') {
            if (myObj.columns[idx] !== -1) {
              throw new Error('the column position value  isnt -1');
            }
            this.unfixedColumn(idx);
          }
          // if (node !== 'obj') {
          //   let spread = myObj.columns[idx] / (myObj.columns.length - 1);
          //   myObj.content.splice(idx, 1);
          //   if (myObj.columns.length > 1) {
          //     myObj.columns.splice(idx, 1);
          //   }
          //   for (let i = 0; i < myObj.columns.length; i++) {
          //     myObj.columns[i] += spread;
          //   }
          //   this.instantColumnValue(myObj.columns[0], 0);
          // }
          return myObj;
        });
        break;
      case 'customWidgets': {
        this._updates[node].next((widgets: AjfCustomWidget[]): AjfCustomWidget[] => {
          if (widgets.length === 0) {
            throw new Error('you can not remove from empty array');
          }
          if (widgets[idx] == null) {
            throw new Error('invalid index');
          }
          widgets.splice(idx, 1);
          return widgets;
        });
      } break;
      default:
        throw new Error('unknown node ' + node);
    }
  }

  /**
   * This method add a AjfWidget on the current AjfLayoutWidget.
   *
   * @param newWidget
   * @param idx
   *
   * @memberOf AjfReportBuilderService
   */
  addToContent(newWidget: AjfWidget, idx: number) {
    this._currentWidgetUpdate.next((widget: AjfWidget|null): AjfWidget|null => {
      if (widget == null) {
        return null;
      }
      let myObj = <AjfLayoutWidget>widget;

      if (myObj.content[idx] != null) {
        myObj.content.splice(idx, 1);
      }
      myObj.content.splice(idx, 0, newWidget);
      return myObj;
    });
  }

  addToColumn(event: any, toColumn: AjfColumnWidget, position?: number) {
    if (event.dragData && event.dragData.fromColumn != null) {
      let fromColumn: AjfColumnWidget = event.dragData.fromColumn;
      let widget: AjfWidget = event.dragData.widget;
      let fromIndex: number = event.dragData.fromIndex;

      fromColumn.content.splice(fromIndex, 1);
      toColumn.content.push(widget);

    } else if (event.dragData && event.dragData.arrayFrom) {
      this.remove(event.dragData.arrayFrom, event.dragData.fromIndex);
      toColumn.content.push(event.dragData.widget);
    } else if (event.dragData && event.dragData.json) {
      let obj = JSON.parse(event.dragData.json);
      let newWidget = deepCopy(obj);

      if (position != null) {
        toColumn.content.splice(position, 0, newWidget);
      } else {
        toColumn.content.push(newWidget);
      }
    } else {
      let obj = {'widgetType': AjfWidgetType[event.dragData]};
      let newWidget = deepCopy(obj);

      if (position != null) {
        toColumn.content.splice(position, 0, newWidget);
      } else {
        toColumn.content.push(newWidget);
      }
    }
  }
  changePositionOnColumn(event: any, toColumn: AjfColumnWidget, toIndex: number) {
    let fromColumn: AjfColumnWidget = event.dragData.fromColumn;
    let fromIndex: number = event.dragData.fromIndex;
    let fromWidget: AjfWidget = fromColumn.content[fromIndex];
    let toWidget: AjfWidget = fromColumn.content[toIndex];

    if (fromColumn == toColumn) {
      fromColumn.content[fromIndex] = toWidget;
      fromColumn.content[toIndex] = fromWidget;
    } else {
      fromColumn.content.splice(fromIndex, 1);
      toColumn.content.splice(toIndex, 0, fromWidget);
    }
  }

  /**
   * This method add the obj on the idx position.
   * Obj have a no specificate width and is not calculate as columns
   *
   * @param idx
   *
   * @memberOf AjfReportBuilderService
   */
  fixedColumn(idx: number) {
    this.instantColumnValue(-1, idx);
  }

  changeColumn(from: number, to: number, layoutWidget: AjfLayoutWidget) {
    if (to < 0 || to >= layoutWidget.content.length) {
      return;
    }
    if (from > layoutWidget.content.length - 1 && to > from) {
      return;
    }

    let fromColumn: AjfColumnWidget = <AjfColumnWidget>layoutWidget.content[from];
    let fromColumnValue: number = layoutWidget.columns[from];
    let toColumn: AjfColumnWidget = <AjfColumnWidget>layoutWidget.content[to];
    let toColumnValue: number = layoutWidget.columns[to];

    layoutWidget.content[from] = toColumn;
    layoutWidget.columns[from] = toColumnValue;
    layoutWidget.content[to] = fromColumn;
    layoutWidget.columns[to] = fromColumnValue;

    this.updateCurrentWidget(layoutWidget);
  }

  addCustomColor(color: string) {
    this._updates['color'].next((colors: string[]): string[] => {
      if (colors.indexOf(color) < 0) {
        colors.push(color);
      }
      return colors;
    });
  }

  private _addWidgetToContainer(
      subj: Subject<AjfWidgetsOperation>, widget: AjfWidget, position?: number) {
    subj.next((widgets: AjfWidgetsContainer): AjfWidgetsContainer => {
      if (position != null && position >= 0) {
        widgets.widgets.splice(position, 0, widget);
      } else {
        widgets.widgets.push(widget);
      }
      return widgets;
    });
    this.updateCurrentWidget(widget);
    this.setEmptyContent(false);
  }

  private _setCurrentWidgetProperty(propName: string, value: any) {
    this._currentWidgetUpdate.next((widget: AjfWidget|null): AjfWidget|null => {
      if (widget == null) {
        return null;
      }
      (widget as any)[propName] = value;
      return widget;
    });
  }

  private _addToCurrentWidgetArrayProperty(propName: string, value: any) {
    this._currentWidgetUpdate.next((widget: AjfWidget|null): AjfWidget|null => {
      if (widget == null) {
        return null;
      }
      const arr = (widget as any)[propName] as any[];
      arr.push(value);
      (widget as any)[propName] = arr;
      return widget;
    });
  }

  private _removeFromCurrentWidgetArrayProperty(propName: string, idx: number) {
    this._currentWidgetUpdate.next((widget: AjfWidget|null): AjfWidget|null => {
      ((widget as any)[propName] as any[]).splice(idx, 1);
      return widget;
    });
  }
}
