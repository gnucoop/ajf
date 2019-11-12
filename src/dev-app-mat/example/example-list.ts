/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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

import {Component, Input} from '@angular/core';
import {EXAMPLE_COMPONENTS} from '@ajf/material-examples';
import {coerceBooleanProperty} from '@ajf/core/utils';

/** Displays a set of ajf examples in a mat-accordion. */
@Component({
  selector: 'material-example-list',
  template: `
    <mat-accordion multi>
      <mat-expansion-panel *ngFor="let id of ids" [expanded]="expandAll">
        <mat-expansion-panel-header>
          <div class="header">
            <div class="title"> {{exampleComponents[id]?.title}} </div>
            <div class="id"> <{{id}}> </div>
          </div>
        </mat-expansion-panel-header>

        <ng-template matExpansionPanelContent>
          <material-example [id]="id"></material-example>
        </ng-template>
      </mat-expansion-panel>
    </mat-accordion>
  `,
  styles: [`
    mat-expansion-panel {
      box-shadow: none !important;
      border-radius: 0 !important;
      background: transparent;
      border-top: 1px solid #CCC;
    }

    .header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding-right: 24px;
      align-items: center;
    }

    .id {
      font-family: monospace;
      color: #666;
      font-size: 12px;
    }
  `]
})
export class ExampleList {
  /** Type of examples being displayed. */
  @Input() type: string;

  /** IDs of the examples to display. */
  @Input() ids: string[];

  @Input()
  get expandAll(): boolean { return this._expandAll; }
  set expandAll(v: boolean) { this._expandAll = coerceBooleanProperty(v); }
  _expandAll: boolean;

  exampleComponents = EXAMPLE_COMPONENTS;
}
