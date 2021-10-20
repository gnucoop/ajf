import {ChartData} from 'chart.js';
import * as XLSX from 'xlsx';

import {AjfTableCell} from '../table';

import {AjfWidgetExport} from './index';
import {AjfWidgetType} from './interface/widgets/widget-type';

describe('widget-export', () => {
  const widgetExport = new AjfWidgetExport();
  const dataChart: ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65000000, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        lineTension: 0.1,
      },
    ],
  };

  const dataTableXlsx: AjfTableCell[][] = [
    [
      {value: {changingThisBreaksApplicationSecurity: 'a'}},
      {value: {changingThisBreaksApplicationSecurity: 'b'}},
      {value: {changingThisBreaksApplicationSecurity: 'c'}},
    ],
    [
      {value: {changingThisBreaksApplicationSecurity: 'd'}},
      {value: {changingThisBreaksApplicationSecurity: 'e'}},
      {value: {changingThisBreaksApplicationSecurity: 'f'}},
    ],
    [
      {value: {changingThisBreaksApplicationSecurity: 'g'}},
      {value: {changingThisBreaksApplicationSecurity: 'h'}},
      {value: {changingThisBreaksApplicationSecurity: 'i'}},
    ],
  ] as AjfTableCell[][];

  it('widget chart to xlsx data', () => {
    widgetExport.data = dataChart;
    widgetExport.widgetType = AjfWidgetType.Chart;
    const testSpy = spyOn(XLSX.utils, 'aoa_to_sheet').and.callThrough();
    widgetExport.exportCsv();
    const toEqual: unknown[][] = [
      ['name', 'January', 'February', 'March', 'April', 'May', 'June', 'July'],
      ['My First Dataset', 65000000, 59, 80, 81, 56, 55, 40],
    ];
    expect(testSpy).toHaveBeenCalledWith(toEqual);
  });

  it('widget table to xlsx data', () => {
    widgetExport.data = dataTableXlsx;
    widgetExport.widgetType = AjfWidgetType.Table;
    const testSpy = spyOn(XLSX.utils, 'aoa_to_sheet').and.callThrough();
    widgetExport.exportCsv();
    const toEqual: unknown[][] = [
      ['a', 'b', 'c'],
      ['d', 'e', 'f'],
      ['g', 'h', 'i'],
    ];
    expect(testSpy).toHaveBeenCalledWith(toEqual);
  });
});
