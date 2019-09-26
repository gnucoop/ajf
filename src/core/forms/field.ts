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

import {ComponentFactoryResolver, OnInit} from '@angular/core';

import {AjfFieldComponentsMap} from './interface/fields/field-components-map';
import {AjfFieldInstance} from './interface/fields-instances/field-instance';
import {AjfFieldHost} from './field-host';

export abstract class AjfFormField implements OnInit {
  fieldHost: AjfFieldHost;

  private _instance: AjfFieldInstance;
  get instance(): AjfFieldInstance { return this._instance; }
  set instance(instance: AjfFieldInstance) {
    if (this._instance !== instance) {
      this._instance = instance;
      this._loadComponent();
    }
  }

  protected abstract componentsMap: AjfFieldComponentsMap;

  constructor(private _cfr: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this._loadComponent();
  }

  private _loadComponent(): void {
    if (this._instance == null || this.fieldHost == null) { return; }

    const vcr = this.fieldHost.viewContainerRef;
    vcr.clear();
    const componentDef = this.componentsMap[this._instance.node.fieldType];
    if (componentDef == null) { return; }
    const component = componentDef.component;
    try {
      const componentFactory = this._cfr.resolveComponentFactory(component);
      const componentRef = vcr.createComponent(componentFactory);
      const componentInstance = componentRef.instance;
      componentInstance.instance = this._instance;
      if (componentDef.inputs) {
        Object.keys(componentDef.inputs).forEach(key => {
          if (key in componentInstance) {
            (componentInstance as any)[key] = componentDef.inputs![key];
          }
        });
      }
    } catch (e) { }
  }
}
