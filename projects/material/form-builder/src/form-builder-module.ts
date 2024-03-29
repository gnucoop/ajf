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

import {AjfTranslocoModule} from '@ajf/core/transloco';
import {AjfNodeIconModule} from '@ajf/material/node-icon';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';

import {AjfFbBranchLine} from './branch-line';
import {AjfFbChoicesOriginEditor} from './choices-origin-editor';
import {AjfFbChoicesOriginEditorDialog} from './choices-origin-editor-dialog';
import {AjfFbConditionEditor} from './condition-editor';
import {AjfFbConditionEditorDialog} from './condition-editor-dialog';
import {AjfFormBuilder} from './form-builder';
import {AjfFormBuilderService} from './form-builder-service';
import {AjfFbNodeEntry} from './node-entry';
import {AjfFbNodeProperties} from './node-properties';
import {AjfFbNodeTypeEntry} from './node-type-entry';
import {AjfFbStringIdentifierDialogComponent} from './string-identifier-dialog';
import {AjfFbValidationConditionEditorDialog} from './validation-condition-editor-dialog';
import {AjfFbWarningConditionEditorDialog} from './warning-condition-editor-dialog';
import {AjfNodePropertiesNameMatchValidator} from './node-properties-name-validator';

@NgModule({
  imports: [
    AjfNodeIconModule,
    CommonModule,
    DragDropModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    AjfTranslocoModule,
    MatExpansionModule,
    MatSlideToggleModule,
  ],
  declarations: [
    AjfFbBranchLine,
    AjfFbChoicesOriginEditor,
    AjfFbChoicesOriginEditorDialog,
    AjfFbConditionEditor,
    AjfFbConditionEditorDialog,
    AjfFbNodeEntry,
    AjfFbNodeProperties,
    AjfFbNodeTypeEntry,
    AjfFbStringIdentifierDialogComponent,
    AjfFbValidationConditionEditorDialog,
    AjfFbWarningConditionEditorDialog,
    AjfFormBuilder,
  ],
  exports: [AjfFormBuilder],
  providers: [AjfFormBuilderService, AjfNodePropertiesNameMatchValidator],
})
export class AjfFormBuilderModule {}
