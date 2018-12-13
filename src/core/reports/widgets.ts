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

import {AjfImageIcon, AjfImageType} from '@ajf/core/image';
import {AjfCondition, AjfFormula, AjfJsonSerializable} from '@ajf/core/models';
import {deepCopy} from '@ajf/core/utils';
import {AjfChartType} from './charts';
import {AjfChartDataset, AjfDataset, AjfTableDataset} from './dataset';
import {AjfReportStyles} from './report-styles';

import {ChartOptions} from 'chart.js';

/**
 * Report widget types. They are mainly divided in layout and data widgets.
 * Layout widgets (Layout, PageBreak, Image, Text) are used to display static
 * content or for layout purposes.
 * Data widgets (Chart, Table, Map) are used to display the data of a report
 * instance (@see AjfReportInstance).
 * All data widgets and the PageBreak widget can have no content
 */
export enum AjfReportWidgetType {
  Layout,
  PageBreak,
  Image,
  Text,
  Chart,
  Table,
  Map,
  Column,
  Formula,
  ImageContainer,
  LENGTH
}

export enum AjfReportDataType {
  EPI,
  Month,
  Year,
  LENGTH
}
export interface AjfReportCustomWidget {
  json: string;
  type: string;
}

/**
 * Base abstract class that represent a report widget.
 *
 */
export abstract class AjfReportWidget extends AjfJsonSerializable {
  /**
   * The sub-widgets contained inside this widget
   */
  content: AjfReportWidget[];

  /**
   * A dictionary of CSS-styles applied to the widget
   */
  styles: AjfReportStyles;

  /**
   * The condition under which the widget is visible
   *
   * @memberOf AjfReportWidget
   */
  visibility: AjfCondition;

  /**
   * True if the current widget can contain sub-widgets
   */
  abstract get hasContent(): boolean;

  /**
   * Creates a report widget from its JSON representation
   *
   * @param obj: any The JSON representation
   * @throws 'Widget type missing' when the JSON representation lacks of a widget type
   * @throws 'Invalid widget type' when the JSON representation contains an invalid widget type
   * @return AjfReportWidget The report widget
   */
  static fromJson(obj: any): AjfReportWidget {

    let keys: string[] = Object.keys(obj);

    if (keys.indexOf('widgetType') === -1) {
      throw new Error('Widget type missing');
    }

    let widgetType = obj.widgetType;
    if (AjfReportWidgetType[widgetType] == null) {
      throw new Error('Invalid widget type');
    }

    obj = this.parseJsonObject(obj);

    delete obj.widgetType;

    return AjfReportWidget.createWidget(widgetType, obj);
  }

  protected static parseJsonObject(obj: any): any {
    obj = deepCopy(obj);

    let keys: string[] = Object.keys(obj);

    if (keys.indexOf('visibility') > -1) {
      obj.visibility = AjfCondition.fromJson(obj.visibility);
    } else {
      obj.visibility = AjfCondition.alwaysCondition();
    }

    if (keys.indexOf('content') > -1 && obj.content instanceof Array) {
      obj.content = obj.content.map((w: any) => AjfReportWidget.fromJson(w));
    }

    if (keys.indexOf('dataset') > -1 && obj['dataset'] instanceof Array) {
      if (obj.widgetType == AjfReportWidgetType.Table) {
        const data: AjfTableDataset[][] = obj.dataset
          .map((row: AjfTableDataset[]) => row.map(cell => AjfTableDataset.fromJson(cell)));
        obj.dataset = data;
      } else if (obj.widgetType == AjfReportWidgetType.Chart) {
        const data: AjfChartDataset[] = obj.dataset
          .map((row: any) => AjfChartDataset.fromJson(row));
        obj.dataset = data;
      }
    }

    if (keys.indexOf('labels') > -1) {
      if (obj['labels'] instanceof Array) {
        obj.labels = obj.labels.map((l: string) => AjfFormula.fromJson(l));
      } else {
        obj.labels = AjfFormula.fromJson(obj.labels);
      }
    }

    if (keys.indexOf('coordinate') > -1) {
        obj.coordinate = AjfFormula.fromJson(obj.coordinate);
    }

    return obj;
  }

  /**
   * Creates a report widget given a widget type (@see AjfReportWidgetType)
   */
  static createWidget(widgetType: AjfReportWidgetType, obj?: any): AjfReportWidget {
    switch (widgetType) {
      case AjfReportWidgetType.Layout:
        return new AjfReportLayoutWidget(obj);
      case AjfReportWidgetType.PageBreak:
        return new AjfReportPageBreakWidget(obj);
      case AjfReportWidgetType.Image:
        return new AjfReportImageWidget(obj);
      case AjfReportWidgetType.Text:
        return new AjfReportTextWidget(obj);
      case AjfReportWidgetType.Chart:
        return new AjfReportChartWidget(obj);
      case AjfReportWidgetType.Table:
        return new AjfReportTableWidget(obj);
      case AjfReportWidgetType.Map:
        return new AjfReportMapWidget(obj);
      case AjfReportWidgetType.Column:
        return new AjfReportColumnWidget(obj);
      case AjfReportWidgetType.Formula:
        return new AjfReportFormulaWidget(obj);
      case AjfReportWidgetType.ImageContainer:
        return new AjfReportImageContainerWidget(obj);
      default:
        throw new Error('Invalid widget type');
    }

  }

  /**
   * The widget type (@see AjfReportWidgetType)
   */
  get widgetType(): AjfReportWidgetType {
    const thisObj: any = this;
    if (thisObj instanceof AjfReportLayoutWidget) {
      return AjfReportWidgetType.Layout;
    }
    if (thisObj instanceof AjfReportColumnWidget) {
      return AjfReportWidgetType.Column;
    }
    if (thisObj instanceof AjfReportPageBreakWidget) {
      return AjfReportWidgetType.PageBreak;
    }
    if (thisObj instanceof AjfReportImageWidget) {
      return AjfReportWidgetType.Image;
    }
    if (thisObj instanceof AjfReportTextWidget) {
      return AjfReportWidgetType.Text;
    }
    if (thisObj instanceof AjfReportChartWidget) {
      return AjfReportWidgetType.Chart;
    }
    if (thisObj instanceof AjfReportTableWidget) {
      return AjfReportWidgetType.Table;
    }
    if (thisObj instanceof AjfReportMapWidget) {
      return AjfReportWidgetType.Map;
    }
    if (thisObj instanceof AjfReportFormulaWidget) {
      return AjfReportWidgetType.Formula;
    }
    if (thisObj instanceof AjfReportImageContainerWidget) {
      return AjfReportWidgetType.ImageContainer;
    }
    throw new Error('Invalid widget type');
  }

  constructor(obj?: any) {
    super(obj);

    this.jsonExportedMembers = this.jsonExportedMembers
      .concat(['widgetType', 'content', 'styles', 'visibility']);

    this.content = obj && obj.content || [];
    this.styles = obj && obj.styles || {};
    this.visibility = obj && obj.visibility || AjfCondition.alwaysCondition();
  }
}


export class AjfReportLayoutWidget extends AjfReportWidget {
  columns: number[];

  get hasContent(): boolean { return true; }


  constructor(obj?: any) {
    super(obj);

    this.jsonExportedMembers = this.jsonExportedMembers.concat(['columns']);

    if (obj && obj.columns) {
      this.columns = obj.columns;
    } else {
      this.content = [new AjfReportColumnWidget()];
      this.columns = [1];
    }
  }
}

export class AjfReportColumnWidget extends AjfReportWidget {
  get hasContent(): boolean { return true; }

  constructor(obj?: any) {
    super(obj);
  }
}

export class AjfReportPageBreakWidget extends AjfReportWidget {
  get hasContent(): boolean { return false; }

  constructor(obj?: any) {
    super(obj);
  }
}


export class AjfReportImageWidget extends AjfReportWidget {
  get hasContent(): boolean { return false; }

  private _imageType: AjfImageType = AjfImageType.Image;
  get imageType(): AjfImageType { return this._imageType; }
  set imageType(imageType: AjfImageType) {
    this._imageType = imageType;
    this._icon = null;
    this._flag = null;
    this._url = null;
  }

  private _icon: AjfFormula | null;
  get icon(): AjfFormula | null { return this._icon; }
  set icon(icon: AjfFormula | null) {
    if (this._imageType === AjfImageType.Icon) {
      this._icon = icon;
    }
  }

  private _flag: AjfFormula | null;
  get flag(): AjfFormula | null { return this._flag; }
  set flag(flag: AjfFormula | null) {
    if (this._imageType === AjfImageType.Flag) {
      this._flag = flag;
    }
  }

  private _url: AjfFormula | null;
  get url(): AjfFormula | null { return this._url; }
  set url(url: AjfFormula | null) {
    if (this._imageType === AjfImageType.Image) {
      this._url = url;
    }
  }

  setUrl(imageUrl: string) {
    this.imageType = AjfImageType.Image;
    this._url = new AjfFormula({formula: `"${imageUrl}"`});
  }

  setIcon(icon: AjfImageIcon) {
    this.imageType = AjfImageType.Icon;
    this._icon = new AjfFormula({
      formula: `{fontSet: "${icon.fontSet}", fontIcon: "${icon.fontIcon}"}`
    });
  }

  setFlag(flag: string) {
    this.imageType = AjfImageType.Flag;
    this._flag = new AjfFormula({formula: `"${flag}"`});
  }

  constructor(obj?: any) {
    super(obj);

    this.jsonExportedMembers = this.jsonExportedMembers.concat([
      'imageType', 'url', 'icon', 'flag'
    ]);

    this._imageType = obj && obj.imageType != null ? obj.imageType : null;
    this._url = obj && obj.url ?
      (obj.url instanceof AjfFormula ? obj.url : AjfFormula.fromJson(obj.url)) :
      null;
    this._icon = obj && obj.icon ?
      (obj.icon instanceof AjfFormula ? obj.icon : AjfFormula.fromJson(obj.icon)) :
      null;
    this._flag = obj && obj.flag ?
      (obj.flag instanceof AjfFormula ? obj.flag : AjfFormula.fromJson(obj.flag)) :
      null;
  }
}

export class AjfReportImageContainerWidget extends AjfReportWidget {
  get hasContent(): boolean { return false; }

  private _imageType: AjfImageType = AjfImageType.Image;
  get imageType(): AjfImageType { return this._imageType; }
  set imageType(imageType: AjfImageType) {
    this._imageType = imageType;
    this.urls = [];
    this.flags = [];
    this.icons = [];
  }

  urls: AjfFormula | string[];
  flags: AjfFormula | string[];
  icons: AjfFormula | AjfFormula[];

  constructor(obj?: any) {
    super(obj);

    this.jsonExportedMembers = this.jsonExportedMembers.concat([
      'imageType', 'urls', 'icons', 'flags'
    ]);

    this._imageType = obj && obj.imageType != null ? obj.imageType : null;

    this.urls = obj && obj.urls ?
      (obj.urls instanceof AjfFormula ? obj.urls :
        (obj.urls instanceof Array ? obj.urls : AjfFormula.fromJson(obj.urls))
      ) : [];

    this.flags = obj && obj.flags ?
      (obj.flags instanceof AjfFormula ? obj.flags :
        (obj.flags instanceof Array ? obj.flags : AjfFormula.fromJson(obj.flags))
      ) : [];

    this.icons = obj && obj.icons
      ? (
        obj.icons instanceof AjfFormula
        ? obj.icons
        : obj.icons.map((l: string) => AjfFormula.fromJson(l)))
      : [];
  }
}

export class AjfReportTextWidget extends AjfReportWidget {
  private _htmlText: string;
  get htmlText(): string { return this._htmlText; }
  set htmlText(htmlText: string) {
    this._htmlText = htmlText;
  }

  get hasContent(): boolean { return false; }

  constructor(obj?: any) {
    super(obj);

    this.jsonExportedMembers = this.jsonExportedMembers.concat(['htmlText']);

    this._htmlText = obj && obj.htmlText || '';
  }

}

export class AjfReportFormulaWidget extends AjfReportWidget {
  private _formula: AjfFormula;
  get formula(): AjfFormula { return this._formula; }
  set formula(formula: AjfFormula) { this._formula = formula; }

  get hasContent(): boolean { return true; }

  constructor(obj?: any) {
    super(obj);

    this.jsonExportedMembers =
      this.jsonExportedMembers.concat(['content', 'formula']);

    this.content = obj && obj.content || [];
    this.formula = obj && obj.formula ?
      (obj.formula instanceof AjfFormula ? obj.formula : AjfFormula.fromJson(obj.formula)) : null;
  }

}

export abstract class AjfReportDataWidget extends AjfReportWidget {
  get hasContent(): boolean { return false; }
  dataset: AjfDataset[] | AjfDataset[][];


  constructor(obj?: any) {
    super(obj);

    this.jsonExportedMembers = this.jsonExportedMembers
      .concat(['dataset']);

    this.dataset = obj && obj.dataset || [];
  }
}


/**
 * Concrete class for manage chart.
 *
 *
 *
 * @throws 'labels or data or backgroundColor or borderColor missed'
 *         if the length of arrays passed by obj are not the same
 */
export class AjfReportChartWidget extends AjfReportDataWidget {
  chartType: AjfChartType;
  labels: AjfFormula | AjfFormula[];
  dataset: AjfChartDataset[];
  options: ChartOptions;

  constructor(obj?: any) {
    super(obj);

    this.jsonExportedMembers = this.jsonExportedMembers
      .concat(['chartType', 'labels', 'options']);

    this.chartType = obj && obj.type || AjfChartType.Line;
    this.dataset = obj && obj.dataset || [];
    this.labels = obj && obj.labels || [];
    this.options = obj && obj.options || null;
  }
}


export class AjfReportTableWidget extends AjfReportDataWidget {
  cellStyles: any;
  dataset: AjfTableDataset[][];

  constructor(obj?: any) {
    super(obj);

    this.jsonExportedMembers = this.jsonExportedMembers
      .concat(['cellStyles']);

    this.cellStyles = obj && obj.cellStyles || null;
  }
}

export class AjfReportMapWidget extends AjfReportDataWidget {
  coordinate: AjfFormula;
  tileLayer: string;
  attribution: string;
  disabled: boolean;

  get coordinateMap():  AjfFormula | null { return this.coordinate; }
  get tileLayerMap(): string { return this.tileLayer; }
  get attributionMap(): string { return this.attribution; }
  get disabledMap():  boolean { return this.disabled; }

  constructor(obj?: any) {
    super(obj);

    this.jsonExportedMembers = this.jsonExportedMembers
      .concat(['coordinate', 'tileLayer', 'attribution', 'disabled']);

    this.coordinate = obj && obj.coordinate || '';
    this.tileLayer = obj && obj.tileLayer || '';
    this.attribution = obj && obj.attribution || '';
    this.disabled = obj && obj.disabled || false;
  }
}
