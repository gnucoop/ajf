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

import {AJF_FORM_SCHEMA_VERSION, AJF_REPORT_SCHEMA_VERSION} from '@ajf/core/schemas';
import {Injectable} from '@angular/core';
import * as Ajv from 'ajv';
import * as debug from 'debug';

import {schema as formSchema} from './ajf-form-schema';
import {schema as formStrictSchema} from './ajf-form-strict-schema';
import {schema as reportSchema} from './ajf-report-schema';
import {schema as reportStrictSchema} from './ajf-report-strict-schema';
import {AjfJsonValidationModule} from './json-validation-module';
import {AjfJsonValidatorError, AjfJsonValidatorResult} from './json-validator-result';

const debugConstructor: (value?: any) => debug.IDebugger = (<any>debug).default || debug;
const dbg = debugConstructor('ajf:json-validation');

@Injectable({providedIn: AjfJsonValidationModule})
export class AjfJsonValidator {
  private _ajv = new Ajv({allErrors: true});

  constructor() {
    this._ajv.addSchema(formSchema, `form-${AJF_FORM_SCHEMA_VERSION}`);
    this._ajv.addSchema(formStrictSchema, `form-strict-${AJF_FORM_SCHEMA_VERSION}`);
    this._ajv.addSchema(reportSchema, `report-${AJF_REPORT_SCHEMA_VERSION}`);
    this._ajv.addSchema(reportStrictSchema, `report-strict-${AJF_REPORT_SCHEMA_VERSION}`);
  }

  validate(type: 'form'|'report', json: object|string, options?: {
    strict?: boolean,
    version?: string
  }): AjfJsonValidatorResult {
    let {strict, version} = options || {};
    strict = strict != null ? strict : false;
    if (version == null) {
      version = type === 'form' ? AJF_FORM_SCHEMA_VERSION : AJF_REPORT_SCHEMA_VERSION;
    }
    let key = `${type}-`;
    if (strict) {
      key = `${key}strict-`;
    }
    key = `${key}${version}`;
    const schema = this._ajv.getSchema(key);
    if (schema == null) {
      throw new Error('Invalid schema');
    }
    const jsonObj = parseJsonInput(json);
    let valid = false;
    let errors: AjfJsonValidatorError[]|undefined = undefined;
    if (jsonObj != null) {
      valid = schema(jsonObj) as boolean;
      if (!valid) {
        errors = (schema.errors as Ajv.ErrorObject[])
                     .map(error => ({error, message: this._ajv.errorsText([error])}));
      }
    }

    dbg('Validation result: %s', valid);
    if (!valid) {
      dbg('Validation error: %s', this._ajv.errorsText(this._ajv.errors as Ajv.ErrorObject[]));
    }
    return {valid, errors};
  }
}

function parseJsonInput(json: object|string): object|null {
  if (typeof json === 'string') {
    try {
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  }
  return json;
}
