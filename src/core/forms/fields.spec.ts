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
    AjfField, AjfFieldCreate, AjfFieldType, createField, isField, isFieldWithChoices,
    isFormulaField, isNumberField, isTableField
} from './public-api';

describe('createField', () => {
    it('create field with null, undefined and empty arguments', () => {
        const fields: AjfField[] = [
            createField(null as any), createField({} as any), createField(undefined as any)
            ];
        fields.forEach(field => {
            expect(isField(field)).toBe(true);
        });
    });

    it('create field with right arguments', () => {
        const params: AjfFieldCreate = {
            id: 1,
            name: 'foo',
            parent: 0,
            fieldType: AjfFieldType.Empty
        };
        expect(isField(createField(params))).toBe(true);
    });

    it('use no field parameter', () => {
        const params: AjfFieldCreate = {
            id: 1,
            name: 'foo',
            parent: 0,
            fieldType: AjfFieldType.Empty
        };
        const field = createField(params);
        field.nodeType = 1;
        expect(isField(field)).toBe(false);
        expect(isField(null as any)).toBe(false);
        expect(isField({} as any)).toBe(false);
        expect(isField(undefined as any)).toBe(false);
    });
});

describe('field type tests', () => {
    const fields: AjfField[] = [];

    const fieldTypeKeys = Object.keys(AjfFieldType).filter(x => !(+x >= 0));
    for (let i = 0; i < fieldTypeKeys.length; i++) {
        fields.push(createField({
            id: 1,
            name: 'foo',
            parent: 0,
            fieldType: i
        }));
    }

    it('isFieldWithChoices', () => {
        for (let i = 0; i < fields.length; i++) {
            const res = isFieldWithChoices(fields[i]);
            if (isField(fields[i]) && (i == AjfFieldType.MultipleChoice || i == AjfFieldType.SingleChoice)) {
                expect(res).toBe(true);
            } else {
                expect(res).toBe(false);
            }
        }
    });

    it('isFormulaField', () => {
        for (let i = 0; i < fields.length; i++) {
            const res = isFormulaField(fields[i]);
            if (isField(fields[i]) && i == AjfFieldType.Formula) {
                expect(res).toBe(true);
            } else {
                expect(res).toBe(false);
            }
        }
    });

    it('isNumberField', () => {
        for (let i = 0; i < fields.length; i++) {
            const res = isNumberField(fields[i]);
            if (isField(fields[i]) && i == AjfFieldType.Number) {
                expect(res).toBe(true);
            } else {
                expect(res).toBe(false);
            }
        }
    });

    it('isTableField', () => {
        for (let i = 0; i < fields.length; i++) {
            const res = isTableField(fields[i]);
            if (isField(fields[i]) && i == AjfFieldType.Table) {
                expect(res).toBe(true);
            } else {
                expect(res).toBe(false);
            }
        }
    });

});
