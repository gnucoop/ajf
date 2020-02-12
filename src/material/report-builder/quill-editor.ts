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
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Renderer2,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  FormControl,
  Validator
} from '@angular/forms';

import {Subscription} from 'rxjs';

import {AjfReportBuilderService} from './report-builder-service';

import {default as Quill} from 'quill';


@Component({
  selector: 'ajf-quill-editor',
  template: `
    <ng-content select="[ajf-quill-editor-toolbar]"></ng-content>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AjfQuillEditor),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => AjfQuillEditor),
    multi: true
  }],
  styleUrls: ['quill-editor.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AjfQuillEditor
  implements AfterViewInit, ControlValueAccessor, OnChanges, OnDestroy, Validator {

  quillEditor: any;
  editorElem: HTMLElement;
  emptyArray: any[] = [];
  content: any;

  listenFunc: Function;

  previewElemFormula: any;
  private _init: boolean = false;

  dateFormats = [
    {
      'label': 'June 23rd 2017, 12:39:12 pm',
      'value': 'MMMM Do YYYY, h:mm:ss a',
      'validator': 'MMMMDoYYYYhmmssa'
    }, {
      'label': 'Friday',
      'value': 'dddd',
      'validator': 'dddd'
    }, {
      'label': 'Jun 23rd 17',
      'value': 'MMM Do YY',
      'validator': 'MMMDoYY'
    }];


  fonts = [
    false,
    'blackr',
    'black-italic',
    'bold',
    'bold-condensed',
    'bold-condensed-italic',
    'bold-italic',
    'condensed',
    'condensed-italic',
    'italic',
    'light',
    'light-italic',
    'medium',
    'medium-italic',
    'thinr',
    'thin-italic'
  ];

  defaultModules = {
    formula: true,
    toolbar: [
      ['formula'],
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      // ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      // [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': this.emptyArray.slice() },
      { 'background': this.emptyArray.slice() }],          // dropdown with defaults from theme
      [{ 'font': this.fonts }],
      [{ 'align': this.emptyArray.slice() }],

      ['clean'],                                         // remove formatting button

      // ['link', 'image', 'video']                         // link and image, video
    ]
  };

  font = Quill.import('formats/font');


  @Input() theme: string;
  @Input() modules: Object;
  @Input() readOnly: boolean;
  @Input() placeholder: string;
  @Input() maxLength: number;
  @Input() minLength: number;
  @Input() formats: string[];
  @Input() initHTML: string;

  @Output() editorCreated: EventEmitter<any> = new EventEmitter();
  @Output() contentChanged: EventEmitter<any> = new EventEmitter();
  @Output() selectionChanged: EventEmitter<any> = new EventEmitter();


  /**
   * this event is fired when the user click on formula button on quill editor rool barƒ
   *
   * @memberof QuillEditorComponent
   */
  @Output() formulaClick: EventEmitter<any> = new EventEmitter<any>();


  onModelChange: Function = () => { };
  onModelTouched: Function = () => { };

  private _formulas: { formula: any, unlisten: Function | null }[] = [];
  private _formulaTextSub: Subscription = Subscription.EMPTY;

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    private _service: AjfReportBuilderService) {
    this.font.whitelist = this.fonts;
    this.font.whitelist.push('regular');

    this._formulaTextSub =
      this._service.getFormulaToHtmlEvent()
        .subscribe((event: any) => {

          // reference is defined only when the user want to edit the formula
          if (event.reference !== undefined) {
            event.reference.innerHTML = event.formula;
            this._renderer.setAttribute(event.reference, 'formula', event.formula);
            const efs = this._formulas.filter(f => f.formula === event.reference);
            let formulaEntry;
            let unlisten;
            if (efs.length > 0) {
              formulaEntry = efs[0];
              unlisten = formulaEntry.unlisten;
              if (unlisten != null) {
                unlisten();
              }
            } else {
              formulaEntry = { formula: event.reference, unlisten: null };
              this._formulas.push(formulaEntry);
            }
            formulaEntry.unlisten = this._renderer.listen(
              event.reference, 'click', () => {
                let obj = {
                  'formula': event.formula,
                  'reference': event.reference
                };
                this.formulaClick.emit(obj);
              }
            );
          } else {
            const quillEditor = this._elementRef.nativeElement.querySelector('.ajf-ql-editor');
            const link = this._renderer.createElement('a');
            this._renderer.setAttribute(link, 'href', 'javascript:void(0)');
            this._renderer.setStyle(link, 'cursor', 'pointer');
            this._renderer.setAttribute(link, 'formula', this.check(event.formula));
            const linkLabel = this._renderer.createText(event.formula);
            this._renderer.appendChild(link, linkLabel);
            // add listener related on the click event of the new formula
            const unlisten = this._renderer.listen(
              link, 'click', (_) => {
                let obj = {
                  'formula': this.check(event.formula),
                  'reference': link
                };
                this.formulaClick.emit(obj);
              }
            );
            this._renderer.appendChild(quillEditor, link);
            this._formulas.push({ unlisten, formula: link });
          }
        });
  }

  check(value: string): string {
    for (let i = 0 ; i < this.dateFormats.length ; i++) {
      if (this.dateFormats[i].value == value) {
        return this.dateFormats[i].validator;
      }
    }
    return <string>value;
  }
  /**
   * this function search fomulas inside the init text
   * and allocate the related listener on click event
   *
   * @memberof QuillEditorComponent
   */
  setHTML() {
    this.writeValue(this.initHTML);
  }

  ngAfterViewInit() {
    const toolbarElem = this._elementRef.nativeElement.querySelector('[ajf-quill-editor-toolbar]');
    let modules: any = this.modules || this.defaultModules;

    Quill.register(this.font, true);

    if (toolbarElem) {
      modules['toolbar'] = toolbarElem;
      modules['formula'] = true;
    }
    this._elementRef.nativeElement.insertAdjacentHTML(
      'beforeend', '<div quill-editor-element></div>'
    );

    this.editorElem = this._elementRef.nativeElement.querySelector('[quill-editor-element]');

    this.quillEditor = new Quill(this.editorElem, {
      modules: modules,
      placeholder: this.placeholder || 'Insert text here ...',
      readOnly: this.readOnly || false,
      theme: this.theme || 'snow',
      formats: this.formats
    });


    this.editorCreated.emit(this.quillEditor);
    this.setHTML();

    // mark model as touched if editor lost focus
    this.quillEditor.on('selection-change', (range: any, oldRange: any, source: string) => {
      this.selectionChanged.emit({
        editor: this.quillEditor,
        range: range,
        oldRange: oldRange,
        source: source
      });

      if (!range) {
        this.onModelTouched();
      }
    });

    // update model if text changes
    this.quillEditor.on('text-change', (delta: any, oldDelta: any, source: string) => {
      let html: any = this.editorElem.children[0].innerHTML;
      const text = this.quillEditor.getText();

      if (html === '<p><br></p>') {
        html = null;
      }

      this.onModelChange(html);

      this.contentChanged.emit({
        editor: this.quillEditor,
        html: html,
        text: text,
        delta: delta,
        oldDelta: oldDelta,
        source: source
      });
    });

    let elem = this._elementRef.nativeElement.querySelector('.ajf-ql-formula');
    this.listenFunc = this._renderer.listen(elem, 'click', (_) => {
      this.formulaClick.emit();

    });

  }

  writeValue(currentValue: any) {
    this.content = currentValue;

    if (this.quillEditor) {
      if (currentValue) {
        if (currentValue == this.initHTML && !this._init) {
          let editor = this._elementRef.nativeElement.querySelector('.ajf-ql-editor');
          editor.innerHTML = this.initHTML;
          let allFormulas = this._elementRef.nativeElement.querySelectorAll('[formula]');
          allFormulas.forEach((elem: any) => {
            const unlisten = this._renderer.listen(
              elem, 'click', (_) => {
                let obj = {
                  'formula': this.check(elem.innerText),
                  'reference': elem
                };
                this.formulaClick.emit(obj);
              }
            );
            this._renderer.setStyle(elem, 'cursor', 'pointer');
            this._formulas.push({ unlisten, formula: elem });
            this._init = true;
          });
        } else if (currentValue != this.initHTML) {
          this.quillEditor.pasteHTML(currentValue);
        }
        return;
      }
      this.quillEditor.setText('');
    }
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  validate(_c: FormControl) {
    if (!this.quillEditor) {
      return null;
    }

    let err: {
      minLengthError?: { given: number, minLength: number };
      maxLengthError?: { given: number, maxLength: number };
    } = {},
      valid = true;

    const textLength = this.quillEditor.getText().trim().length;

    if (this.minLength) {
      err.minLengthError = {
        given: textLength,
        minLength: this.minLength
      };

      valid = textLength >= this.minLength || !textLength;
    }

    if (this.maxLength) {
      err.maxLengthError = {
        given: textLength,
        maxLength: this.maxLength
      };

      valid = textLength <= this.maxLength && valid;
    }

    return valid ? null : err;
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['readOnly'] && this.quillEditor) {
      this.quillEditor.enable(!changes['readOnly'].currentValue);
    }
    if (changes['modules'] && this.quillEditor) {

      Quill.register(this.font, true);
      this.quillEditor = new Quill(this.editorElem, {
        modules: changes['modules']['currentValue'],
        placeholder: this.placeholder || 'Insert text here ...',
        readOnly: this.readOnly || false,
        theme: this.theme || 'snow',
        formats: this.formats
      });
      this._elementRef.nativeElement.children[0].remove();
    }
  }
  ngOnDestroy() {
    for (let i = 0; i < this._formulas.length; i++) {
      let unlisten = this._formulas[i].unlisten;
      if (unlisten != null) {
        unlisten();
      }
    }
    this._formulaTextSub.unsubscribe();
  }
}
