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

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';

import {TranslateModule} from '@ngx-translate/core';

import {DndModule} from 'ngx-dnd';

import {ColorPickerModule} from 'ngx-color-picker';

import {AjfCommonModule} from '@ajf/core/common';
import {AjfMapModule} from '@ajf/core/map';
import {AjfTableModule} from '@ajf/core/table';
import {AjfTextModule} from '@ajf/core/text';
import {AjfImageModule} from '@ajf/material/image';
import {AjfMonacoEditorModule} from '@ajf/material/monaco-editor';

import {AjfReportBuilderColumn} from './column';
import {AjfReportBuilderConditionEditor} from './condition-editor';
import {AjfReportBuilderContent} from './content';
import {AjfReportBuilderCustomWidgetDialog} from './custom-widget-dialog';
import {AjfReportBuilderCustomWidgetToolbarButton} from './custom-widget-toolbar-button';
import {AjfReportBuilderCustomWidgetsToolbar} from './custom-widgets-toolbar';
import {AjfReportBuilderFormsAnalyzerDialog} from './forms-analyzer-dialog';
import {AjfReportBuilderFormsAnalyzer} from './forms-analyzer';
import {AjfImageFilterPipe} from './image-filter';
import {AjfReportBuilderImageGroup} from './image-group';
import {AjfReportBuilderProperties} from './properties';
import {AjfQuillEditor} from './quill-editor';
import {AjfReportBuilderRendererWidget} from './renderer-widget';
import {AjfReportBuilderThemeColorDialog} from './theme-color-dialog';
import {AjfReportBuilderThemeColor} from './theme-color';
import {AjfReportBuilderToolbarDialog} from './toolbar-dialog';
import {AjfReportBuilderToolbar} from './toolbar';
import {AjfReportBuilderWidgetToolbarButton} from './widget-toolbar-button';
import {AjfReportBuilderWidgetsRowButtons} from './widgets-row-buttons';
import {AjfReportBuilderWidgetsToolbar} from './widgets-toolbar';
import {AjfReportBuilderService} from './report-builder-service';
import {AjfReportBuilder} from './report-builder';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    TranslateModule,
    DndModule,
    ColorPickerModule,
    AjfCommonModule,
    AjfImageModule,
    AjfMapModule,
    AjfMonacoEditorModule,
    AjfTableModule,
    AjfTextModule,
  ],
  declarations: [
    AjfQuillEditor,
    AjfReportBuilderColumn,
    AjfReportBuilderConditionEditor,
    AjfReportBuilderContent,
    AjfReportBuilderCustomWidgetDialog,
    AjfReportBuilderCustomWidgetToolbarButton,
    AjfReportBuilderCustomWidgetsToolbar,
    AjfReportBuilderFormsAnalyzerDialog,
    AjfReportBuilderFormsAnalyzer,
    AjfReportBuilderImageGroup,
    AjfReportBuilderProperties,
    AjfReportBuilderRendererWidget,
    AjfReportBuilderThemeColorDialog,
    AjfReportBuilderThemeColor,
    AjfReportBuilderToolbarDialog,
    AjfReportBuilderToolbar,
    AjfReportBuilderWidgetToolbarButton,
    AjfReportBuilderWidgetsRowButtons,
    AjfReportBuilderWidgetsToolbar,
    AjfReportBuilder,
    AjfImageFilterPipe,
  ],
  exports: [
    AjfReportBuilder,
  ],
  entryComponents: [
    AjfReportBuilderFormsAnalyzerDialog,
    AjfReportBuilderThemeColorDialog,
    AjfReportBuilderToolbarDialog,
  ],
  providers: [
    AjfReportBuilderService,
  ]
})
export class AjfReportBuilderModule { }
