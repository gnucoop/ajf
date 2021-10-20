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

import {AjfCommonModule} from '@ajf/core/common';
import {AjfMapModule} from '@ajf/core/map';
import {AjfTableModule} from '@ajf/core/table';
import {AjfTextModule} from '@ajf/core/text';
import {AjfTranslocoModule} from '@ajf/core/transloco';
import {AjfImageModule} from '@ajf/material/image';
import {AjfMonacoEditorModule} from '@ajf/material/monaco-editor';
import {DragDropModule} from '@angular/cdk/drag-drop';
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
import {ColorPickerModule} from 'ngx-color-picker';

import {AjfReportBuilderColumn} from './column';
import {AjfReportBuilderConditionEditor} from './condition-editor';
import {AjfReportBuilderContent} from './content';
import {AjfReportBuilderCustomWidgetDialog} from './custom-widget-dialog';
import {AjfReportBuilderCustomWidgetToolbarButton} from './custom-widget-toolbar-button';
import {AjfReportBuilderCustomWidgetsToolbar} from './custom-widgets-toolbar';
import {AjfReportBuilderFormsAnalyzer} from './forms-analyzer';
import {AjfReportBuilderFormsAnalyzerDialog} from './forms-analyzer-dialog';
import {AjfImageFilterPipe} from './image-filter';
import {AjfReportBuilderImageGroup} from './image-group';
import {AjfReportBuilderProperties} from './properties';
import {AjfQuillEditor} from './quill-editor';
import {AjfReportBuilderRendererWidget} from './renderer-widget';
import {AjfReportBuilder} from './report-builder';
import {AjfReportBuilderService} from './report-builder-service';
import {AjfReportBuilderThemeColor} from './theme-color';
import {AjfReportBuilderThemeColorDialog} from './theme-color-dialog';
import {AjfReportBuilderToolbar} from './toolbar';
import {AjfReportBuilderToolbarDialog} from './toolbar-dialog';
import {AjfReportBuilderWidgetToolbarButton} from './widget-toolbar-button';
import {AjfReportBuilderWidgetsRowButtons} from './widgets-row-buttons';
import {AjfReportBuilderWidgetsToolbar} from './widgets-toolbar';

@NgModule({
  imports: [
    AjfCommonModule,
    AjfImageModule,
    AjfMapModule,
    AjfMonacoEditorModule,
    AjfTableModule,
    AjfTextModule,
    ColorPickerModule,
    CommonModule,
    DragDropModule,
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
    AjfTranslocoModule,
  ],
  declarations: [
    AjfImageFilterPipe,
    AjfQuillEditor,
    AjfReportBuilderColumn,
    AjfReportBuilderConditionEditor,
    AjfReportBuilderContent,
    AjfReportBuilderCustomWidgetDialog,
    AjfReportBuilderCustomWidgetsToolbar,
    AjfReportBuilderCustomWidgetToolbarButton,
    AjfReportBuilderFormsAnalyzer,
    AjfReportBuilderFormsAnalyzerDialog,
    AjfReportBuilderImageGroup,
    AjfReportBuilderProperties,
    AjfReportBuilderRendererWidget,
    AjfReportBuilderThemeColor,
    AjfReportBuilderThemeColorDialog,
    AjfReportBuilderToolbar,
    AjfReportBuilderToolbarDialog,
    AjfReportBuilderWidgetsRowButtons,
    AjfReportBuilderWidgetsToolbar,
    AjfReportBuilderWidgetToolbarButton,
    AjfReportBuilder,
  ],
  exports: [AjfReportBuilder],
  providers: [AjfReportBuilderService],
})
export class AjfReportBuilderModule {}
