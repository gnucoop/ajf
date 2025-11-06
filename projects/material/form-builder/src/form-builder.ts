/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
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
import {CdkDrag, CdkDragDrop} from '@angular/cdk/drag-drop';
import {
  AfterContentInit,
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {Observable, Subscription} from 'rxjs';
import {sample} from 'rxjs/operators';

import {AjfFbChoicesOriginEditorDialog} from './choices-origin-editor-dialog';
import {AjfFbConditionEditorDialog} from './condition-editor-dialog';
import {
  AjfFormBuilderNodeEntry,
  AjfFormBuilderNodeTypeEntry,
  AjfFormBuilderService,
  AjfFormBuilderValidation,
} from './form-builder-service';
import {disableFieldDropPredicate, onDropProcess} from './form-builder-utils';
import {AjfFbStringIdentifierDialogComponent} from './string-identifier-dialog';

@Component({
  selector: 'ajf-form-builder',
  templateUrl: 'form-builder.html',
  styleUrls: ['form-builder.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfFormBuilder implements AfterViewChecked, AfterContentInit, OnDestroy {
  @ViewChild('designer', {static: true}) designerCont!: ElementRef;

  private _form: AjfForm | undefined;
  get form(): AjfForm | undefined {
    return this._form;
  }
  @Input()
  set form(form: AjfForm | undefined) {
    if (this._form !== form) {
      this._form = form;
      if (this._init) {
        this._setCurrentForm();
      }
    }
  }

  /**
   * Called to set form builder validation errors
   */
  private _formBuilderValidation: EventEmitter<AjfFormBuilderValidation> =
    new EventEmitter<AjfFormBuilderValidation>();
  @Output()
  readonly formBuilderValidation: Observable<AjfFormBuilderValidation> = this
    ._formBuilderValidation as Observable<AjfFormBuilderValidation>;

  private _nodeTypes: AjfFormBuilderNodeTypeEntry[];
  get nodeTypes(): AjfFormBuilderNodeTypeEntry[] {
    return this._nodeTypes;
  }

  private _nodeEntriesTree: Observable<AjfFormBuilderNodeEntry[]>;
  get nodeEntriesTree(): Observable<AjfFormBuilderNodeEntry[]> {
    return this._nodeEntriesTree;
  }

  private _choicesOrigins: Observable<AjfChoicesOrigin<any>[]>;
  get choicesOrigins(): Observable<AjfChoicesOrigin<any>[]> {
    return this._choicesOrigins;
  }

  /**
   * The list of the ids of all the dropLists connected to the formbuilder source list.
   */
  private _connectedDropLists: Observable<string[]> = this._service.connectedDropLists;
  get connectedDropLists(): Observable<string[]> {
    return this._connectedDropLists;
  }

  searchTerm: string = '';

  private _vc: EventEmitter<void> = new EventEmitter<void>();

  private _init = false;
  private _editConditionSub: Subscription = Subscription.EMPTY;
  private _editConditionDialog: MatDialogRef<AjfFbConditionEditorDialog> | null = null;
  private _beforeNodesUpdateSub: Subscription = Subscription.EMPTY;
  private _editChoicesOriginSub: Subscription = Subscription.EMPTY;
  private _editNodesValidationSub: Subscription = Subscription.EMPTY;
  private _editChoicesOriginDialog: MatDialogRef<AjfFbChoicesOriginEditorDialog> | null = null;
  private _stringIdentifierDialog: MatDialogRef<AjfFbStringIdentifierDialogComponent> | null = null;
  private _stringIdentifierSub: Subscription = Subscription.EMPTY;

  private _lastScrollTop: number = 0;

  constructor(private _service: AjfFormBuilderService, private _dialog: MatDialog) {
    this._nodeTypes = _service.availableNodeTypes;
    this._nodeEntriesTree = _service.nodeEntriesTree;
    this._choicesOrigins = _service.choicesOrigins;
    this._editConditionSub = this._service.editedCondition.subscribe(
      (condition: AjfCondition | null) => {
        if (this._editConditionDialog != null) {
          this._editConditionDialog.close();
          this._editConditionDialog = null;
        }
        if (condition != null) {
          this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog, {
            disableClose: true,
          });
        }
      },
    );
    this._editChoicesOriginSub = this._service.editedChoicesOrigin.subscribe(
      (choicesOrigin: AjfChoicesOrigin<any> | null) => {
        if (this._editChoicesOriginDialog != null) {
          this._editChoicesOriginDialog.close();
          this._editChoicesOriginDialog = null;
        }
        if (choicesOrigin != null) {
          this._editChoicesOriginDialog = this._dialog.open(AjfFbChoicesOriginEditorDialog, {
            disableClose: true,
          });
        }
      },
    );

    this._editNodesValidationSub = this._service.editedNodesValidation.subscribe(
      (nodeValidation: AjfFormBuilderValidation | null) => {
        if (nodeValidation != null) {
          this._formBuilderValidation.next(nodeValidation);
        }
      },
    );

    this._beforeNodesUpdateSub = this._service.beforeNodesUpdate.subscribe(() => {
      if (this.designerCont == null) {
        return;
      }
      this._lastScrollTop = this.designerCont.nativeElement.scrollTop;
    });

    this.nodeEntriesTree.pipe(sample(<Observable<void>>this._vc)).subscribe(() => {
      if (this.designerCont == null) {
        return;
      }
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
    this._editNodesValidationSub.unsubscribe();
    this._stringIdentifierSub.unsubscribe();
    this._service.setForm(null);
    this._service.resetNodeEntriesTreeExpandedStatus();
    this._service.resetEmptyCounters();
  }

  createChoicesOrigin(): void {
    this._service.createChoicesOrigin();
  }

  disableDrop(): boolean {
    return false;
  }

  disableFieldDrop(item: CdkDrag<AjfFormBuilderNodeTypeEntry>): boolean {
    return disableFieldDropPredicate(item);
  }

  /**
   * Triggers when a field or slide node is moved or inserted by drag&dropping in the formbuilder.
   * @param event The drop event.
   * @param content True if the current nodeEntry contains other nodeEntries.
   */
  onDrop(
    event: CdkDragDrop<AjfFormBuilderNodeEntry> | CdkDragDrop<AjfFormBuilderNodeTypeEntry>,
    content = false,
  ): void {
    onDropProcess(event, this._service, null, content);
  }

  editChoicesOrigin(choicesOrigin: AjfChoicesOrigin<any>): void {
    this._service.editChoicesOrigin(choicesOrigin);
  }

  editStringIdentifier(): void {
    if (this._stringIdentifierDialog != null) {
      this._stringIdentifierDialog.close();
      this._stringIdentifierDialog = null;
    }
    this._stringIdentifierDialog = this._dialog.open(AjfFbStringIdentifierDialogComponent, {
      disableClose: true,
      width: '60%',
      height: '60%',
    });
  }

  expandAll() {
    this._service.expandAll();
  }

  collapseAll() {
    this._service.collapseAll();
  }

  expandToggle(evt: MatSlideToggleChange) {
    if (evt.checked) {
      this.expandAll();
    } else {
      this.collapseAll();
    }
  }

  private _setCurrentForm(): void {
    if (this._form == null) {
      return;
    }
    this._service.setForm(this._form);
  }
}
