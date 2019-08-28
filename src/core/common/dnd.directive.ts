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

import {Directive, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[ajfDnd]',
  host: {
    '[style.background]': 'background',
    '(dragover)': 'onDragOver($event)',
    '(dragleave)': 'onDragLeave($event)',
    '(drop)': 'onDrop($event)',
  }
})
export class AjfDndDirective {
  @Output() file: EventEmitter<any> = new EventEmitter<any>();

  background = '#eee';

  onDragOver(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }

  onDragLeave(evt: Event) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
  }

  onDrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    let files: FileList = evt.dataTransfer.files;
    if (files.length > 0) {
      this.background = '#eee';
      this.file.emit(files);
    }
  }
}
