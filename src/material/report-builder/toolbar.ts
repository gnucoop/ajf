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
  ChangeDetectionStrategy, Component, EventEmitter, ViewEncapsulation
} from '@angular/core';
import {CdkDrag, CdkDragDrop} from '@angular/cdk/drag-drop';

import {Observable} from 'rxjs';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import {AjfReport} from '@ajf/core/reports';
import {AjfReportBuilderDragData} from './report-builder-drag-data';
import {AjfReportBuilderService} from './report-builder-service';
import {AjfReportBuilderToolbarDialog} from './toolbar-dialog';

@Component({
  moduleId: module.id,
  selector: 'ajf-report-builder-toolbar',
  outputs: ['addClick'],
  styleUrls: ['toolbar.css'],
  templateUrl: 'toolbar.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * This class will define an ajf builder toolbar
 * @implements : OnDestroy
 */
export class AjfReportBuilderToolbar {
  // this is an any EventEmitter
  addClick: EventEmitter<any> = new EventEmitter<any>();
  dialogRef: MatDialogRef<AjfReportBuilderToolbarDialog>;
  zoom = false;

  lastJson: string;

  emptyContent: Observable<boolean>;

  constructor(
    private _service: AjfReportBuilderService,
    public dialog: MatDialog) {
      this.emptyContent = this._service.emptyContent;
  }

  canDropPredicate(item: CdkDrag<AjfReportBuilderDragData>): boolean {
    return item.data.dropZones.indexOf('widget') > -1;
  }

  JSONRequest() {
  }
  /**
   * this method will pass event to event emitter
   */
  onAddClick(event: any): void {
    this.addClick.emit(event);
  }

  addToList(event: CdkDragDrop<AjfReportBuilderDragData>) {
    if (event.item.data.widget != null) {
      this._service.addCustomWidgets({
        json: JSON.stringify(event.item.data.widget.toJson()),
        type: ''
      });
    }
  }

  undoLastOperation() {
    try {
      let myObj = JSON.parse(this._service.popJsonStack() || '');
      this._service.setReport(AjfReport.fromJson(myObj));
    } catch (e) { }
  }

  isZoomed() {
    this.zoom = !this.zoom;
    if (this.zoom) {
      this._service.fixedZoomIn();
    } else {
      this._service.fixedZoomOut();
    }
  }

  openDialog() {
    this.dialogRef = this.dialog.open(AjfReportBuilderToolbarDialog);
  }
}
