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
import {
  AjfAggregationType, AjfChartType, AjfChartWidget, AjfDataset, AjfDataWidget, AjfWidget,
  AjfWidgetType
} from '@ajf/core/reports';
import {ChangeDetectionStrategy, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Subscription} from 'rxjs';

import {AjfReportBuilderFormsAnalyzerDialog} from './forms-analyzer-dialog';
import {AjfFormVariables} from './models';
import {AjfReportBuilderService} from './report-builder-service';

/**
 * this component provides the support for connect the form fields with the report
 *
 * @export
 */
@Component({
  selector: 'ajf-report-builder-forms-analyzer',
  templateUrl: 'forms-analyzer.html',
  styleUrls: ['forms-analyzer.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AjfReportBuilderFormsAnalyzer implements OnDestroy {
  currentWidget: AjfWidget|null = null;

  forms: AjfForm[] = [];

  formsVariables: AjfFormVariables[];
  choicesOrigins: any = {};

  dialogRef: MatDialogRef<AjfReportBuilderFormsAnalyzerDialog>;

  currentMainDataIndex: number = -1;
  private _dataset: AjfDataset[][] = [];
  private _currentWidgetSub: Subscription = Subscription.EMPTY;
  private _formAnalyzerSub: Subscription = Subscription.EMPTY;

  constructor(
    private _service: AjfReportBuilderService,
    public dialog: MatDialog
  ) {
    this._currentWidgetSub = this._service.currentWidget
      .subscribe(x => {
        if (x != null) {
          this.currentWidget = x;
          // this._dataset = myObj.dataset;
        } else {
          this.currentWidget = null;
        }
      });


    this._formAnalyzerSub = this._service.formsVariables
      .subscribe((x) => {
        if (x != null) {
          this.formsVariables = x;
        }
      });


  }

  setCurrentIndex(index: number) {
    this.currentMainDataIndex = index;
  }

  isSelected(index: number): ThemePalette {
    if (index === this.currentMainDataIndex) {
      return 'primary';
    } else {
      return undefined;
    }
  }

  /**
   *  get the X components label of the chart.
   *  they are contained in the first row of dataset
   *
   *
   * @memberof AjfReportBuilderFormsAnalyzer
   */
  getMainData(): string[] {
    if (this._dataset[0] != null) {
      let mainData: string[] = [];

      for (let i = 0; i < this._dataset[0].length; i++) {
        mainData.push(this._dataset[0][i].label || '');
      }
      return mainData;
    } else {
      return [];
    }
  }

  /**
   *  get the Y components label of the chart.
   *  they are contained in the first column of dataset
   *
   *
   * @memberof AjfReportBuilderFormsAnalyzer
   */
  getDataset(): string[] {
    let dataset: string[] = [];
    if (this._dataset[0] != null) {
      for (let i = 1; i < this._dataset.length; i++) {
        dataset.push(this._dataset[i][0].label || '');
      }
      return dataset;
    } else {
      return [];
    }
  }

  /**
   * get the related data label of the chart.
   * they are contained in the row of the Y component
   *
   *
   * @memberof AjfReportBuilderFormsAnalyzer
   */
  getRelatedData(): string[] {
    if (this._dataset[this.currentMainDataIndex + 1] != null) {
      let relatedData: string[] = [];

      for (let i = 1; i < this._dataset[this.currentMainDataIndex + 1].length; i++) {
        relatedData.push(this._dataset[this.currentMainDataIndex + 1][i].label || '');
      }
      return relatedData;
    } else {
      return [];
    }
  }

  getTableHeader(): string[] {
    let mainData: string[] = [];
    if (this._dataset != null) {
      for (let i = 0; i < this._dataset.length; i++) {
        if (this._dataset[i][0] != null) {
          mainData.push(this._dataset[i][0].label || '');
        }
      }
    }
    return mainData;
  }

  getTableData(): string[] {
    if (this._dataset[this.currentMainDataIndex] != null) {
      let tableData: string[] = [];

      for (let i = 1; i < this._dataset[this.currentMainDataIndex].length; i++) {
        if (this._dataset[this.currentMainDataIndex][i] != null) {
          tableData.push(this._dataset[this.currentMainDataIndex][i].label || '');
        }
      }
      return tableData;
    } else {
      return [];
    }
  }

  needMainData(): boolean {
    let myObj = <AjfChartWidget>this.currentWidget;
    if (
      myObj.chartType === AjfChartType.Scatter ||
      myObj.chartType === AjfChartType.Bubble
    ) {
      return false;
    } else {
      return true;
    }
  }

  removeMainData(index: number) {
    this._service.removeMainData(index);
  }

  removeDataset(index: number) {
    this.currentMainDataIndex = index;
    this._service.removeRelatedData(this.currentMainDataIndex, -1);
  }
  removeTableMainData(index: number) {
    this._service.removeTableMainData(index);
  }

  removeRelatedData(index: number) {
    this._service.removeRelatedData(this.currentMainDataIndex, index);
  }

  removeData(mainIndex: number, index: number) {
    this._service.removeData(mainIndex, index);
  }

  /**
   *
   *
   *
   * @param index
   * @param editMode
   *
   * @memberof AjfReportBuilderFormsAnalyzer
   */
  openDialog(level: number, mainIndex: number, index: number, editMode: boolean) {

    this.dialogRef = this.dialog.open(AjfReportBuilderFormsAnalyzerDialog);

    if (editMode) {
      if (level === 1 && index === -1) {
        index = 0;
      }
      if (level === 1) {
        if (this.currentWidget != null && this.currentWidget.widgetType == AjfWidgetType.Chart) {
          mainIndex++;
        }
        index++;
      }

      this.dialogRef.componentInstance.labelText =
        this._dataset[mainIndex] &&
        this._dataset[mainIndex][index].label || '';
      /* this.dialogRef.componentInstance.formula =
        this._dataset[mainIndex] &&
        this._dataset[mainIndex][index].formula.formula || ''; */
      this.dialogRef.componentInstance.aggregation =
        this._dataset[mainIndex] &&
        this._dataset[mainIndex][index].aggregation.aggregation || AjfAggregationType.None;
    } else {
      this.dialogRef.componentInstance.labelText = '';
      this.dialogRef.componentInstance.formula = '';
      this.dialogRef.componentInstance.aggregation = 0;
    }

    // this.dialogRef.componentInstance.formsVariables = this.formsVariables;
    this.dialogRef.componentInstance.currentWidget = <AjfDataWidget>this.currentWidget;
    this.dialogRef.componentInstance.level = level;
    this.dialogRef.componentInstance.mainIndex = mainIndex;
    this.dialogRef.componentInstance.index = index;
    this.dialogRef.componentInstance.init = false;
  }

  openDialogAddMainData() {
    this.openDialog(0, -1, -1, false);
  }

  openDialogChartEditMainData() {
    this.openDialog(0, 0, this.currentMainDataIndex, true);
  }

  openDialogTableEditMainData() {
    this.openDialog(0, this.currentMainDataIndex, 0, true);
  }

  openDialogChartAddDataset() {
    this.openDialog(1, -1, -1, false);
  }
  openDialogTableAddDataset() {
    this.openDialog(1, this.currentMainDataIndex, -1, false);
  }
  openDialogChartAddDataOfDataset() {
    this.openDialog(1, this.currentMainDataIndex, -1, false);
  }
  openDialogChartEditDataset() {
    this.openDialog(1, this.currentMainDataIndex, -1, true);
  }
  openDialogTableEditDataset(index: number) {
    this.openDialog(1, this.currentMainDataIndex, index, true);
  }
  openDialogChartEditDataOfDataset(index: number) {
    this.openDialog(1, this.currentMainDataIndex, index, true);
  }

  ngOnDestroy(): void {
    this._currentWidgetSub.unsubscribe();
    this._formAnalyzerSub.unsubscribe();
  }

}
