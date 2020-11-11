import {ChartData} from 'chart.js';

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
  const dataTableCsv: AjfTableCell[][] = [
    [{value: 'a'}, {value: 'b'}, {value: 'c'}],
    [{value: 'd'}, {value: 'e'}, {value: 'f'}],
    [{value: 'g'}, {value: 'h'}, {value: 'i'}],
  ] as AjfTableCell[][];

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


  it('widget chart to csv', () => {
    widgetExport.data = dataChart;
    widgetExport.widgetType = AjfWidgetType.Chart;

    const csv = widgetExport.buildCsv();
    const toEqual = `,January,February,March,April,May,June,July
My First Dataset,65000000,59,80,81,56,55,40
`;

    expect(csv).toEqual(toEqual);
  });
  it('widget table to csv', () => {
    widgetExport.data = dataTableCsv;
    widgetExport.widgetType = AjfWidgetType.Table;

    const csv = widgetExport.buildCsv();
    const toEqual = `a,b,c
d,e,f
g,h,i
`;
    expect(csv).toEqual(toEqual);
  });
  it('widget chart to xlsx', () => {
    widgetExport.data = dataChart;
    widgetExport.widgetType = AjfWidgetType.Chart;

    const xlsx = widgetExport.buildXlsx();
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
    expect(JSON.stringify(xlsx)).toEqual(JSON.stringify(toEqual));
  });
  it('widget table to xlsx', () => {
    widgetExport.data = dataTableXlsx;
    widgetExport.widgetType = AjfWidgetType.Table;

    const xlsx = widgetExport.buildXlsx();
    const toEqual = [{a: 'd', b: 'e', c: 'f'}, {a: 'g', b: 'h', c: 'i'}];
    expect(JSON.stringify(xlsx)).toEqual(JSON.stringify(toEqual));
  });
});
