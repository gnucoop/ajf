import {AjfFieldType, AjfNodeType, AjfForm} from '@ajf/core/forms';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {firstValueFrom} from 'rxjs';

import {AjfFormBuilder, AjfFormBuilderModule, AjfFormBuilderService} from './public_api';

describe('Form builder', () => {
  let builder: ComponentFixture<AjfFormBuilder>;
  let service: AjfFormBuilderService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AjfFormBuilderModule, NoopAnimationsModule],
    });
    await TestBed.compileComponents();
    service = TestBed.inject(AjfFormBuilderService);
    builder = TestBed.createComponent(AjfFormBuilder);
    builder.componentInstance.form = testForm;
  });

  it('should keep tables in edited form', async () => {
    const getFormValue = () => firstValueFrom(service.form);

    builder.detectChanges();
    await builder.whenStable();
    let form = (await getFormValue()) as AjfForm;
    expect(form).not.toBeNull();
    expect(form.nodes.length).toBe(3);
  });
});

const testForm: AjfForm = {
  nodes: [
    {
      id: 1,
      parent: 0,
      parentNode: 0,
      label: 'Slide 1',
      name: 'slide_1',
      nodeType: AjfNodeType.AjfSlide,
      nodes: [
        {
          id: 101,
          parent: 1,
          parentNode: 0,
          label: 'Field 1',
          name: 'field_1',
          nodeType: AjfNodeType.AjfField,
          fieldType: AjfFieldType.Number,
          editable: true,
          conditionalBranches: [],
          defaultValue: null,
          size: 'normal',
        },
      ],
      conditionalBranches: [],
    },
    {
      id: 2,
      parent: 1,
      parentNode: 0,
      label: 'Slide 2',
      name: 'slide_2',
      nodeType: AjfNodeType.AjfSlide,
      nodes: [
        {
          id: 201,
          name: 'table_1',
          rows: [
            [
              'table_1__0__0',
              'table_1__0__1',
              {
                formula: 'field_1',
                editable: false,
              },
            ],
            [
              'table_1__1__0',
              'table_1__1__1',
              {
                formula: 'field_3',
                editable: false,
              },
            ],
          ],
          size: 'normal',
          label: 'Table',
          parent: 2,
          editable: true,
          nodeType: AjfNodeType.AjfField,
          fieldType: AjfFieldType.Table,
          rowLabels: ['1\u00b0', '2\u00b0'],
          parentNode: 0,
          columnTypes: ['number', 'text'],
          columnLabels: ['number', 'text'],
          defaultValue: null,
          conditionalBranches: [],
          hideEmptyRows: false,
        },
      ],
      conditionalBranches: [],
    },
    {
      id: 3,
      parent: 2,
      parentNode: 0,
      label: 'Slide 3',
      name: 'slide_3',
      nodeType: AjfNodeType.AjfSlide,
      nodes: [
        {
          id: 301,
          parent: 3,
          parentNode: 0,
          label: 'Field 3',
          name: 'field_3',
          nodeType: AjfNodeType.AjfField,
          fieldType: AjfFieldType.Number,
          editable: true,
          conditionalBranches: [],
          defaultValue: null,
          size: 'normal',
        },
      ],
      conditionalBranches: [],
    },
  ],
  choicesOrigins: [],
  attachmentsOrigins: [],
  stringIdentifier: [],
};
