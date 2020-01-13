import {Component} from '@angular/core';
import {AjfForm,  AjfFormSerializer} from '@ajf/core/forms';

const formSchema: any = {
  nodes: [
    {
      parent: 0,
      id: 7,
      name: 'table1',
      label: 'Table Field Example',
      nodeType: 3,
      nodes: [
        {
          id: 701,
          parent: 7,
          name: 'row',
          rows: [
            [
              'value1',
              'value2',
              'value3'
            ],
            [
              'value4',
              'value5',
              'value6'
            ]
          ],
          label: '2.1',
          editable: true,
          nodeType: 0,
          fieldType: 11,
          rowLabels: [
            'Row 1',
            'Row 2',
          ],
          columnLabels: [
            'Label 1',
            'Label 2',
            'Label 3'
          ]
        }
      ]
    }
  ]
};

@Component({
  moduleId: module.id,
  selector: 'table-field-e2e',
  templateUrl: 'table-field-e2e.html',
})
export class TableFieldE2E {
  formSchema: string = JSON.stringify(formSchema);
  form: AjfForm;

  constructor() {
    this.form = AjfFormSerializer.fromJson(formSchema);
  }
}
