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

import {AjfConditionSerializer, AjfFormulaSerializer} from '@ajf/core/models';

import {AjfAttachmentsOrigin} from '../interface/attachments/attachments-origin';
import {AjfChoicesOrigin} from '../interface/choices/choices-origin';
import {AjfField} from '../interface/fields/field';
import {AjfFieldType} from '../interface/fields/field-type';
import {AjfFieldWithChoices} from '../interface/fields/field-with-choices';
import {AjfFormulaField} from '../interface/fields/formula-field';
import {AjfContainerNode} from '../interface/nodes/container-node';
import {AjfNode} from '../interface/nodes/node';
import {AjfNodeGroup} from '../interface/nodes/node-group';
import {AjfFieldNodeLink} from '../interface/nodes/node-link';
import {AjfNodeType} from '../interface/nodes/node-type';
import {AjfRepeatingNode} from '../interface/nodes/repeating-node';
import {AjfRepeatingSlide} from '../interface/slides/repeating-slide';
import {AjfSlide} from '../interface/slides/slide';
import {AjfFieldCreate, createField} from '../utils/fields/create-field';
import {createFieldWithChoices} from '../utils/fields/create-field-with-choices';
import {componentsMap} from '../utils/fields/fields-map';
import {createContainerNode} from '../utils/nodes/create-container-node';
import {AjfNodeCreate, createNode} from '../utils/nodes/create-node';
import {createNodeGroup} from '../utils/nodes/create-node-group';
import {createRepeatingNode} from '../utils/nodes/create-repeating-node';
import {createRepeatingSlide} from '../utils/slides/create-repeating-slide';
import {createSlide} from '../utils/slides/create-slide';

import {AjfValidationGroupSerializer} from './validation-group-serializer';
import {AjfWarningGroupSerializer} from './warning-group-serializer';

/**
 * Create an AjfNode by json schema,
 * apply a default value for name
 * throw new error if id,parent or nodeType attribute missed
 */
export class AjfNodeSerializer {
  static fromJson(
      json: Partial<AjfNode>,
      choicesOrigins?: AjfChoicesOrigin<any>[],
      attachmentsOrigins?: AjfAttachmentsOrigin<any>[],
      ): AjfNode {
    const err = 'Malformed node';
    json.name = json.name || '';
    if (json.id == null || json.parent == null || json.nodeType == null) {
      throw new Error(err);
    }
    const obj = json as AjfNodeCreate;
    if (obj.visibility) {
      obj.visibility = AjfConditionSerializer.fromJson(obj.visibility);
    }
    obj.conditionalBranches =
        (obj.conditionalBranches || []).map(c => AjfConditionSerializer.fromJson(c));
    // call serializer by nodeType and cast obj with the right interface
    switch (obj.nodeType) {
      case AjfNodeType.AjfField:
        return AjfNodeSerializer._fieldFromJson(
            obj as AjfNodeCreate & Partial<AjfField>,
            choicesOrigins,
            attachmentsOrigins,
        );
      case AjfNodeType.AjfFieldNodeLink:
        return AjfNodeSerializer._fieldNodeLinkFromJson(
            obj as AjfNodeCreate & Partial<AjfFieldNodeLink>);
      case AjfNodeType.AjfNodeGroup:
        return AjfNodeSerializer._nodeGroupFromJson(
            obj as AjfNodeCreate & Partial<AjfNodeGroup>,
            choicesOrigins,
            attachmentsOrigins,
        );
      case AjfNodeType.AjfRepeatingSlide:
        return AjfNodeSerializer._repeatingSlideFromJson(
            obj as AjfNodeCreate & Partial<AjfRepeatingSlide>,
            choicesOrigins,
            attachmentsOrigins,
        );
      case AjfNodeType.AjfSlide:
        return AjfNodeSerializer._slideFromJson(
            obj as AjfNodeCreate & Partial<AjfSlide>,
            choicesOrigins,
            attachmentsOrigins,
        );
    }
    throw new Error(err);
  }

  private static _containerNodeFromJson(
      json: AjfNodeCreate&Partial<AjfContainerNode>,
      choicesOrigins?: AjfChoicesOrigin<any>[],
      attachmentsOrigins?: AjfAttachmentsOrigin<any>[],
      ): AjfContainerNode {
    json.nodes = (json.nodes ||
                  []).map(n => AjfNodeSerializer.fromJson(n, choicesOrigins, attachmentsOrigins));
    return createContainerNode(json);
  }

  private static _fieldFromJson(
      json: AjfNodeCreate&Partial<AjfField>&Partial<{attachmentsOriginRef: string}>,
      choicesOrigins?: AjfChoicesOrigin<any>[],
      attachmentsOrigins?: AjfAttachmentsOrigin<any>[],
      ): AjfField {
    if (json.fieldType == null) {
      throw new Error('Malformed field');
    }
    const obj = json as AjfFieldCreate;
    if (obj.validation) {
      obj.validation = AjfValidationGroupSerializer.fromJson(obj.validation);
    }
    if (obj.warning) {
      obj.warning = AjfWarningGroupSerializer.fromJson(obj.warning);
    }
    if (json.attachmentsOriginRef) {
      obj.attachmentOrigin =
          (attachmentsOrigins || []).find(a => a.name === json.attachmentsOriginRef);
    }
    if (obj.nextSlideCondition) {
      obj.nextSlideCondition = AjfConditionSerializer.fromJson(obj.nextSlideCondition);
    }
    const isCustomFieldWithChoice = obj.fieldType > 100 && componentsMap[obj.fieldType] != null &&
        componentsMap[obj.fieldType].isFieldWithChoice === true;
    if (isCustomFieldWithChoice) {
      return AjfNodeSerializer._fieldWithChoicesFromJson(
          json as AjfFieldCreate & Partial<AjfFieldWithChoices<any>>,
          choicesOrigins,
      );
    }

    switch (obj.fieldType) {
      case AjfFieldType.Formula:
        return AjfNodeSerializer._formulaFieldFromJson(
            json as AjfFieldCreate & Partial<AjfFormulaField>);
      case AjfFieldType.MultipleChoice:
      case AjfFieldType.SingleChoice:
        return AjfNodeSerializer._fieldWithChoicesFromJson(
            json as AjfFieldCreate & Partial<AjfFieldWithChoices<any>>,
            choicesOrigins,
        );
    }
    return createField(obj);
  }

  private static _fieldNodeLinkFromJson(json: AjfNodeCreate&
                                        Partial<AjfFieldNodeLink>): AjfFieldNodeLink {
    return {...createNode(json), nodeType: AjfNodeType.AjfFieldNodeLink};
  }

  private static _fieldWithChoicesFromJson(
      json: AjfFieldCreate&Partial<AjfFieldWithChoices<any>>&Partial<{choicesOriginRef: string}>,
      choicesOrigins?: AjfChoicesOrigin<any>[],
      ): AjfFieldWithChoices<any> {
    const err = 'Malformed field with choices';
    if (json.choicesOriginRef == null) {
      throw new Error(err);
    }
    const choicesOrigin = (choicesOrigins || []).find(c => c.name === json.choicesOriginRef);
    if (choicesOrigin == null) {
      throw new Error(err);
    }
    if (json.choicesFilter) {
      json.choicesFilter = AjfFormulaSerializer.fromJson(json.choicesFilter);
    }
    if (json.triggerConditions) {
      json.triggerConditions = json.triggerConditions.map(t => AjfConditionSerializer.fromJson(t));
    }
    return createFieldWithChoices<any>({...json, choicesOrigin});
  }

  private static _formulaFieldFromJson(json: AjfFieldCreate&
                                       Partial<AjfFormulaField>): AjfFormulaField {
    if (json.formula) {
      json.formula = AjfFormulaSerializer.fromJson(json.formula);
    }
    return {
      ...createField(json),
      fieldType: AjfFieldType.Formula,
    };
  }

  private static _nodeGroupFromJson(
      json: AjfNodeCreate&Partial<AjfNodeGroup>,
      choicesOrigins?: AjfChoicesOrigin<any>[],
      attachmentsOrigins?: AjfAttachmentsOrigin<any>[],
      ): AjfNodeGroup {
    return createNodeGroup({
      ...AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins),
      ...AjfNodeSerializer._repeatingNodeFromJson(json),
    });
  }

  private static _repeatingNodeFromJson(json: AjfNodeCreate&
                                        Partial<AjfRepeatingNode>): AjfRepeatingNode {
    if (json.formulaReps) {
      json.formulaReps = AjfFormulaSerializer.fromJson(json.formulaReps);
    }
    return createRepeatingNode(json);
  }

  private static _repeatingSlideFromJson(
      json: AjfNodeCreate&Partial<AjfRepeatingSlide>,
      choicesOrigins?: AjfChoicesOrigin<any>[],
      attachmentsOrigins?: AjfAttachmentsOrigin<any>[],
      ): AjfRepeatingSlide {
    return createRepeatingSlide({
      ...AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins),
      ...AjfNodeSerializer._repeatingNodeFromJson(json),
    });
  }

  private static _slideFromJson(
      json: AjfNodeCreate&Partial<AjfSlide>,
      choicesOrigins?: AjfChoicesOrigin<any>[],
      attachmentsOrigins?: AjfAttachmentsOrigin<any>[],
      ): AjfSlide {
    return createSlide(
        AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins));
  }
}
