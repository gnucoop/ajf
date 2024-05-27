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
  AjfField,
  AjfFieldType,
  AjfFieldWithChoices,
  AjfForm,
  AjfFormSerializer,
  AjfRangeField,
} from '@ajf/core/forms';
import {createFormula} from '@ajf/core/models';

import {AjfChartType} from '../interface/charts/chart-type';
import {AjfDataset} from '../interface/dataset/dataset';
import {AjfReport} from '../interface/reports/report';
import {AjfWidget} from '../interface/widgets/widget';
import {AjfWidgetType} from '../interface/widgets/widget-type';
import {createDataset} from '../utils/dataset/create-dataset';
import {createReportContainer} from '../utils/reports/create-report-container';
import {createWidget} from '../utils/widgets/create-widget';
import {
  backgroundColor,
  boxStyle,
  chartStyle,
  indicatorStyle,
  slideTitleStyle,
  widgetTitleStyle,
} from './styles';

function createBooleanWidget(field: AjfField): AjfWidget {
  return createWidget({
    widgetType: AjfWidgetType.Chart,
    type: AjfChartType.Pie,
    labels: {formula: "['True', 'False']"},
    dataset: [
      createDataset({
        label: 'true',
        formula: [
          createFormula({
            formula: `[COUNT_FORMS(dataset, f => f.${field.name} === true), COUNT_FORMS(dataset, f => f.${field.name} === false)]`,
          }),
        ],
        options: {backgroundColor: ['green', 'red']},
      } as Partial<AjfDataset>),
    ],
    options: {
      responsive: true,
      maintainAspectRatio: true,
      legend: {display: true, position: 'bottom'},
    },
    styles: chartStyle,
    exportable: true,
  });
}

function createMultipleChoiceWidget(field: AjfFieldWithChoices<any>): AjfWidget {
  const choices = field.choicesOrigin.choices;
  let dataset: AjfDataset[] = choices.map((c, index) =>
    createDataset({
      label: `${c.label}`,
      formula: [
        createFormula({
          formula: `[COUNT_FORMS(dataset, f => f.${field.name}.indexOf("${c.value}") > -1)]`,
        }),
      ],
      options: {
        backgroundColor: backgroundColor[index],
        stack: `Stack ${index}`,
      },
    } as Partial<AjfDataset>),
  );

  let chartType = AjfChartType.Bar;
  let labels = {formula: `[]`};
  return createWidget({
    widgetType: AjfWidgetType.Chart,
    type: chartType,
    labels,
    dataset,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      legend: {display: true, position: 'bottom'},
    },
    styles: chartStyle,
    exportable: true,
  });
}

function createIndicator(name: string, value: string): AjfWidget {
  return createWidget({
    widgetType: AjfWidgetType.Column,
    styles: boxStyle,
    content: [
      createWidget({
        widgetType: AjfWidgetType.Text,
        htmlText: name,
      }),
      createWidget({
        widgetType: AjfWidgetType.Text,
        htmlText: value,
        styles: indicatorStyle,
      }),
    ],
  });
}

function createNumberWidget(field: AjfField): AjfWidget {
  return createWidget({
    widgetType: AjfWidgetType.Layout,
    columns: Array(4).fill(1/4),
    content: [
      createIndicator('Mean', `[[ROUND(MEAN(dataset, "${field.name}"), 2)]]`),
      createIndicator('Median', `[[ROUND(MEDIAN(dataset, "${field.name}"), 2)]]`),
      createIndicator('Mode', `[[ROUND(MODE(dataset, "${field.name}"), 2)]]`),
      createIndicator('Max', `[[ROUND(MAX(dataset, "${field.name}"), 2)]]`),
    ],
  });
}

function createSingleChoiceWidget(field: AjfFieldWithChoices<any>): AjfWidget {
  const choices = field.choicesOrigin.choices;
  let dataset: AjfDataset[] = [];
  let chartType = AjfChartType.Bar;
  let labels = {formula: `[]`};

  if (choices.length > 5) {
    labels = {formula: `[${choices.map(c => `${JSON.stringify(c.label)}`)}]`};
    chartType = AjfChartType.Pie;
    dataset = [
      createDataset({
        label: field.label,
        formula: [
          createFormula({
            formula: `[${choices
              .map(choice => `COUNT_FORMS(dataset, f => f.${field.name} === '${choice.value}')`)
              .toString()}]`,
          }),
        ],
        options: {backgroundColor},
      } as Partial<AjfDataset>),
    ];
  } else {
    dataset = choices.map((c, index) =>
      createDataset({
        label: `${c.label}`,
        formula: [createFormula({formula: `[COUNT_FORMS(dataset, f => f.${field.name} === '${c.value}')]`})],
        options: {
          backgroundColor: backgroundColor[index],
          stack: `Stack ${index}`,
        },
      } as Partial<AjfDataset>),
    );
  }

  return createWidget({
    widgetType: AjfWidgetType.Chart,
    type: chartType,
    labels,
    dataset,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      legend: {display: true, position: 'bottom'},
    },
    styles: chartStyle,
    exportable: true,
  });
}

function createRangeWidget(field: AjfRangeField): AjfWidget {
  const end = field.end ?? 11;
  const start = field.start ?? 1;
  let choices = [];
  for (let i = start; i <= end; i++) {
    choices.push(i);
  }

  let labels = {formula: `[${JSON.stringify(field.label)}]`};
  let dataset: AjfDataset[] = choices.map((_, index) =>
    createDataset({
      label: `${index + start}`,
      formula: [
        createFormula({formula: `[COUNT_FORMS(dataset, f => f.${field.name} === ${index + 1 + start})]`}),
      ],
      options: {
        backgroundColor: backgroundColor[index],
        stack: `Stack ${index}`,
      },
    } as Partial<AjfDataset>),
  );
  return createWidget({
    widgetType: AjfWidgetType.Column,
    content: [
      createWidget({
        widgetType: AjfWidgetType.Layout,
        columns: Array(4).fill(1/4),
        content: [
          createIndicator('Mean', `[[ROUND(MEAN(dataset, "${field.name}"), 2)]]`),
          createIndicator('Median', `[[ROUND(MEDIAN(dataset, "${field.name}"), 2)]]`),
          createIndicator('Mode', `[[ROUND(MODE(dataset, "${field.name}"), 2)]]`),
          createIndicator('Max', `[[ROUND(MAX(dataset, "${field.name}"), 2)]]`),
        ],
      }),
      createWidget({
        widgetType: AjfWidgetType.Chart,
        type: AjfChartType.Bar,
        labels,
        dataset,
        options: {
          responsive: true,
          maintainAspectRatio: true,
          legend: {display: true, position: 'bottom'},
        },
        styles: chartStyle,
        exportable: true,
      }),
    ],
  });
}

/**
 * This function returns a basic report for any form passed in input.
 *
 * @param form the form schema
 * @param id? the id of the form inside the platform.
 */
export function automaticReport(formSchema: {schema: Partial<AjfForm>; id?: string}): AjfReport {
  const form = AjfFormSerializer.fromJson(formSchema.schema);
  const report: AjfReport = {};
  const reportWidgets: AjfWidget[] = [];

  report.variables = [];
  // we assume that the array of forms passed to the report is called 'forms'.
  if (formSchema.id != null) {
    report.variables = [{name: 'forms', formula: {formula: `forms['${formSchema.id}']`}}];
  }
  report.variables.push({name: 'dataset', formula: {formula: 'BUILD_DATASET(forms)'}});

  form.nodes?.forEach(slide => {
    const slideWidgets: AjfWidget[] = [];

    (slide.nodes as AjfField[]).forEach(field => {
      const fieldTitleWidget: AjfWidget = createWidget({
        widgetType: AjfWidgetType.Text,
        htmlText: `<h4>${field.label} - [[COUNT_FORMS(dataset, f => f.${field.name} != null)]] answers</h4>`,
        styles: widgetTitleStyle,
      });
      slideWidgets.push(fieldTitleWidget);

      switch (field.fieldType) {
        case AjfFieldType.Number:
          slideWidgets.push(createNumberWidget(field));
          break;
        case AjfFieldType.Boolean:
          slideWidgets.push(createBooleanWidget(field));
          break;
        case AjfFieldType.SingleChoice:
          slideWidgets.push(createSingleChoiceWidget(field));
          break;
        case AjfFieldType.MultipleChoice:
          slideWidgets.push(createMultipleChoiceWidget(field));
          break;
        case AjfFieldType.Range:
          slideWidgets.push(createRangeWidget(field));
          break;
        default:
          slideWidgets.pop(); // remove the title of empty widget
      }
    });
    if (slideWidgets.length > 0) {
      const slideTitleWidget: AjfWidget = createWidget({
        widgetType: AjfWidgetType.Text,
        htmlText: `<h1>${slide.label}</h1>`,
        styles: slideTitleStyle,
      });
      reportWidgets.push(slideTitleWidget, ...slideWidgets);
    }
  });

  report.content = createReportContainer({content: [...reportWidgets], styles: {}});

  return report;
}
