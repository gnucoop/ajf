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

import {AjfWidget} from '@ajf/core/reports';
import {deepCopy} from '@ajf/core/utils';
import {
  AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation
} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Subscription} from 'rxjs';

import {AjfReportBuilderService} from './report-builder-service';

@Component({
  selector: 'theme-color-dialog',
  templateUrl: 'theme-color-dialog.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AjfReportBuilderThemeColorDialog implements OnInit , AfterViewInit, OnDestroy {
  @ViewChild('colorpic', {static: true})
  elem: any;

  currentWidget: AjfWidget|null = null;

  currentColor = 'rgb(255,255,255,0)';
  section: string = 'color';

  private _currentWidgetSub: Subscription = Subscription.EMPTY;

  constructor(
    private _service: AjfReportBuilderService,
    private _dialogRef: MatDialogRef<AjfReportBuilderThemeColorDialog>
  ) { }

  setWidgetStyles(value: any) {
    this._service.setWidgetStyles(this.section, value);
    this.currentColor = value;
    this.setStyle();
  }

  setStyle() {
    if (this.currentWidget == null) { return; }
    this.currentWidget.styles = deepCopy(this.currentWidget.styles);
    this._service.updateCurrentWidget(this.currentWidget);
  }

  addCustomColor() {
    this._service.addCustomColor(this.currentColor);
    this._service.updateCurrentWidget(this.currentWidget);
    this._dialogRef.close();
  }

  close() {
    this._dialogRef.close();
  }
  ngOnInit() {
    this._currentWidgetSub = this._service.currentWidget
      .subscribe(x => {
        if (x !== null) {
          if (this.currentWidget !== x) {
            this.currentWidget = x;
          }
        } else {
          this.currentWidget = null;
        }
      });
  }

  ngAfterViewInit() {
    this.elem.nativeElement.children[1].firstElementChild['style']['position'] = 'initial';
  }

  ngOnDestroy() {
    this._currentWidgetSub.unsubscribe();
  }
}
