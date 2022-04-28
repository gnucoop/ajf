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

import {AjfFormula, createFormula} from '@ajf/core/models';
import {deepCopy} from '@ajf/core/utils';
import {HttpClient} from '@angular/common/http';
import {ChartColor} from 'chart.js';
import {forkJoin, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import * as XLSX from 'xlsx';

import {backgroundColor} from '../automatic-report/styles';

import {indicatorToJs} from './hindikit-parser';
import {htmlWidget, widgetStyle} from './styles';
import {createDataset} from '../utils/dataset/create-dataset';
import {createReportContainer} from '../utils/reports/create-report-container';
import {AjfWidgetCreate, createWidget} from '../utils/widgets/create-widget';
import {AjfWidgetType} from '../interface/widgets/widget-type';
import {AjfTableDataset} from '../interface/dataset/table-dataset';
import {AjfChartDataset} from '../interface/dataset/chart-dataset';
import {AjfChartDatasetOptions} from '../interface/dataset/chart-dataset-options';
import {AjfChartType} from '../interface/charts/chart-type';
import {AjfWidget} from '../interface/widgets/widget';
import {AjfReport} from '../interface/reports/report';
import {AjfReportVariable} from '../interface/reports/report-variable';
import {AjfLayoutWidget} from '../interface/widgets/layout-widget';
import {AjfColumnWidget} from '../interface/widgets/column-widget';
import {AjfGraphNodeDataset} from '../interface/dataset/graph-dataset';

/**
 * This function returns a basic report for any form passed in input.
 *
 * @param form the form schema
 * @param [id] the id of the form inside the plathform.
 */
export function xlsReport(file: string, http: HttpClient): Observable<AjfReport> {
  const workbook = XLSX.read(file, {type: 'binary'});
  const report: AjfReport = {};
  const reportWidgets: AjfWidget[] = [];

  const variables: AjfReportVariable[] = [];
  const filters: {[sheetName: string]: Observable<any>} = {};
  // create filters
  workbook.SheetNames.forEach((sheetName, index) => {
    const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
    if (sheetName.includes('filter') && index + 1 < workbook.SheetNames.length) {
      const nextSheet = sheetName.includes('global')
        ? 'global_filter'
        : workbook.SheetNames[index + 1];
      filters[nextSheet] = _buildFilter(workbook, sheet, http);
    }
  });

  const obsFilterValues: Observable<any>[] = Object.values(filters).length
    ? Object.values(filters)
    : [of({})];
  const filterNames: string[] = Object.keys(filters);

  return forkJoin(obsFilterValues).pipe(
    map(f => {
      workbook.SheetNames.forEach(sheetName => {
        const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet) as {
          name: string;
          value: string;
        }[];

        if (sheetName === 'variables') {
          json
            .filter(e => e != null && e.name != null && e.value != null)
            .forEach(elem => {
              let indicator = elem.value;
              try {
                indicator = indicatorToJs(elem.value);
              } catch (e) {
                console.log(e);
              }
              variables.push({
                name: elem.name,
                formula: {formula: indicator},
              });
            });
        } else {
          const idx = filterNames.indexOf(sheetName);

          if (sheetName.includes('table')) {
            const tableWidget = _buildTable(json);
            reportWidgets.push(tableWidget);
          } else if (sheetName.includes('chart')) {
            const chartWidget = _buildChart(sheetName, json);
            reportWidgets.push(chartWidget);
          } else if (sheetName.includes('html')) {
            const chartWidget = _buildHtml(json);
            reportWidgets.push(chartWidget);
          } else if (sheetName.includes('graph')) {
            const graphWidget = _buildGraph(sheetName, json);
            reportWidgets.push(graphWidget);
          }

          if (idx >= 0) {
            reportWidgets[reportWidgets.length - 1].filter = {
              schema: f[idx] as any,
            };
          }
        }
      });
      const globalFilterIdx = filterNames.indexOf('global_filter');
      const layoutWidget: AjfLayoutWidget = {
        widgetType: AjfWidgetType.Layout,
        content: [
          createWidget({
            widgetType: AjfWidgetType.Column,
            content: [...reportWidgets],
            filter: globalFilterIdx >= 0 ? {schema: f[globalFilterIdx]} : undefined,
          } as AjfColumnWidget),
        ],
        columns: [1],
        visibility: {
          condition: 'true',
        },
        styles: {},
      };

      report.variables = variables;
      report.content = createReportContainer(layoutWidget);

      return report;
    }),
  );
}

function _buildFilter(
  wbook: XLSX.WorkBook,
  sheet: XLSX.WorkSheet,
  http: HttpClient,
): Observable<any> {
  const data = new FormData();
  const filterBook: XLSX.WorkBook = deepCopy(wbook);
  const filterSheet: XLSX.WorkSheet = deepCopy(sheet);
  const choicesSheet: XLSX.WorkSheet = deepCopy(wbook.Sheets['choices']);
  filterBook.SheetNames = ['survey', 'choices'];
  filterBook.Sheets = {survey: filterSheet, choices: choicesSheet};
  const filterXlsx = XLSX.write(filterBook, {
    bookType: 'xlsx',
    type: 'array',
  });
  const file = new File([filterXlsx], 'filter.xlsx');
  data.append('excelFile', file);

  return http.post('https://formconv.herokuapp.com/result.json', data);
}

function _buildChart(name: string, json: {[key: string]: string}[]): AjfWidget {
  const optionLabels = ['chartType', 'title'];
  const chartOptions: {[key: string]: string} = {};
  const datasetObj: {[key: string]: any} = {};
  const dataset: AjfChartDataset[] = [];
  let labels: AjfFormula = {formula: `[]`};

  if (json.length > 0) {
    const firstRow = json[0];
    optionLabels.forEach(optionLabel => {
      if (firstRow[optionLabel] != null) {
        chartOptions[optionLabel] = firstRow[optionLabel];
        delete firstRow[optionLabel];
      }
    });
  }
  json.forEach(row => {
    const rowKeys = Object.keys(row);
    rowKeys.forEach(rowKey => {
      const value = row[rowKey];
      if (datasetObj[rowKey] == null) {
        datasetObj[rowKey] = [value];
      } else {
        datasetObj[rowKey].push(value);
      }
    });
  });
  const doLabels = datasetObj['labels'];
  if (doLabels != null) {
    labels = {
      formula: `plainArray([${doLabels.map((label: string) => indicatorToJs(label))}])`,
    };
    delete datasetObj['labels'];
  }
  Object.keys(datasetObj).forEach((datasetObjKey, index) => {
    const datasetRow = datasetObj[datasetObjKey].map((r: string) => indicatorToJs(`${r}`));

    const chartType = chartOptions['chartType'];
    const colorCondition =
      chartType === 'Pie' || chartType === 'PolarArea' || chartType === 'Doughnut';
    const backColor = colorCondition ? backgroundColor : backgroundColor[index];
    const formula: AjfFormula[] = [
      createFormula({formula: `plainArray([${datasetRow.toString()}])`}),
    ];
    const datasetOptions: AjfChartDatasetOptions = {
      backgroundColor: backColor as ChartColor,
    };
    dataset.push({
      ...createDataset({
        aggregation: {aggregation: 0},
        formula,
        label: datasetObjKey,
      }),
      options: datasetOptions,
    } as AjfChartDataset);
  });

  return createWidget({
    name,
    widgetType: AjfWidgetType.Chart,
    type: AjfChartType[chartOptions['chartType'] as any] as unknown as AjfChartType,
    labels,
    dataset,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {display: true, position: 'bottom'},
      title: {
        display: true,
        text: `${chartOptions['title'] || ''}`.replace(/"/gi, ''),
      },
    },
    styles: {
      ...{width: '100%', height: '100%', padding: '20px'},
      ...widgetStyle,
    },
    exportable: true,
  } as AjfWidgetCreate);
}

function _buildGraph(name: string, json: {[key: string]: string}[]): AjfWidget {
  const nodes: AjfGraphNodeDataset[] = [];

  json.forEach(row => {
    const rowKeys = Object.keys(row);
    if (rowKeys.includes('id') && row['id']) {
      const rowId = row['id'].trim().replace(/^["]|["]$/g, '');
      if (rowId && rowId.length) {
        let graphNodeObj: {[key: string]: any} = {};
        rowKeys.forEach(rowKey => {
          const value = row[rowKey].toString();
          graphNodeObj[rowKey] = value;
        });
        graphNodeObj['id'] = rowId;
        nodes.push(graphNodeObj as AjfGraphNodeDataset);
      }
    }
  });

  return createWidget({
    widgetType: AjfWidgetType.Graph,
    nodes,
    styles: {},
  } as AjfWidgetCreate);
}

function _buildHtml(json: {[key: string]: string}[]): AjfWidget {
  const firstRow = json.length > 0 && json[0]['html'] != null ? json[0] : {html: ''};

  return createWidget({
    widgetType: AjfWidgetType.Text,
    htmlText: `${firstRow['html']}`,
    styles: htmlWidget,
  });
}

function _buildTable(json: {[key: string]: string}[]): AjfWidget {
  const rowspan = 1;
  const dataElements: any[][] = [];
  const titles = Object.keys(json[0]);
  const colspans: number[] = (Object.values(json[0]) as string[]).map(r => +r);
  delete json[0];
  const tableHeader: AjfTableDataset[] = titles.map((title, index) => ({
    label: '',
    formula: {formula: `\"${title}\"`},
    aggregation: {aggregation: 0},
    colspan: colspans[index],
    rowspan,
    style: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: '#3f51b5',
    },
  }));

  json.forEach(row => {
    const elems: any[] = [];
    titles.forEach(title => {
      let elem: string = row[title] || `\"\"`;
      try {
        elem = indicatorToJs(elem);
      } catch (err) {
        elem = `${row[title]}`;
      }
      elems.push(elem.replace(/[\*\r\n]|@[\w-]+/g, ''));
    });
    dataElements.push(elems);
  });

  return createWidget({
    widgetType: AjfWidgetType.DynamicTable,
    rowDefinition: {
      formula: `buildDataset([${dataElements}],${JSON.stringify(colspans)})`,
    },
    dataset: tableHeader,
    exportable: true,
    cellStyles: {
      textAlign: 'center',
      color: 'black',
      backgroundColor: 'white',
    },
    styles: {
      borderCollapse: 'collapse',
    },
  });
}
