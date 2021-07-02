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

import {
  AjfTableWidgetInstance,
  AjfTextWidgetInstance,
  AjfWidgetType,
  createWidget,
  widgetToWidgetInstance
} from './public-api';

class TsMock {
  translate(str: string): string {
    return str;
  }
}

describe('widgetToWidgetInstance', () => {
  it('should replace interpolated context variables in ', () => {
    const tsMock = new TsMock() as any;

    const widget = createWidget(
        {widgetType: AjfWidgetType.Text, htmlText: 'Test string [[foo]] - bar [[baz]]'} as any);
    const instance =
        widgetToWidgetInstance(widget, {foo: 'quz', baz: 'qux'}, tsMock) as AjfTextWidgetInstance;

    expect(instance.htmlText).toEqual('Test string quz - bar qux');
  });

  it('should support widget repetitions', () => {
    const tsMock = new TsMock() as any;
    const widget = createWidget({
      widgetType: AjfWidgetType.Text,
      htmlText: '[[ foo[$repetition] ]]',
    } as any);
    const ctx = {foo: ['bar', 'baz', 'quz'], '$repetition': 0};
    for (let i = 0; i < 3; i++) {
      ctx['$repetition'] = i;
      const instance = widgetToWidgetInstance(widget, ctx, tsMock) as AjfTextWidgetInstance;
      expect(instance.htmlText).toBe(ctx.foo[i]);
    }
  });

  it('should load the row of the table in runtime', () => {
    const tsMock = new TsMock() as any;
    const widget = createWidget({
      widgetType: AjfWidgetType.DynamicTable,
      rowDefinition: {'formula': 'dynamicData'},
      dataset: [
        {
          'label': '',
          'formula': {'formula': '"Girl"'},
          'style': {'text-align': 'left', 'font-weight': 'bold'},
          'aggregation': {'aggregation': 0}
        },
        {
          'label': '',
          'formula': {'formula': '"Name"'},
          'style': {'text-align': 'left', 'font-weight': 'bold'},
          'aggregation': {'aggregation': 0}
        }
      ]
    } as any);
    const ctx = {dynamicData: [[{'value': 'foo'}, {'value': 'baz'}]]};

    const instance = widgetToWidgetInstance(widget, ctx, tsMock) as AjfTableWidgetInstance;
    expect(instance.data[1][0].value).toBe(ctx.dynamicData[0][0].value);
  });
});
