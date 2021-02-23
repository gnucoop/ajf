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

import {AjfForm, AjfFormSerializer} from '@ajf/core/forms';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable, of} from 'rxjs';
import {filter, startWith, switchMap} from 'rxjs/operators';

const formSchema: any = {
  choicesOrigins: [{
    type: 'fixed',
    name: 'animals',
    choicesType: 'string',
    choices: [{value: 'dog', label: 'Dog'}, {value: 'cat', label: 'Cat'}]
  }],
  nodes: [{
    parent: 0,
    id: 1,
    name: 'number1',
    label: 'Number Field Example',
    nodeType: 3,
    nodes: [
      {
        id: 10,
        parent: 1,
        name: 'number',
        label: 'Number',
        nodeType: 0,
        fieldType: 2,
        hint: 'Is a field that allows only numeric inputs',
        hintIcon: 'help_outline',
      },
      {
        parent: 10,
        id: 11,
        name: 'pet_type',
        label: 'Do you have a cat or a dog?',
        nodeType: 0,
        fieldType: 4,
        choicesOriginRef: 'animals',
        hint: 'which pet do you have at home?',
      }
    ]
  }]
};

@Component({
  selector: 'mat-form-e2e',
  templateUrl: 'mat-form-e2e.html',
})
export class MaterialFormE2E implements OnInit {
  formSchema: string = JSON.stringify(formSchema);
  form: AjfForm;
  routeStream$: Observable<Params> = this._route.queryParams;
  topBar$: Observable<boolean> = this.routeStream$.pipe(
      filter(p => p != null), switchMap((params) => {
        let res = false;
        if (params.topbar != null && params.topbar === 'true') {
          res = true;
        }
        return of(res);
      }),
      startWith(false));

  hideToolbar$: Observable<boolean> = this.routeStream$.pipe(
      filter(p => p != null), switchMap((params) => {
        let res = false;
        if (params.hidetoolbar != null && params.hidetoolbar === 'true') {
          res = true;
        }
        return of(res);
      }),
      startWith(false));

  constructor(private _route: ActivatedRoute) {}
  ngOnInit(): void {
    this.form = AjfFormSerializer.fromJson(formSchema);
    this._route.queryParams.subscribe(params => {
      console.log(params);
    });
  }
}
