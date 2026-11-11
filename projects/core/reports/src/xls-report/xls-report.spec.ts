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

import {HttpClient} from '@angular/common/http';
import {firstValueFrom, of} from 'rxjs';
import * as XLSX from 'xlsx';

import {AjfColumnWidget} from '../interface/widgets/column-widget';
import {AjfLayoutWidget} from '../interface/widgets/layout-widget';
import {xlsReport} from './xls-report';

describe('xlsReport filters', () => {
  const schema = {nodes: [], choicesOrigins: []};

  const workbook = (sheets: {[name: string]: string[][]}): string => {
    const book = XLSX.utils.book_new();
    Object.entries(sheets).forEach(([name, rows]) =>
      XLSX.utils.book_append_sheet(book, XLSX.utils.aoa_to_sheet(rows), name),
    );
    return XLSX.write(book, {bookType: 'xlsx', type: 'binary'});
  };
  const filterSheet = [
    ['type', 'name', 'label'],
    ['text', 'region', 'Region'],
  ];
  const sheets = {
    choices: [['list_name', 'name', 'label']],
    html: [['html'], ['<p>Hello</p>']],
  };

  const build = async (file: string) => {
    const post = vi.fn(() => of(schema));
    const report = await firstValueFrom(xlsReport(file, {post} as unknown as HttpClient));
    const column = (report.content as unknown as AjfLayoutWidget).content[0] as AjfColumnWidget;
    return {post, column};
  };

  it('filters the whole report with the "global filter" sheet', async () => {
    const {post, column} = await build(workbook({'global filter': filterSheet, ...sheets}));

    expect(post).toHaveBeenCalledTimes(1);
    expect(column.filter).toEqual({schema: schema as any});
    expect(column.content.map(w => w.filter)).toEqual([undefined]);
  });

  it('takes no other sheet as a filter', async () => {
    const {post, column} = await build(
      workbook({
        'filter': filterSheet,
        'table filter': filterSheet,
        'Global filter': filterSheet,
        ...sheets,
      }),
    );

    expect(post).not.toHaveBeenCalled();
    expect(column.filter).toBeUndefined();
    expect(column.content.every(w => w.filter == null)).toBe(true);
  });
});
