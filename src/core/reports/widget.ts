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

import {ChangeDetectorRef} from '@angular/core';

import {AjfImageType} from '@ajf/core/image';
import {
  AjfReportChartWidgetInstance,
  AjfReportFormulaWidgetInstance,
  AjfReportImageContainerWidgetInstance,
  AjfReportImageWidgetInstance,
  AjfReportLayoutWidgetInstance,
  AjfReportMapWidgetInstance,
  AjfReportTableWidgetInstance,
  AjfReportTextWidgetInstance,
  AjfReportWidgetInstance,
} from './widgets-instances';
import {
  AjfReportChartWidget,
  AjfReportImageWidget,
  AjfReportLayoutWidget,
  AjfReportMapWidget,
  AjfReportWidget,
  AjfReportWidgetType,
} from './widgets';

export abstract class AjfReportWidgetRenderer {
  readonly widgetTypes = AjfReportWidgetType;

  private _widget: AjfReportWidget | null;
  get widget(): AjfReportWidget | null { return this._widget; }

  private _imageTypes = AjfImageType;
  get imageTypes() { return this._imageTypes; }

  private _widgetInstance: AjfReportWidgetInstance;
  get widgetInstance(): AjfReportWidgetInstance { return this._widgetInstance; }
  set widgetInstance(widgetInstance: AjfReportWidgetInstance) {
    if (this._widgetInstance !== widgetInstance) {
      this._widgetInstance = widgetInstance;
      this._widget = this._widgetInstance != null ? this._widgetInstance.widget : null;
      this._cdr.markForCheck();
    }
  }

  get imgwInst(): AjfReportImageWidgetInstance {
    return this._widgetInstance as AjfReportImageWidgetInstance;
  }
  get imgw(): AjfReportImageWidget {
    return this._widget as AjfReportImageWidget;
  }
  get imgcwInst(): AjfReportImageContainerWidgetInstance {
    return this._widgetInstance as AjfReportImageContainerWidgetInstance;
  }
  get imgcw(): AjfReportImageWidget {
    return this._widget as AjfReportImageWidget;
  }
  get layoutwInst(): AjfReportLayoutWidgetInstance {
    return this._widgetInstance as AjfReportLayoutWidgetInstance;
  }
  get layoutw(): AjfReportLayoutWidget {
    return this._widget as AjfReportLayoutWidget;
  }
  get chartwInst(): AjfReportChartWidgetInstance {
    return this._widgetInstance as AjfReportChartWidgetInstance;
  }
  get chartw(): AjfReportChartWidget {
    return this._widget as AjfReportChartWidget;
  }
  get tablewInst(): AjfReportTableWidgetInstance {
    return this._widgetInstance as AjfReportTableWidgetInstance;
  }
  get textwInst(): AjfReportTextWidgetInstance {
    return this._widgetInstance as AjfReportTextWidgetInstance;
  }
  get mapwInst(): AjfReportMapWidgetInstance {
    return this._widgetInstance as AjfReportMapWidgetInstance;
  }
  get mapw(): AjfReportMapWidget {
    return this._widget as AjfReportMapWidget;
  }
  get formulawInst(): AjfReportFormulaWidgetInstance {
    return this._widgetInstance as AjfReportFormulaWidgetInstance;
  }

  constructor(private _cdr: ChangeDetectorRef) { }
}
