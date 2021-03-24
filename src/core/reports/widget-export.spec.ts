import {ChartData} from 'chart.js';
import * as XLSX from 'xlsx';

import {AjfTableCell} from '../table';

import {AjfWidgetType} from './interface/widgets/widget-type';
import {AjfWidgetExport} from './public-api';

describe('widget-export', () => {
  const widgetExport = new AjfWidgetExport();
  const dataChart: ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'My First Dataset',
      data: [65000000, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      lineTension: 0.1
    }]
  };

  const dataTableXlsx: AjfTableCell[][] = [
    [
      {value: {changingThisBreaksApplicationSecurity: 'a'}},
      {value: {changingThisBreaksApplicationSecurity: 'b'}},
      {value: {changingThisBreaksApplicationSecurity: 'c'}}
    ],
    [
      {value: {changingThisBreaksApplicationSecurity: 'd'}},
      {value: {changingThisBreaksApplicationSecurity: 'e'}},
      {value: {changingThisBreaksApplicationSecurity: 'f'}}
    ],
    [
      {value: {changingThisBreaksApplicationSecurity: 'g'}},
      {value: {changingThisBreaksApplicationSecurity: 'h'}},
      {value: {changingThisBreaksApplicationSecurity: 'i'}}
    ],
  ] as AjfTableCell[][];

  it('widget chart to xlsx data', () => {
    widgetExport.data = dataChart;
    widgetExport.widgetType = AjfWidgetType.Chart;
    const testSpy = spyOn(XLSX.utils, 'json_to_sheet').and.callThrough();
    widgetExport.exportCsv();
    const toEqual = [{
      name: 'My First Dataset',
      January: 65000000,
      February: 59,
      March: 80,
      April: 81,
      May: 56,
      June: 55,
      July: 40
    }];
    expect(testSpy).toHaveBeenCalledWith(toEqual);
  });

  it('widget table to xlsx data', () => {
    widgetExport.data = dataTableXlsx;
    widgetExport.widgetType = AjfWidgetType.Table;
    const testSpy = spyOn(XLSX.utils, 'json_to_sheet').and.callThrough();
    widgetExport.exportCsv();
    const toEqual = [{a: 'd', b: 'e', c: 'f'}, {a: 'g', b: 'h', c: 'i'}];
    expect(testSpy).toHaveBeenCalledWith(toEqual);
  });
});
