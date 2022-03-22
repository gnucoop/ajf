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

import {TestBed} from '@angular/core/testing';

import {AjfTranslocoModule, TranslocoService} from '../../transloco';
import {
  AjfColumnWidgetInstance,
  AjfReportSerializer,
  AjfTextWidgetInstance,
  AjfWidgetType,
  createReportInstance,
} from './public_api';

describe('createReportInstance', () => {
  let ts: TranslocoService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [AjfTranslocoModule.forRoot()]});
    ts = TestBed.inject(TranslocoService);
  });

  it('should support variables at report level', () => {
    const json = {
      content: {
        content: [
          {
            widgetType: AjfWidgetType.Text,
            htmlText: '[[foo]]',
            styles: {},
            visibility: {condition: 'true'},
          },
        ],
        styles: {},
      },
      styles: {},
      variables: [{name: 'foo', formula: {formula: '1 + 2'}}],
    };
    const report = AjfReportSerializer.fromJson(json);
    const reportInstance = createReportInstance(report, {}, ts);
    const widget = reportInstance.content!.content[0] as AjfTextWidgetInstance;
    expect(widget.htmlText).toBe('3');
  });

  it('should support widget repetitions', () => {
    const json = {
      content: {
        content: [
          {
            widgetType: AjfWidgetType.Column,
            styles: {},
            visibility: {condition: 'true'},
            repetitions: {formula: '3'},
            content: [
              {
                widgetType: AjfWidgetType.Text,
                htmlText: '[[ foo[$repetition] ]]',
                styles: {},
                visibility: {condition: 'true'},
              },
            ],
          },
        ],
        styles: {},
      },
      styles: {},
    };
    const ctx = {
      foo: ['bar', 'baz', 'quz'],
    };
    const report = AjfReportSerializer.fromJson(json);
    const reportInstance = createReportInstance(report, ctx, ts);
    const column = reportInstance.content!.content[0] as AjfColumnWidgetInstance;
    expect(column.content.length).toBe(3);
    for (let i = 0; i < 3; i++) {
      const text = column.content[i] as AjfTextWidgetInstance;
      expect(text.htmlText).toBe(ctx.foo[i]);
    }
  });
});
