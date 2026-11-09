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

import {AjfField, AjfFieldType, AjfForm, AjfNodeType, AjfValidationGroup} from '@ajf/core/forms';
import {firstValueFrom, Subscription} from 'rxjs';

import {
  AjfContainerNode,
  AjfFormBuilderNodeEntry,
  AjfFormBuilderService,
} from './form-builder-service';

describe('Form builder not empty validation', () => {
  let service: AjfFormBuilderService;
  let sub: Subscription;

  const field = async () =>
    ((await firstValueFrom(service.nodes))[0] as AjfContainerNode).nodes[0] as AjfField;
  const save = async (notEmpty: boolean) => {
    service.editNodeEntry({node: await field()} as AjfFormBuilderNodeEntry);
    service.saveNodeEntry({name: 'name', label: 'Name', notEmpty});
    return (await field()).validation as AjfValidationGroup | undefined;
  };
  const open = (validation?: Partial<AjfValidationGroup>) => {
    sub = service.getCurrentForm().subscribe();
    service.setForm(testForm(validation));
  };

  beforeEach(() => (service = new AjfFormBuilderService()));
  afterEach(() => sub.unsubscribe());

  it('writes notEmpty as a flag, with no condition of its own', async () => {
    open();
    const validation = await save(true);

    expect(validation!.notEmpty).toBe(true);
    expect(JSON.stringify(validation)).not.toContain('notEmpty($value)');
  });

  it('keeps the message of the field', async () => {
    open({notEmpty: true, notEmptyMessage: 'Tell us your name'});
    const validation = await save(true);

    expect(validation!.notEmpty).toBe(true);
    expect(validation!.notEmptyMessage).toBe('Tell us your name');
  });

  it('moves a custom message of the old validation object to notEmptyMessage', async () => {
    open({
      notEmpty: {
        condition: 'notEmpty($value)',
        errorMessage: 'Tell us your name',
        clientValidation: false,
      },
    });
    const validation = await save(true);

    expect(validation!.notEmpty).toBe(true);
    expect(validation!.notEmptyMessage).toBe('Tell us your name');
  });

  it('drops the flag and its message when unchecked', async () => {
    open({notEmpty: true, notEmptyMessage: 'Tell us your name'});
    const validation = await save(false);

    expect(validation?.notEmpty).toBeUndefined();
    expect(validation?.notEmptyMessage).toBeUndefined();
  });
});

const testForm = (validation?: Partial<AjfValidationGroup>): AjfForm =>
  ({
    nodes: [
      {
        id: 1,
        parent: 0,
        parentNode: 0,
        label: 'Slide 1',
        name: 'slide_1',
        nodeType: AjfNodeType.AjfSlide,
        conditionalBranches: [],
        nodes: [
          {
            id: 1001,
            parent: 1,
            parentNode: 0,
            label: 'Name',
            name: 'name',
            nodeType: AjfNodeType.AjfField,
            fieldType: AjfFieldType.String,
            conditionalBranches: [],
            validation: validation != null ? {conditions: [], ...validation} : undefined,
          },
        ],
      },
    ],
    choicesOrigins: [],
    attachmentsOrigins: [],
    stringIdentifier: [],
  } as unknown as AjfForm);
