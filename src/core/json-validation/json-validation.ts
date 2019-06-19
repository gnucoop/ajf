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


import Ajv, { ErrorObject } from 'ajv';
import debug from 'debug';

// import * as JSONSCHEMA_v1 from './ajf_v1.schema.json';
import {JSONSCHEMA as JSONSCHEMA_AJF_V1} from './ajf_v1.schema';


const DEFAULT_SCHEMA_KEY: unique symbol = Symbol('default');

const knownSchemas: {[key: string]: object} = {
    'ajf_v1': JSONSCHEMA_AJF_V1
};

// NB: TS not supporting symbol indexing means we have to suppress the compiler error.
//     see: https://github.com/Microsoft/TypeScript/issues/1863
//
// @ts-ignore
knownSchemas[DEFAULT_SCHEMA_KEY] = JSONSCHEMA_AJF_V1;

const debugConstructor: (value?: any) => debug.IDebugger =
    (<any>debug).default || debug;

const dbg = debugConstructor('ajf:json-validation');

export class AjfJsonValidator {

    private static ajv = new Ajv();

    static getErrors() {
        return AjfJsonValidator.ajv.errors;
    }

    static getKnownSchema(schemakey: string | symbol = DEFAULT_SCHEMA_KEY) {
        // @ts-ignore
        return knownSchemas[schemakey];
    }

    private constructor() {
    }

    static validateWithSchema(jsondocument: object | string, schema: object ): boolean {
        let valid = false;

        if (schema) {
            valid = Boolean(AjfJsonValidator.ajv.validate(schema, jsondocument));
        }

        dbg(`... validation result: %s`, valid);

        if (!valid) {
            dbg(`Errors: %j`, this.ajv.errors);
        }
        return valid;
    }

// tslint:disable-next-line: max-line-length
    static validate(jsondocument: object | string, schemakey: string | symbol = DEFAULT_SCHEMA_KEY): boolean {
        let keyLabel = schemakey === DEFAULT_SCHEMA_KEY ? 'default' : schemakey.toString();

        dbg(`Validation according to schema "%s"...`, keyLabel);

        // NB: TS not supporting symbol indexing means we have to suppress the compiler error.
        //     see: https://github.com/Microsoft/TypeScript/issues/1863
        //
        // @ts-ignore
        let schema = this.getKnownSchema(schemakey);

        if (schema !== undefined) {
            return this.validateWithSchema(jsondocument, schema);
        }

        dbg(`Error: unknown schema "%s"...`, keyLabel);
        return false;
    }
}
