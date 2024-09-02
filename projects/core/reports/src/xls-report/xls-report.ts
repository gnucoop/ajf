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
import {AjfChartType} from '../interface/charts/chart-type';
import {AjfWidget} from '../interface/widgets/widget';
import {AjfReport} from '../interface/reports/report';
import {AjfReportVariable} from '../interface/reports/report-variable';
import {AjfLayoutWidget} from '../interface/widgets/layout-widget';
import {AjfColumnWidget} from '../interface/widgets/column-widget';
import {AjfGraphNodeDataset} from '../interface/dataset/graph-dataset';

/**
 * This function builds a report from an excel file.
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
          __rowNum__: string;
        }[];

        if (sheetName === 'variables') {
          json
            .filter(e => e != null && e.name != null && e.name !== '')
            .forEach(elem => {
              let js: string;
              try {
                js = indicatorToJs(elem.value);
              } catch (err: any) {
                const r = Number(elem.__rowNum__) + 1;
                err = new Error(`Error in variable "${elem.name}" (row ${r}): ${err.message}`);
                window.alert(err.message);
                throw err;
              }
              variables.push({
                name: elem.name,
                formula: {formula: js},
              });
            });
        } else {
          const idx = filterNames.indexOf(sheetName);

          if (sheetName.includes('table')) {
            const tableWidget = _buildTable(sheetName, json);
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
          } else if (sheetName.includes('heatmap')) {
            const heatmapWidget = _buildHeatmap(sheetName, json);
            reportWidgets.push(heatmapWidget);
          } else if (sheetName.includes('paginatedlist')) {
            const pagListWidget = _buildPaginatedListTable(sheetName, json);
            reportWidgets.push(pagListWidget);
          } else if (sheetName.includes('paginatedDialogList')) {
            const pagListWidget = _buildPaginatedListTableWithDialog(sheetName, json);
            reportWidgets.push(pagListWidget);
          } else if (sheetName.includes('single')) {
            const singleWidget = _buildSingleIndicator(json);
            reportWidgets.push(...singleWidget);
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

function alertAndThrow(err: string) {
  window.alert(err);
  throw new Error(err);
}

// converts to true|undefined an option from an excel cell
function boolOption(cell: undefined | null | string | boolean): true | undefined {
  if (!cell || cell === 'false') {
    return undefined;
  }
  return true;
}

function _buildChart(name: string, sheet: {[key: string]: string}[]): AjfWidget {
  if (sheet == null || sheet.length === 0) {
    alertAndThrow('Empty sheet for chart ' + name);
  }
  const data = sheet[0];
  const optionsNames = [
    'chartType',
    'title',
    'stacked',
    'beginAtZeroX',
    'beginAtZeroY',
    'removeZeroValues',
    'mainDataNumberThreshold',
  ];
  const options: {[key: string]: string} = {};
  for (const name of optionsNames) {
    if (data[name] != null) {
      options[name] = data[name];
      delete data[name];
    }
  }
  const type = AjfChartType[options['chartType'] as any] as unknown as AjfChartType;
  if (type == null) {
    alertAndThrow('Invalid chart type for chart ' + name);
  }
  if (type !== AjfChartType.Scatter && type !== AjfChartType.Bubble && sheet.length !== 1) {
    alertAndThrow(`Chart "${name}" must have 1 row of data`);
  }
  if (type === AjfChartType.Scatter && sheet.length !== 2) {
    alertAndThrow(`Scatter chart "${name}" must have 2 rows of data`);
  }
  if (type === AjfChartType.Bubble && sheet.length !== 3) {
    alertAndThrow(`Bubble chart "${name}" must have 3 rows of data`);
  }
  const labels = data['labels'];
  let labelsFormula: AjfFormula = {formula: '[]'};
  if (labels != null) {
    delete data['labels'];
    let labelsJs = '';
    try {
      labelsJs = indicatorToJs(labels);
    } catch (err: any) {
      alertAndThrow(`Error in labels of chart ${name}: ${err.message}`);
    }
    labelsFormula = {formula: labelsJs};
  }

  const stacked = boolOption(options['stacked']);
  const beginAtZeroX = boolOption(options['beginAtZeroX']);
  const beginAtZeroY = boolOption(options['beginAtZeroY']);
  const removeZeroValues =
    options['removeZeroValues'] != null ? Boolean(options['removeZeroValues']) : true;
  const mainDataNumberThreshold =
    +options['mainDataNumberThreshold'] || +options['mainDataNumberThreshold'] === 0
      ? +options['mainDataNumberThreshold']
      : 10;

  const dataset: AjfChartDataset[] = [];
  Object.keys(data).forEach((key, index) => {
    let xs = '';
    try {
      xs = indicatorToJs(data[key]);
    } catch (err: any) {
      alertAndThrow(`Error in X data "${key}" of chart "${name}": ${err.message}`);
    }
    let ys = '';
    if (type === AjfChartType.Scatter || type === AjfChartType.Bubble) {
      try {
        ys = indicatorToJs(sheet[1][key]);
      } catch (err: any) {
        alertAndThrow(`Error in Y data "${key}" of chart "${name}": ${err.message}`);
      }
    }
    let rs = 'undefined';
    if (type === AjfChartType.Bubble) {
      try {
        rs = indicatorToJs(sheet[2][key]);
      } catch (err: any) {
        alertAndThrow(`Error in radius data "${key}" of chart "${name}": ${err.message}`);
      }
    }
    let formula: AjfFormula[];
    if (type === AjfChartType.Scatter || type === AjfChartType.Bubble) {
      formula = [createFormula({formula: `buildPointData(${xs}, ${ys}, ${rs})`})];
    } else {
      formula = [createFormula({formula: xs})];
    }

    const multipleColors =
      type === AjfChartType.Pie ||
      type === AjfChartType.PolarArea ||
      type === AjfChartType.Doughnut;
    const color = multipleColors ? backgroundColor : backgroundColor[index];
    const datasetOptions: any = {backgroundColor: color, tension: 0};
    if (type === AjfChartType.Line && !stacked) {
      datasetOptions.backgroundColor = 'transparent';
      datasetOptions.borderColor = color;
      datasetOptions.pointBackgroundColor = color;
    }
    dataset.push({
      ...createDataset({
        aggregation: {aggregation: 0},
        formula,
        label: key,
      }),
      options: datasetOptions,
    } as AjfChartDataset);
  });

  const scales: Chart.ChartScales = {};
  if (stacked || beginAtZeroX) {
    scales.xAxes = [{stacked, ticks: beginAtZeroX ? {beginAtZero: true} : undefined}];
  }
  if (stacked || beginAtZeroY) {
    scales.yAxes = [{stacked, ticks: {beginAtZero: true}}];
  }
  return createWidget({
    name,
    widgetType: AjfWidgetType.Chart,
    type,
    labels: labelsFormula,
    dataset,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      legend: {display: true, position: 'bottom'},
      title: {
        display: true,
        text: options['title'] || '',
      },
      scales,
    },
    styles: {
      ...widgetStyle,
      ...{width: '100%', maxWidth: '1000px', margin: '10px auto'},
    },
    exportable: true,
    mainDataNumberThreshold: mainDataNumberThreshold,
    removeZeroValues: removeZeroValues,
  } as AjfWidgetCreate);
}

function _buildGraph(name: string, json: {[key: string]: string}[]): AjfWidget {
  const nodes: AjfGraphNodeDataset[] = [];

  json.forEach(row => {
    const rowKeys = Object.keys(row);
    if (rowKeys.includes('id') && row['id']) {
      const rowId = row['id'].trim().replace(/"/g, '');
      if (rowId && rowId.length) {
        let graphNodeObj: {[key: string]: any} = {};
        rowKeys.forEach(rowKey => {
          let js: string;
          try {
            js = indicatorToJs(row[rowKey]);
          } catch (err: any) {
            const rowNum = Number(row['__rowNum__']) + 1;
            err = new Error(
              `Error in "${name}", row ${rowNum}, column "${rowKey}": ${err.message}`,
            );
            window.alert(err.message);
            throw err;
          }
          graphNodeObj[rowKey] = js;
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
    htmlText: String(firstRow['html']),
    styles: htmlWidget,
  });
}

function getTrendWidget(
  value: string | null,
  color: string,
  condition: string,
  icon: string,
): AjfWidget {
  let percValue = `[[${value}]]%`;
  if (!value) {
    percValue = '';
  }
  return createWidget({
    widgetType: AjfWidgetType.Text,
    htmlText: `<i class=\"material-icons\" style=\"vertical-align: bottom; color: ${color}\">${icon}</i><span style=\"color: ${color}\">${percValue}</span>`,
    styles: {
      ...htmlWidget,
      color: color,
      fontSize: '16px',
      justifyContent: 'center',
    },
    visibility: {
      condition: condition,
    },
  });
}

function _buildSingleIndicator(json: {[key: string]: string}[]): AjfWidget[] {
  const indicatorWidgets: AjfWidget[] = [];
  const firstRow = json.length > 0 && json[0]['html'] != null ? json[0] : {html: ''};

  indicatorWidgets.push(
    createWidget({
      widgetType: AjfWidgetType.Text,
      htmlText: String(firstRow['html']),
      styles: {
        ...htmlWidget,
        marginBottom: '0',
        justifyContent: 'center',
      },
    }),
  );

  let showTrend = false;
  let marginBottom = '10px';
  if (firstRow['percentage_change']) {
    showTrend = true;
    marginBottom = '0';
  }
  indicatorWidgets.push(
    createWidget({
      widgetType: AjfWidgetType.Text,
      htmlText: '[[' + String(firstRow['current_value']) + ']]',
      styles: {
        ...htmlWidget,
        marginBottom,
        fontSize: '90px',
        fontWeight: 'bold',
        lineHeight: '1',
        justifyContent: 'center',
      },
    }),
  );

  if (showTrend) {
    indicatorWidgets.push(
      getTrendWidget(
        String(firstRow['percentage_change']),
        'red',
        `${String(firstRow['percentage_change'])} < 0`,
        'trending_down',
      ),
    );

    indicatorWidgets.push(
      getTrendWidget(
        String(firstRow['percentage_change']),
        'green',
        `${String(firstRow['percentage_change'])} > 0`,
        'trending_up',
      ),
    );

    indicatorWidgets.push(
      getTrendWidget(
        String(firstRow['percentage_change']),
        'orange',
        `${String(firstRow['percentage_change'])} == 0`,
        'trending_flat',
      ),
    );

    indicatorWidgets.push(
      getTrendWidget(null, 'orange', `${String(firstRow['percentage_change'])} === '-'`, 'remove'),
    );
  }
  return indicatorWidgets;
}

function _buildTable(
  sheetName: string,
  json: {[key: string]: string | number | boolean}[],
): AjfWidget {
  let tableHeader: AjfTableDataset[] = [];
  let dataRows = '[]';
  let formula = '';
  let pageSize = 10;
  let pagination = false;
  if (json.length > 1) {
    const rowspan = 1;
    const titles = Object.keys(json[0]);
    const colspanRowValues = Object.values(json[0]).map(v => (v ? v.toString() : ''));
    const colspans: number[] = colspanRowValues.map(r => +r.charAt(0));
    const textAlign: string[] = colspanRowValues.map(r => {
      switch (r.charAt(1)) {
        case 'l':
          return 'left';
        case 'r':
          return 'right';
        default:
          return 'center';
      }
    });
    const sortCols: boolean[] = colspanRowValues.map(r =>
      r.charAt(2) && r.charAt(2) === 's' ? true : false,
    );
    tableHeader = titles.map((title, index) => ({
      label: '',
      formula: {formula: `"${title}"`},
      aggregation: {aggregation: 0},
      colspan: colspans[index],
      rowspan,
      sorted: sortCols[index],
      style: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#3f51b5',
        borderBottom: '2px solid #ddd',
      },
    }));
    pagination = json[1]['pagination'] ? (json[1]['pagination'] as boolean) : false;

    if ('dataset' in json[1]) {
      const dialogFields = json[1]['dialog_fields']
        ? (json[1]['dialog_fields'] as string).split(',').map(v => v.trim())
        : [];
      const dialogLabelFields = json[1]['dialog_fields_labels']
        ? (json[1]['dialog_fields_labels'] as string).split(',').map(v => v.trim())
        : [];
      formula = _buildFormListTable(json, colspans, textAlign, dialogFields, dialogLabelFields);
      if (dialogFields && dialogFields.length) {
        tableHeader.push({
          label: '',
          formula: {formula: `" "`},
          aggregation: {aggregation: 0},
          colspan: 1,
          rowspan,
          style: {
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: '#3f51b5',
            borderBottom: '2px solid #ddd',
          },
        });
      }
    } else {
      delete json[0];
      dataRows = '[';
      json.forEach(row => {
        let dataRow = '[';
        titles.forEach(title => {
          let elem = row[title] || `''`;
          try {
            elem = indicatorToJs(elem as string);
          } catch (err: any) {
            const rowNum = Number(row['__rowNum__']) + 1;
            err = new Error(
              `Error in "${sheetName}", row ${rowNum}, column "${title}": ${err.message}`,
            );
            window.alert(err.message);
            throw err;
          }
          dataRow += elem + ',';
        });
        dataRow += ']';
        dataRows += dataRow + ',';
      });
      dataRows += ']';
      formula = `buildAlignedDataset(plainArray(${dataRows}),${JSON.stringify(
        colspans,
      )},${JSON.stringify(textAlign)})`;
    }
  }

  if (pagination) {
    return createWidget({
      widgetType: AjfWidgetType.PaginatedTable,
      pageSize: pageSize,
      rowDefinition: {
        formula: formula,
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
  } else {
    return createWidget({
      widgetType: AjfWidgetType.DynamicTable,
      rowDefinition: {
        formula: formula,
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
}

/**
 * Create a formula for a dynamic table widget, based on a list of Forms
 * @param json
 * @returns the formula for the DynamicTable AjfWidget, like this:
 * buildFormDataset(projectsDataset, ['id_p','donors','budget','dino_area_name','calc_progress',])"
 */
function _buildFormListTable(
  json: {[key: string]: string | number | boolean}[],
  colspans: number[],
  textAlign: string[],
  dialogFields: string[],
  dialogLabelFields: string[],
): string {
  let formula = '';
  if (json.length > 1) {
    let fields = '[';
    Object.keys(json[0]).forEach(fieldColName => {
      let elem = json[1][fieldColName] ? `'${json[1][fieldColName]}'` : `''`;
      fields += elem + ',';
    });
    fields += ']';
    const dataset = json[1]['dataset'] as string;
    const linkField = json[1]['link_field'] as string;
    const linkPos = json[1]['link_position'] ? +json[1]['link_position'] : 0;
    const rowLink =
      linkField && linkField.length ? `{'link': '${linkField}', 'position': ${linkPos}}` : null;

    formula = `buildAlignedFormDataset(${dataset}, ${fields}, ${JSON.stringify(
      colspans,
    )}, ${JSON.stringify(textAlign)}, ${rowLink}, ${JSON.stringify(dialogFields)}, ${JSON.stringify(
      dialogLabelFields,
    )})`;
  }
  return formula;
}

/**
 * Create a widget with a dynamic paginated table based on a list of Forms. Each row is an AjfTable.
 * @param sheetName
 * @param json
 * @returns a Paginated AjfWidget with a formula like this:
 * buildWidgetDataset(projectsDataset, ['id_p','donors','budget','dino_area_name','calc_progress','home_link_text',],
 *   {'link': 'home_link', 'position': 5}, {'border': 'none'},{'width': '900px'}, ['10%','30%','10%','25%','15%','10%'], \"#f0f0f0\", \"white\")"
 */
function _buildPaginatedListTable(_: string, json: {[key: string]: string}[]): AjfWidget {
  let formula = '';
  let pageSize = 10;
  let dataset: string = '';
  let title = '';
  if (json.length > 1) {
    const colsPercentage: string = (Object.values(json[0]) as string[])
      .map(r => `'${r}%'`)
      .join(',');
    const colsPercentageArray = `[${colsPercentage}]`;

    let fields = '[';
    Object.keys(json[0]).forEach(fieldColName => {
      let elem = json[1][fieldColName] ? `'${json[1][fieldColName]}'` : `''`;
      fields += elem + ',';
    });
    fields += ']';

    dataset = json[1]['dataset'] as string;
    title = json[1]['title'] as string;
    pageSize = json[1]['pageSize'] ? +json[1]['pageSize'] : 10;
    const linkField = json[1]['link_field'] as string;
    const linkPos = json[1]['link_position'] ? +json[1]['link_position'] : 0;
    const rowLink =
      linkField && linkField.length ? `{'link': '${linkField}', 'position': ${linkPos}}` : null;
    const cellStyles = json[1]['cellStyles'];
    const rowStyle = json[1]['rowStyle'];
    const backgroundColorA = json[1]['backgroundColorA'] as string;
    const backgroundColorB = json[1]['backgroundColorB'] as string;

    formula =
      `buildWidgetDataset(${dataset}, ${fields}, ${rowLink}, ${cellStyles},` +
      `${rowStyle}, ${colsPercentageArray}, ${JSON.stringify(backgroundColorA)}, ${JSON.stringify(
        backgroundColorB,
      )})`;
  }
  return createWidget({
    widgetType: AjfWidgetType.PaginatedList,
    pageSize: pageSize,
    title: title,
    contentDefinition: {
      formula: formula,
    },
    exportable: true,
    styles: {
      height: '500px',
    },
  });
}

/**
 * Create a widget with a dynamic paginated table based on a list of Forms. Each row is an AjfDialogWidget with an AjfTable
 * that open, on click, a dialog.
 * @param sheetName
 * @param json
 * @returns a Paginated AjfWidget with a formula like this:
 * buildWidgetDatasetWithDialog(projectsDataset, ['id_p','donors','province_choicesLabel','dino_area_name','calc_progress','home_link_text',],
 *  ['id_p','donors','province_choicesLabel','dino_area_name'], ['Codice progetto','Donors','Provinces','Settore di attivita'],
 *  {'border': 'none'},{'width': '900px'}, ['10%','30%','10%','25%','15%','10%'], \"#f0f0f0\", \"white\")
 */
function _buildPaginatedListTableWithDialog(_: string, json: {[key: string]: string}[]): AjfWidget {
  let formula = '';
  let pageSize = 10;
  let dataset: string = '';
  let title = '';
  if (json.length > 1) {
    const colsPercentage: string = (Object.values(json[0]) as string[])
      .map(r => `'${r}%'`)
      .join(',');
    const colsPercentageArray = `[${colsPercentage}]`;

    let fields = '[';
    Object.keys(json[0]).forEach(fieldColName => {
      let elem = json[1][fieldColName] ? `'${json[1][fieldColName]}'` : `''`;
      fields += elem + ',';
    });
    fields += ']';

    let dialogFields = '[';
    let dialogLabelFields = '[';
    if (json.length > 3) {
      dialogLabelFields += (Object.values(json[2]) as string[]).map(v => `'${v}'`).join(',');
      dialogFields += (Object.values(json[3]) as string[]).map(v => `'${v}'`).join(',');
    }
    dialogFields += ']';
    dialogLabelFields += ']';

    dataset = json[1]['dataset'] as string;
    title = json[1]['title'] as string;
    pageSize = json[1]['pageSize'] ? +json[1]['pageSize'] : 10;
    const cellStyles = json[1]['cellStyles'];
    const rowStyle = json[1]['rowStyle'];
    const backgroundColorA = json[1]['backgroundColorA'] as string;
    const backgroundColorB = json[1]['backgroundColorB'] as string;

    formula =
      `buildWidgetDatasetWithDialog(${dataset}, ${fields}, ${dialogFields}, ${dialogLabelFields}, ${cellStyles},` +
      `${rowStyle}, ${colsPercentageArray}, ${JSON.stringify(backgroundColorA)}, ${JSON.stringify(
        backgroundColorB,
      )})`;
  }
  return createWidget({
    widgetType: AjfWidgetType.PaginatedList,
    pageSize: pageSize,
    title: title,
    contentDefinition: {
      formula: formula,
    },
    exportable: true,
    styles: {
      height: '500px',
    },
  });
}

const _buildHeatmap = (_: string, json: {[key: string]: string}[]): AjfWidget => {
  const defaultFeatures = {
    type: 'FeatureCollection',
    features: [],
  };
  const options = {
    values: '[]',
    idProp: 'id',
    features: JSON.stringify(defaultFeatures),
    startColor: '#ffeb3b',
    endColor: '#f44336',
    highlightColor: '#009688',
    showVisualMap: false,
    ...(json.length > 0 ? json[0] : {}),
  };
  return createWidget({
    widgetType: AjfWidgetType.HeatMap,
    ...options,
    values: {formula: options.values},
    styles: {
      minHeight: '200px',
    },
  });
};
