import {AjfForm, AjfFormSerializer} from '@ajf/core/forms';
import {Directive} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable, of} from 'rxjs';
import {filter, map, startWith, switchMap} from 'rxjs/operators';

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
            ['value1', 'value2', 'value3'],
            ['value4', 'value5', 'value6'],
          ],
          label: '2.1',
          editable: true,
          nodeType: 0,
          fieldType: 11,
          rowLabels: ['Row 1', 'Row 2'],
          columnLabels: ['Label 1', 'Label 2', 'Label 3'],
        },
      ],
    },
  ],
};

const formulaFormSchema: any = {
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
          rows: [['row__0__0', 'row__0__1', {formula: 'row__0__0 + row__0__1', edit: false}]],
          label: '2.1',
          editable: true,
          nodeType: 0,
          fieldType: 11,
          rowLabels: ['Row 1'],
          columnLabels: ['number 1', 'number 2', 'sum'],
        },
      ],
    },
  ],
};

@Directive()
export class TableFieldE2E {
  routeStream$: Observable<Params> = this._route.queryParams;
  formSchema: string = JSON.stringify(formSchema);
  form$: Observable<AjfForm>;
  formulas$: Observable<boolean> = this.routeStream$.pipe(
    filter(p => p != null),
    switchMap(params => {
      let res = false;
      if (params['formulas'] != null && params['formulas'] === 'true') {
        res = true;
      }
      return of(res);
    }),
    startWith(false),
  );

  constructor(private _route: ActivatedRoute) {
    this.form$ = this.formulas$.pipe(
      map(formulas => (formulas ? formulaFormSchema : formSchema)),
      map(f => AjfFormSerializer.fromJson(f)),
    );
  }
}
