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

import {EXAMPLE_COMPONENTS} from '@ajf/material-examples';
import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';
import {Component, ElementRef, Injector, Input, OnInit} from '@angular/core';
import {createCustomElement} from '@angular/elements';

@Component({
  selector: 'material-example',
  template: `
    <div class="label" *ngIf="showLabel">
      <span class="title"> {{title}} </span>
      <span class="id"> <{{id}}> </span>
    </div>

    <div *ngIf="!id">
      Could not find example {{id}}
    </div>
  `,
  styles: [`
    .label {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin: 16px 0;
    }

    .title {
      font-size: 20px;
      font-weight: 500;
    }

    .id {
      font-size: 13px;
      font-family: monospace;
      color: #666;
      white-space: pre;
    }
  `]
})
export class Example implements OnInit {
  /** ID of the material example to display. */
  @Input() id: string;

  @Input()
  get showLabel(): boolean { return this._showLabel; }
  set showLabel(v: boolean) { this._showLabel = coerceBooleanProperty(v); }
  _showLabel: boolean;

  title: string;

  constructor(private _elementRef: ElementRef<HTMLElement>, private _injector: Injector) { }

  ngOnInit() {
    let exampleElementCtor = customElements.get(this.id);

    if (!exampleElementCtor) {
      exampleElementCtor = createCustomElement(EXAMPLE_COMPONENTS[this.id].component, {
        injector: this._injector
      });

      customElements.define(this.id, exampleElementCtor);
    }

    this._elementRef.nativeElement.appendChild(new exampleElementCtor(this._injector));
    this.title = EXAMPLE_COMPONENTS[this.id] ? EXAMPLE_COMPONENTS[this.id].title : '';
  }

  static ngAcceptInputType_showLabel: BooleanInput;
}
