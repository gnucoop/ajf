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
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input,
  OnChanges, OnDestroy, Output, SimpleChange, ViewChild, ViewEncapsulation
} from '@angular/core';
import {AutoCompleteSingleton} from './autocomplete-singleton-model';
import {IEditorLanguage} from './editor-language-model';
import {IEditorOptions} from './editor-options-model';
import {IEditorScrollbarOptions} from './editor-scrollbar-options';
import {IEditorTheme} from './editor-theme';

declare const monaco: any;


@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ajf-monaco-editor',
  styleUrls: ['monaco-editor.css'],
  templateUrl: 'monaco-editor.html',
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class AjfMonacoEditor implements OnDestroy, AfterViewInit, OnChanges {
  @Input() experimentalScreenReader?: boolean;
  @Input() ariaLabel?: string;
  @Input() rulers?: number[];
  @Input() wordSeparators?: string;
  @Input() selectionClipboard?: boolean;
  @Input() lineNumbers?: boolean;
  @Input() selectOnLineNumbers?: boolean;
  @Input() lineNumbersMinChars?: number;
  @Input() glyphMargin?: boolean;
  @Input() lineDecorationsWidth?: number;
  @Input() revealHorizontalRightPadding?: number;
  @Input() roundedSelection?: boolean;
  @Input() theme?: IEditorTheme;
  @Input() readOnly?: boolean;
  @Input() scrollbar?: IEditorScrollbarOptions;
  @Input() overviewRulerLanes?: number;
  @Input() cursorBlinking?: string;
  @Input() mouseWheelZoom?: boolean;
  @Input() cursorStyle?: string;
  @Input() fontLigatures?: boolean;
  @Input() disableTranslate3d?: boolean;
  @Input() hideCursorInOverviewRuler?: boolean;
  @Input() scrollBeyondLastLine?: boolean;
  @Input() automaticLayout?: boolean;
  @Input() wrappingColumn?: number;
  @Input() wordWrap?: boolean;
  @Input() wrappingIndent?: string;
  @Input() wordWrapBreakBeforeCharacters?: string;
  @Input() wordWrapBreakAfterCharacters?: string;
  @Input() wordWrapBreakObtrusiveCharacters?: string;
  @Input() stopRenderingLineAfter?: number;
  @Input() hover?: boolean;
  @Input() contextmenu?: boolean;
  @Input() mouseWheelScrollSensitivity?: number;
  @Input() quickSuggestions?: boolean;
  @Input() quickSuggestionsDelay?: number;
  @Input() parameterHints?: boolean;
  @Input() iconsInSuggestions?: boolean;
  @Input() autoClosingBrackets?: boolean;
  @Input() formatOnType?: boolean;
  @Input() suggestOnTriggerCharacters?: boolean;
  @Input() acceptSuggestionOnEnter?: boolean;
  @Input() snippetSuggestions?: 'top' | 'bottom' | 'inline' | 'none';
  @Input() tabCompletion?: boolean;
  @Input() wordBasedSuggestions?: boolean;
  @Input() selectionHighlight?: boolean;
  @Input() codeLens?: boolean;
  @Input() folding?: boolean;
  @Input() renderWhitespace?: 'none' | 'boundary' | 'all';
  @Input() renderControlCharacters?: boolean;
  @Input() renderIndentGuides?: boolean;
  @Input() renderLineHighlight?: boolean;
  @Input() useTabStops?: boolean;
  @Input() fontFamily?: string;
  @Input() fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | 'initial' | 'inherit'
    | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  @Input() fontSize?: number;
  @Input() lineHeight?: number;

  @Input() language: IEditorLanguage;

  @Input() disableAutocomplete: boolean;
  @Input() autoFormatOnLoad = true;
  @Input() monacoLibPath = 'vs/loader.js';

  @Input() set valueToCompare(v: string) {
    if (v !== this._valueToCompare) {
      this._valueToCompare = v;

      if (this._valueToCompare === void 0 || !this._valueToCompare || !this._editor) {
        if (this._editor && this._editor.getEditorType() !== 'vs.editor.ICodeEditor') {
          this.initEditor();
          return;
        }

        return;
      }

      if (!this._value) {
        this._value = '';
      }

      if (this._editor.getEditorType() === 'vs.editor.ICodeEditor') {
        this.initEditor();
        return;
      }
    }
  }

    @Input() set value(v: string) {
      if (v !== this._value) {
        this._value = v;

        if (this._value === void 0 || !this._editor) {
          return;
        }

        if (this._editor.getEditorType() !== 'vs.editor.ICodeEditor') {
          this.initEditor();
          return;
        }

        this._editor.setValue(this._value);
      }
    }

    @Output() valueChange = new EventEmitter();
    @Output() valueToCompareChange = new EventEmitter();
    @Output() init = new EventEmitter();

    @ViewChild('editor') editorContent: ElementRef;

    private _editor: any;
    get editor(): any { return this._editor; }

    private _value = '';
    private _valueToCompare = '';

    constructor() {
    }

    /**
     * load Monaco lib
     */
    ngAfterViewInit() {
        let onGotAmdLoader = () => {
            // Load monaco
            (<any>window).require(['vs/editor/editor.main'], () => {
                this.initMonaco();
            });
        };

        // Load AMD loader if necessary
        if (!(<any>window).require) {
            let loaderScript = document.createElement('script');
            loaderScript.type = 'text/javascript';
            loaderScript.src = this.monacoLibPath;
            loaderScript.addEventListener('load', onGotAmdLoader);
            document.body.appendChild(loaderScript);
        } else {
            onGotAmdLoader();
        }
    }

    /**
     * Upon destruction of the component we make sure to dispose both the editor and
     * the extra libs that we might've loaded
     */
    ngOnDestroy() {
        this.dispose();
    }

    ngOnChanges(_changes: {[propKey: string]: SimpleChange}) {
        if (this._editor) {
            this._editor.updateOptions(this.getOptions());
        }
    }

    /**
     * Destroy the monaco componenent
     */
    dispose() {
        let myDiv: HTMLDivElement = this.editorContent.nativeElement;
        if (this._editor) {
            this._editor.dispose();
            while (myDiv.hasChildNodes()) {
              if (myDiv.firstChild != null) {
                myDiv.removeChild(myDiv.firstChild);
              }
            }
            this._editor = null;
        }
    }

    /**
     * Triggered when windows is resized
     * @param event
     */
    onResize(_event: any) {
        // Manually set monaco size because MonacoEditor doesn't work with Flexbox css
        let myDiv: HTMLDivElement = this.editorContent.nativeElement;
        if (myDiv == null || myDiv.parentElement == null) { return; }
        myDiv.setAttribute('style', `height: ${myDiv.parentElement.offsetHeight}px; width:100%;`);
    }

    /**
     * Init editor
     * Is called once monaco library is available
     */
    private initMonaco() {
        this.initEditor();
        this.init.emit();
    }

    private initEditor() {
        let myDiv: HTMLDivElement = this.editorContent.nativeElement;
        let options = this.getOptions();
        this.dispose();

        if (!this._valueToCompare) {
            this._editor = this.initSimpleEditor(myDiv, options);
        } else {
            this._editor = this.initDiffEditor(myDiv, options);
        }

        // Manually set monaco size because MonacoEditor doesn't work with Flexbox css
        if (myDiv != null && myDiv.parentElement != null) {
          myDiv.setAttribute('style', `height: ${myDiv.parentElement.offsetHeight}px; width:100%;`);
        }

        // Init Autocomplete if not disabled
        if (!this.disableAutocomplete) {
            AutoCompleteSingleton.getInstance().initAutoComplete(this.language);
        }

        // When content is loaded, scrollChange is trigerred,
        // We can only force auto format at this moment, because editor
        // doesn't have onReady event ...
        //  this._editor.onDidScrollChange(() => {
        //     if (this.autoFormatOnLoad && !this._isCodeFormatted) {
        //         this._editor.getAction('editor.action.format').run();
        //         this._isCodeFormatted = true;
        //     }
        // });

        // Trigger on change event for simple editor
        this.getOriginalModel().onDidChangeContent((_e: any) => {
            let newVal: string = this.getOriginalModel().getValue();
            if (this._value !== newVal) {
                this.updateValue(newVal);
            }
        });

        // Trigger on change event for diff editor
        if (this.getModifiedModel()) {
            this.getModifiedModel().onDidChangeContent((_e: any) => {
                let newVal: string = this.getModifiedModel().getValue();
                if (this._valueToCompare !== newVal) {
                    this.updateValueToCompare(newVal);
                }
            });
        }
    }

    /**
     * Create a simple editor text
     * @param div
     * @param options
     */
    private initSimpleEditor(div: HTMLDivElement, options: any) {
        return monaco.editor.create(div, options);
    }

    /**
     * Create a diff editor to compare two string (_value and _valueToCompare)
     * @param div
     */
    private initDiffEditor(div: HTMLDivElement, options: any) {
        let originalModel = monaco.editor.createModel(this._value, this.language);
        let modifiedModel = monaco.editor.createModel(this._valueToCompare, this.language);

        let diffEditor = monaco.editor.createDiffEditor(div, options);
        diffEditor.setModel({
            modified: modifiedModel,
            original: originalModel,
        });

        return diffEditor;
    }

    private getOptions(): IEditorOptions {
        let options: IEditorOptions = new IEditorOptions();
        options.experimentalScreenReader = this.experimentalScreenReader;
        options.ariaLabel = this.ariaLabel;
        options.rulers = this.rulers;
        options.wordSeparators = this.wordSeparators;
        options.selectionClipboard = this.selectionClipboard;
        options.lineNumbers = this.lineNumbers;
        options.selectOnLineNumbers = this.selectOnLineNumbers;
        options.lineNumbersMinChars = this.lineNumbersMinChars;
        options.glyphMargin = this.glyphMargin;
        options.lineDecorationsWidth = this.lineDecorationsWidth;
        options.revealHorizontalRightPadding = this.revealHorizontalRightPadding;
        options.roundedSelection = this.roundedSelection;
        options.theme = this.theme;
        options.readOnly = this.readOnly;
        options.scrollbar = this.scrollbar;
        options.overviewRulerLanes = this.overviewRulerLanes;
        options.cursorBlinking = this.cursorBlinking;
        options.mouseWheelZoom = this.mouseWheelZoom;
        options.cursorStyle = this.cursorStyle;
        options.mouseWheelZoom = this.mouseWheelZoom;
        options.fontLigatures = this.fontLigatures;
        options.disableTranslate3d = this.disableTranslate3d;
        options.hideCursorInOverviewRuler = this.hideCursorInOverviewRuler;
        options.scrollBeyondLastLine = this.scrollBeyondLastLine;
        options.automaticLayout = this.automaticLayout;
        options.wrappingColumn = this.wrappingColumn;
        options.wordWrap = this.wordWrap;
        options.wrappingIndent = this.wrappingIndent;
        options.wordWrapBreakBeforeCharacters = this.wordWrapBreakBeforeCharacters;
        options.wordWrapBreakAfterCharacters = this.wordWrapBreakAfterCharacters;
        options.wordWrapBreakObtrusiveCharacters = this.wordWrapBreakObtrusiveCharacters;
        options.stopRenderingLineAfter = this.stopRenderingLineAfter;
        options.hover = this.hover;
        options.contextmenu = this.contextmenu;
        options.mouseWheelScrollSensitivity = this.mouseWheelScrollSensitivity;
        options.quickSuggestions = this.quickSuggestions;
        options.quickSuggestionsDelay = this.quickSuggestionsDelay;
        options.parameterHints = this.parameterHints;
        options.iconsInSuggestions = this.iconsInSuggestions;
        options.autoClosingBrackets = this.autoClosingBrackets;
        options.formatOnType = this.formatOnType;
        options.suggestOnTriggerCharacters = this.suggestOnTriggerCharacters;
        options.acceptSuggestionOnEnter = this.acceptSuggestionOnEnter;
        options.snippetSuggestions = this.snippetSuggestions;
        options.tabCompletion = this.tabCompletion;
        options.wordBasedSuggestions = this.wordBasedSuggestions;
        options.selectionHighlight = this.selectionHighlight;
        options.codeLens = this.codeLens;
        options.folding = this.folding;
        options.renderWhitespace = this.renderWhitespace;
        options.renderControlCharacters = this.renderControlCharacters;
        options.renderIndentGuides = this.renderIndentGuides;
        options.renderLineHighlight = this.renderLineHighlight;
        options.useTabStops = this.useTabStops;
        options.fontFamily = this.fontFamily;
        options.fontWeight = this.fontWeight;
        options.fontSize = this.fontSize;
        options.lineHeight = this.lineHeight;
        options.value = this._value;
        options.language = this.language;

        Object.keys(options)
          .forEach((key) => {
            if ((<any>options)[key] === undefined) {
              delete (<any>options)[key]; // Remove all undefined properties
            }
          });
        return options;
    }

    /**
     * UpdateValue
     *
     * @param value
     */
    private updateValue(value: string) {
        this.value = value;
        this._value = value;
        this.valueChange.emit(value);
    }

    /**
     * UpdateValue
     *
     * @param value
     */
    private updateValueToCompare(value: string) {
        this.valueToCompare = value;
        this._valueToCompare = value;
        this.valueToCompareChange.emit(value);
    }

    private getOriginalModel() {
        if (this._editor) {
            let model = this._editor.getModel();
            return model.original ? model.original : model;
        }
    }

    private getModifiedModel() {
        if (this._editor) {
            let model = this._editor.getModel();
            return model.modified ? model.modified : null;
        }
    }
}
