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

import {AfterViewInit, ComponentFactoryResolver} from '@angular/core';

import {AjfWidgetInstance} from './interface/widgets-instances/widget-instance';
import {AjfWidgetComponentsMap} from './widget-components-map';
import {AjfWidgetHost} from './widget-host';

export abstract class AjfReportWidget implements AfterViewInit {
  widgetHost: AjfWidgetHost;

  private _instance: AjfWidgetInstance;
  get instance(): AjfWidgetInstance { return this._instance; }
  set instance(instance: AjfWidgetInstance) {
    if (this._instance !== instance) {
      this._instance = instance;
      this._loadComponent();
    }
  }

  protected abstract widgetsMap: AjfWidgetComponentsMap;

  constructor(private _cfr: ComponentFactoryResolver) { }

  ngAfterViewInit(): void {
    this._loadComponent();
  }

  private _loadComponent(): void {
    if (this._instance == null || this.widgetHost == null) { return; }

    const vcr = this.widgetHost.viewContainerRef;
    vcr.clear();
    const componentDef = this.widgetsMap[this._instance.widget.widgetType];
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
