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

import {
  AjfContext,
  alwaysCondition,
  createCondition,
  createFormula,
  normalizeExpression
} from '@ajf/core/models';

import {AjfFieldInstance} from '../../interface/fields-instances/field-instance';
import {
  AjfFieldWithChoicesInstance
} from '../../interface/fields-instances/field-with-choices-instance';
import {AjfField} from '../../interface/fields/field';
import {AjfFieldType} from '../../interface/fields/field-type';
import {AjfFieldWithChoices} from '../../interface/fields/field-with-choices';
import {AjfTableField} from '../../interface/fields/table-field';
import {AjfNodeGroupInstance} from '../../interface/nodes-instances/node-group-instance';
import {AjfNodeInstance} from '../../interface/nodes-instances/node-instance';
import {
  AjfRepeatingContainerNodeInstance
} from '../../interface/nodes-instances/repeating-container-node-instance';
import {AjfNode} from '../../interface/nodes/node';
import {AjfNodeGroup} from '../../interface/nodes/node-group';
import {AjfNodeType} from '../../interface/nodes/node-type';
import {AjfRepeatingSlideInstance} from '../../interface/slides-instances/repeating-slide-instance';
import {AjfRepeatingSlide} from '../../interface/slides/repeating-slide';
import {AjfSlide} from '../../interface/slides/slide';
import {createFieldInstance} from '../fields-instances/create-field-instance';
import {
  createFieldWithChoicesInstance
} from '../fields-instances/create-field-with-choices-instance';
import {createTableFieldInstance} from '../fields-instances/create-table-field-instance';
import {isFieldWithChoicesInstance} from '../fields-instances/is-field-with-choices-instance';
import {componentsMap} from '../fields/fields-map';
import {isFieldWithChoices} from '../fields/is-field-with-choices';
import {createNodeGroupInstance} from '../nodes-instances/create-node-group-instance';
import {createRepeatingSlideInstance} from '../slides-instances/create-repeating-slide-instance';
import {createSlideInstance} from '../slides-instances/create-slide-instance';
import {createValidationGroup} from '../validation/create-validation-group';
import {createWarningGroup} from '../warning/create-warning-group';

import {getAncestorRepeatingNodesNames} from './get-ancestor-repeating-nodes-names';
import {getInstanceCondition} from './get-instance-condition';
import {getInstanceConditions} from './get-instance-conditions';
import {getInstanceFormula} from './get-instance-formula';
import {getInstanceValidations} from './get-instance-validations';
import {getInstanceWarnings} from './get-instance-warnings';
import {isFieldInstance} from './is-field-instance';
import {isNodeGroupInstance} from './is-node-group-instance';
import {isRepeatingSlideInstance} from './is-repeating-slide-instance';
/**
 * It creates a nodeInstance relative to a node.
 * To create the instance it calls relative create builder by nodeType.
 * If the prefix is ​​defined all formulas and conditions are calculated based on it.
 */
export function nodeToNodeInstance(
    allNodes: AjfNode[]|AjfNodeInstance[], node: AjfNode, prefix: number[],
    context: AjfContext): AjfNodeInstance|null {
  let instance: AjfNodeInstance|null = null;
  const nodeType = node.nodeType;
  switch (nodeType) {
    case AjfNodeType.AjfField:
      const field = node as AjfField;
      if (field.fieldType > 100) {
        if (componentsMap[field.fieldType] != null &&
            componentsMap[field.fieldType].createInstance != null) {
          instance = componentsMap[field.fieldType].createInstance!
                     ({node: node as AjfField, prefix}, context);
        } else {
          instance = createFieldInstance({node: node as AjfField, prefix}, context);
        }
      } else {
        switch (field.fieldType) {
          case AjfFieldType.SingleChoice:
          case AjfFieldType.MultipleChoice:
            instance = createFieldWithChoicesInstance(
                {node: node as AjfFieldWithChoices<any>, prefix}, context);
            break;
          case AjfFieldType.Table:
            instance = createTableFieldInstance({node: node as AjfTableField, prefix}, context);
            break;
          default:
            instance = createFieldInstance({node: node as AjfField, prefix}, context);
            break;
        }
      }
      break;
    case AjfNodeType.AjfNodeGroup:
      instance = createNodeGroupInstance({node: node as AjfNodeGroup, prefix});
      break;
    case AjfNodeType.AjfRepeatingSlide:
      instance = createRepeatingSlideInstance({node: node as AjfRepeatingSlide, prefix});
      break;
    case AjfNodeType.AjfSlide:
      instance = createSlideInstance({node: node as AjfSlide, prefix});
      break;
  }
  if (instance != null) {
    const hasPrefix = prefix != null && prefix.length > 0;
    if (hasPrefix) {
      const ancestorsNames = getAncestorRepeatingNodesNames(allNodes, node);

      if (node.visibility != null) {
        const oldVisibility = node.visibility.condition;
        const newVisibility = normalizeExpression(oldVisibility, ancestorsNames, prefix);
        instance.visibility = newVisibility !== oldVisibility ?
            createCondition({condition: newVisibility}) :
            node.visibility;
      }

      const conditionalBranches = instance.node.conditionalBranches != null &&
              instance.node.conditionalBranches.length > 0 ?
          instance.node.conditionalBranches :
          [alwaysCondition()];
      instance.conditionalBranches =
          getInstanceConditions(conditionalBranches, ancestorsNames, prefix);

      if (nodeType === AjfNodeType.AjfNodeGroup || nodeType === AjfNodeType.AjfRepeatingSlide) {
        const ngInstance = instance as AjfNodeGroupInstance | AjfRepeatingSlideInstance;
        const formulaReps = ngInstance.node.formulaReps;
        if (formulaReps != null) {
          const oldFormula = formulaReps.formula;
          let newFormula = normalizeExpression(oldFormula, ancestorsNames, prefix);
          ngInstance.formulaReps =
              newFormula !== oldFormula ? createFormula({formula: newFormula}) : formulaReps;
        }
      } else if (nodeType === AjfNodeType.AjfField) {
        const fInstance = instance as AjfFieldInstance;
        const fNode = fInstance.node;

        if (fNode.formula) {
          fInstance.formula = getInstanceFormula(fNode.formula, ancestorsNames, prefix);
        }

        if (fNode.validation != null) {
          const newConditions =
              getInstanceValidations(fNode.validation.conditions, ancestorsNames, prefix);
          if (newConditions !== fNode.validation.conditions) {
            fInstance.validation = createValidationGroup(fNode.validation);
            fInstance.validation.conditions = newConditions;
          } else {
            fInstance.validation = fNode.validation;
          }
        }

        if (fNode.warning != null) {
          const newWarnings = getInstanceWarnings(fNode.warning.conditions, ancestorsNames, prefix);
          if (newWarnings !== fNode.warning.conditions) {
            fInstance.warning = createWarningGroup(fNode.warning);
            fInstance.warning.conditions = newWarnings;
          } else {
            fInstance.warning = fNode.warning;
          }
        }

        if (fNode.nextSlideCondition != null) {
          fInstance.nextSlideCondition =
              getInstanceCondition(fNode.nextSlideCondition, ancestorsNames, prefix);
        }

        if (isFieldWithChoices(fNode)) {
          const fwcInstance = instance as AjfFieldWithChoicesInstance<any>;
          const fwcNode = fwcInstance.node;
          if (fwcNode.choicesFilter != null) {
            fwcInstance.choicesFilter =
                getInstanceFormula(fwcNode.choicesFilter, ancestorsNames, prefix);
          }
          if (fwcNode.triggerConditions != null) {
            fwcInstance.triggerConditions =
                getInstanceConditions(fwcNode.triggerConditions, ancestorsNames, prefix);
          }
        }
      }
    } else {
      instance.visibility = instance.node.visibility;
      const conditionalBranches = instance.node.conditionalBranches != null &&
              instance.node.conditionalBranches.length > 0 ?
          instance.node.conditionalBranches :
          [alwaysCondition()];
      instance.conditionalBranches = conditionalBranches;
      if (isNodeGroupInstance(instance) || isRepeatingSlideInstance(instance)) {
        const rgInstance = instance as AjfRepeatingContainerNodeInstance;
        rgInstance.formulaReps = rgInstance.node.formulaReps;
      } else if (isFieldInstance(instance)) {
        const fInstance = instance as AjfFieldInstance;
        fInstance.validation = fInstance.node.validation;
        fInstance.warning = fInstance.node.warning;
        fInstance.nextSlideCondition = fInstance.node.nextSlideCondition;
        if (isFieldWithChoicesInstance(instance)) {
          const fwcInstance = instance as AjfFieldWithChoicesInstance<any>;
          fwcInstance.choicesFilter = fwcInstance.node.choicesFilter;
          fwcInstance.triggerConditions = fwcInstance.node.triggerConditions;
        }
        fInstance.formula = fInstance.node.formula;
      }
    }
  }
  return instance;
}
