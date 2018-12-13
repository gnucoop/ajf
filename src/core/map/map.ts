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

import {
  AfterViewInit, ChangeDetectionStrategy, Component, Input,
  OnDestroy, ViewChild, ViewEncapsulation
} from '@angular/core';

import {Subscription} from 'rxjs';

import * as L from 'leaflet';

import {AjfMapContainerDirective} from './map-container-directive';

@Component({
  moduleId: module.id,
  selector: 'ajf-map',
  templateUrl: 'map.html',
  styleUrls: ['map.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AjfMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild(AjfMapContainerDirective) mapContainer: AjfMapContainerDirective;

  private _coordinate: number[];
  @Input() set coordinate(coordinate: number[]) {
    this._coordinate = coordinate.slice(0);
    this._setMapView();
  }

  private _tileLayer: string;
  @Input() set tileLayer(tileLayer: string) {
    this._tileLayer = tileLayer;
    this._addTileLayerToMap();
  }

  private _attribution: string;
  @Input() set attribution(attribution: string) {
    this._attribution = attribution;
    this._addTileLayerToMap();
  }

  private _disabled: boolean;
  @Input() set disabled(disabled: boolean) {
    this._disabled = disabled;
    this._disableMap();
  }


  private _map: L.Map;
  get map(): L.Map { return this._map; }

  private _columnWidthChanged: Subscription = Subscription.EMPTY;

  ngAfterViewInit(): void {
    if (this.mapContainer) {
      this._initMap();
      this._setMapView();
      this._addTileLayerToMap();
      this._disableMap();
    }
  }

  redraw() {
    if (this.mapContainer && this._map) {
      this._map.invalidateSize();
    }
  }

  ngOnDestroy() {
    this._columnWidthChanged.unsubscribe();
  }

  private _initMap(): void {
    const options = {
      zoomControl: false,
      attributionControl: false
    };

    this._map = L.map(this.mapContainer.htmlElement, options);
  }

  private _setMapView(): void {
    if (this._map == null) { return; }

    let x, y, z;
    if (this._coordinate != null && this._coordinate.length === 3) {
      x = this._coordinate[0];
      y = this._coordinate[1];
      z = this._coordinate[2];
    } else {
      x = 0;
      y = 0;
      z = 14;
    }
    this._map.setView([x, y], z);
  }

  private _addTileLayerToMap(): void {
    if (this._map == null || this._tileLayer == null) { return; }
    this._map.eachLayer((l) => this._map.removeLayer(l));
    L.tileLayer(this._tileLayer, {
      attribution: this._attribution
    }).addTo(this._map);
  }

  private _disableMap(): void {
    if (this._map == null) { return; }

    if (this._disabled) {
      this._map.dragging.disable();
      this._map.touchZoom.disable();
      this._map.doubleClickZoom.disable();
      this._map.scrollWheelZoom.disable();
      this._map.boxZoom.disable();
      this._map.keyboard.disable();
      if (this._map.tap) {
        this._map.tap.disable();
      }
    }
  }
}
