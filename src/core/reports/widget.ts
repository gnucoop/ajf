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

import {AjfImageType} from '@ajf/core/image';
import {ChangeDetectorRef} from '@angular/core';

import {AjfChartWidgetInstance} from './interface/widgets-instances/chart-widget-instance';
import {AjfColumnWidgetInstance} from './interface/widgets-instances/column-widget-instance';
import {AjfFormulaWidgetInstance} from './interface/widgets-instances/formula-widget-instance';
import {
  AjfImageContainerWidgetInstance
} from './interface/widgets-instances/image-container-widget-instance';
import {AjfImageWidgetInstance} from './interface/widgets-instances/image-widget-instance';
import {AjfLayoutWidgetInstance} from './interface/widgets-instances/layout-widget-instance';
import {AjfMapWidgetInstance} from './interface/widgets-instances/map-widget-instance';
import {AjfTableWidgetInstance} from './interface/widgets-instances/table-widget-instance';
import {AjfTextWidgetInstance} from './interface/widgets-instances/text-widget-instance';
import {AjfWidgetInstance} from './interface/widgets-instances/widget-instance';
import {AjfChartWidget} from './interface/widgets/chart-widget';
import {AjfImageWidget} from './interface/widgets/image-widget';
import {AjfLayoutWidget} from './interface/widgets/layout-widget';
import {AjfMapWidget} from './interface/widgets/map-widget';
import {AjfWidget} from './interface/widgets/widget';
import {AjfWidgetType} from './interface/widgets/widget-type';

export abstract class AjfWidgetRenderer {
  readonly widgetTypes = AjfWidgetType;

  private _widget: AjfWidget|null;
  get widget(): AjfWidget|null {
    return this._widget;
  }

  private _imageTypes = AjfImageType;
  get imageTypes() { return this._imageTypes; }

  private _widgetInstance: AjfWidgetInstance;
  get widgetInstance(): AjfWidgetInstance {
    return this._widgetInstance;
  }
  set widgetInstance(widgetInstance: AjfWidgetInstance) {
    if (this._widgetInstance !== widgetInstance) {
      this._widgetInstance = widgetInstance;
      this._widget = this._widgetInstance != null ? this._widgetInstance.widget : null;
      this._cdr.markForCheck();
    }
  }

  get columnInst(): AjfColumnWidgetInstance {
    return this._widgetInstance as AjfColumnWidgetInstance;
  }
  get imgwInst(): AjfImageWidgetInstance {
    return this._widgetInstance as AjfImageWidgetInstance;
  }
  get imgw(): AjfImageWidget {
    return this._widget as AjfImageWidget;
  }
  get imgcwInst(): AjfImageContainerWidgetInstance {
    return this._widgetInstance as AjfImageContainerWidgetInstance;
  }
  get imgcw(): AjfImageWidget {
    return this._widget as AjfImageWidget;
  }
  get layoutwInst(): AjfLayoutWidgetInstance {
    return this._widgetInstance as AjfLayoutWidgetInstance;
  }
  get layoutw(): AjfLayoutWidget {
    return this._widget as AjfLayoutWidget;
  }
  get chartwInst(): AjfChartWidgetInstance {
    return this._widgetInstance as AjfChartWidgetInstance;
  }
  get chartw(): AjfChartWidget {
    return this._widget as AjfChartWidget;
  }
  get tablewInst(): AjfTableWidgetInstance {
    return this._widgetInstance as AjfTableWidgetInstance;
  }
  get textwInst(): AjfTextWidgetInstance {
    return this._widgetInstance as AjfTextWidgetInstance;
  }
  get mapwInst(): AjfMapWidgetInstance {
    return this._widgetInstance as AjfMapWidgetInstance;
  }
  get mapw(): AjfMapWidget {
    return this._widget as AjfMapWidget;
  }
  get formulawInst(): AjfFormulaWidgetInstance {
    return this._widgetInstance as AjfFormulaWidgetInstance;
  }

  constructor(private _cdr: ChangeDetectorRef) { }
}
