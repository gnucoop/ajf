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
import {ChangeDetectorRef, Injectable} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {debounceTime, finalize, map, take} from 'rxjs/operators';
import {AjfFormBuilderService} from './form-builder-service';

/**
 * Custom validator service that checks for an already existing
 * Node with the given name.
 */
@Injectable()
export class AjfNodePropertiesNameMatchValidator {
  constructor(private _fbs: AjfFormBuilderService) {}

  /**
   * Custom async validator method.
   * Checks if a Node with the same Name exists, in order to
   * validate the Node Entry properties form.
   * @param cdr The editor changeDetectionRef
   * @param currentId The current node entry id
   */
  sameValueCheck(cdr: ChangeDetectorRef, currentId: number): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!this._fbs.flatNodes) return of(null);
      return this._fbs.flatNodes.pipe(
        debounceTime(300),
        map(nodes => {
          const sameNameNode = nodes.find(
            n => n.name.toLowerCase() === control.value.toLowerCase() && n.id != currentId,
          );
          if (sameNameNode) {
            return {'name_exists': true};
          }
          return null;
        }),
        finalize(() => {
          control.markAsTouched();
          cdr.detectChanges();
        }),
        take(1),
      );
    };
  }
}
