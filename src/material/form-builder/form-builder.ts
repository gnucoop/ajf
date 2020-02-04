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

import {AjfChoicesOrigin, AjfForm} from '@ajf/core/forms';
import {AjfCondition} from '@ajf/core/models';
import {
  AfterContentInit, AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, EventEmitter,
  Input, OnDestroy, ViewChild, ViewEncapsulation
} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable, Subscription} from 'rxjs';
import {sample} from 'rxjs/operators';

import {AjfFbChoicesOriginEditorDialog} from './choices-origin-editor-dialog';
import {AjfFbConditionEditorDialog} from './condition-editor-dialog';
import {
  AjfFormBuilderNodeEntry, AjfFormBuilderNodeTypeEntry, AjfFormBuilderService
} from './form-builder-service';
import {AjfFbStringIdentifierDialogComponent} from './string-identifier-dialog';

@Component({
  moduleId: module.id,
  selector: 'ajf-form-builder',
  templateUrl: 'form-builder.html',
  styleUrls: ['form-builder.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AjfFormBuilder implements AfterViewChecked, AfterContentInit, OnDestroy {
  @ViewChild('designer', {static: true}) designerCont: ElementRef;

  private _form: AjfForm;
  get form(): AjfForm { return this._form; }
  @Input() set form(form: AjfForm) {
    if (this._form !== form) {
      this._form = form;
      if (this._init) {
        this._setCurrentForm();
      }
    }
  }

  private _nodeTypes: AjfFormBuilderNodeTypeEntry[];
  get nodeTypes(): AjfFormBuilderNodeTypeEntry[] { return this._nodeTypes; }

  private _nodeEntriesTree: Observable<AjfFormBuilderNodeEntry[]>;
  get nodeEntriesTree(): Observable<AjfFormBuilderNodeEntry[]> { return this._nodeEntriesTree; }

  private _choicesOrigins: Observable<AjfChoicesOrigin<any>[]>;
  get choicesOrigins(): Observable<AjfChoicesOrigin<any>[]> {
    return this._choicesOrigins;
  }

  private _vc: EventEmitter<void> = new EventEmitter<void>();

  private _init = false;
  private _editConditionSub: Subscription = Subscription.EMPTY;
  private _editConditionDialog: MatDialogRef<AjfFbConditionEditorDialog> | null;
  private _beforeNodesUpdateSub: Subscription = Subscription.EMPTY;
  private _editChoicesOriginSub: Subscription = Subscription.EMPTY;
  private _editChoicesOriginDialog: MatDialogRef<AjfFbChoicesOriginEditorDialog> | null;
  private _stringIdentifierDialog: MatDialogRef<AjfFbStringIdentifierDialogComponent> | null;
  private _stringIdentifierSub: Subscription = Subscription.EMPTY;

  private _lastScrollTop: number;

  constructor(
    private _service: AjfFormBuilderService,
    private _dialog: MatDialog
  ) {
    this._nodeTypes = _service.availableNodeTypes;
    this._nodeEntriesTree = _service.nodeEntriesTree;
    this._choicesOrigins = _service.choicesOrigins;
    this._editConditionSub = this._service.editedCondition
      .subscribe((condition: AjfCondition | null) => {
        if (this._editConditionDialog != null) {
          this._editConditionDialog.close();
          this._editConditionDialog = null;
        }
        if (condition != null) {
          this._editConditionDialog = this._dialog.open(
            AjfFbConditionEditorDialog, {disableClose: true}
          );
        }
      });
    this._editChoicesOriginSub =
        this._service.editedChoicesOrigin.subscribe((choicesOrigin: AjfChoicesOrigin<any>|null) => {
          if (this._editChoicesOriginDialog != null) {
            this._editChoicesOriginDialog.close();
            this._editChoicesOriginDialog = null;
          }
          if (choicesOrigin != null) {
            this._editChoicesOriginDialog =
                this._dialog.open(AjfFbChoicesOriginEditorDialog, {disableClose: true});
          }
        });

    this._beforeNodesUpdateSub = this._service.beforeNodesUpdate
      .subscribe(() => {
        if (this.designerCont == null) { return; }
        this._lastScrollTop = this.designerCont.nativeElement.scrollTop;
      });

    this.nodeEntriesTree
      .pipe(sample((<Observable<void>>this._vc)))
      .subscribe(() => {
        if (this.designerCont == null) { return; }
        this.designerCont.nativeElement.scrollTop = this._lastScrollTop;
      });

    this._stringIdentifierSub = this._service.stringIdentifier.subscribe(() => {});
  }

  ngAfterViewChecked(): void {
    this._vc.emit();
  }

  ngAfterContentInit(): void {
    this._setCurrentForm();
    this._init = true;
  }

  ngOnDestroy(): void {
    this._editConditionSub.unsubscribe();
    this._beforeNodesUpdateSub.unsubscribe();
    this._editChoicesOriginSub.unsubscribe();
    this._stringIdentifierSub.unsubscribe();
    this._service.setForm(null);
  }

  createChoicesOrigin(): void {
    this._service.createChoicesOrigin();
  }

  disableDropPredicate(): boolean {
    return false;
  }

  editChoicesOrigin(choicesOrigin: AjfChoicesOrigin<any>): void {
    this._service.editChoicesOrigin(choicesOrigin);
  }

  editStringIdentifier(): void {
    if (this._stringIdentifierDialog != null) {
      this._stringIdentifierDialog.close();
      this._stringIdentifierDialog = null;
    }
    this._stringIdentifierDialog =
        this._dialog.open(AjfFbStringIdentifierDialogComponent, {
          disableClose: true,
          width: '60%',
          height: '60%'
        });
  }

  private _setCurrentForm(): void {
    this._service.setForm(this._form);
  }
}
