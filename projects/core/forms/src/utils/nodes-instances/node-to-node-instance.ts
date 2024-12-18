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
  normalizeExpression,
} from '@ajf/core/models';

import {AjfFileSizeLimit} from '@ajf/core/file-input';
import {AjfField} from '../../interface/fields/field';
import {AjfFieldType} from '../../interface/fields/field-type';
import {AjfNodeInstance} from '../../interface/nodes-instances/node-instance';
import {AjfRepeatingContainerNodeInstance} from '../../interface/nodes-instances/repeating-container-node-instance';
import {AjfNode} from '../../interface/nodes/node';
import {AjfNodeGroup} from '../../interface/nodes/node-group';
import {AjfNodeType} from '../../interface/nodes/node-type';
import {AjfRepeatingSlide} from '../../interface/slides/repeating-slide';
import {AjfSlide} from '../../interface/slides/slide';
import {createFieldInstance} from '../fields-instances/create-field-instance';
import {createFieldWithChoicesInstance} from '../fields-instances/create-field-with-choices-instance';
import {createTableFieldInstance} from '../fields-instances/create-table-field-instance';
import {isFieldWithChoicesInstance} from '../fields-instances/is-field-with-choices-instance';
import {componentsMap} from '../fields/fields-map';
import {createNodeGroupInstance} from '../nodes-instances/create-node-group-instance';
import {createRepeatingSlideInstance} from '../slides-instances/create-repeating-slide-instance';
import {createSlideInstance} from '../slides-instances/create-slide-instance';
import {createValidationGroup} from '../validation/create-validation-group';
import {createWarningGroup} from '../warning/create-warning-group';

import {getAncestorRepeatingNodesNames} from './get-ancestor-repeating-nodes-names';
import {getContainerNode} from './get-container-node';
import {getInstanceCondition} from './get-instance-condition';
import {getInstanceConditions} from './get-instance-conditions';
import {getInstanceFormula} from './get-instance-formula';
import {getInstanceValidations} from './get-instance-validations';
import {getInstanceWarnings} from './get-instance-warnings';
import {isFieldInstance} from './is-field-instance';
import {isNodeGroupInstance} from './is-node-group-instance';
import {isRepeatingSlideInstance} from './is-repeating-slide-instance';
import {isSlideInstance} from './is-slide-instance';

/**
 * It creates a nodeInstance relative to a node.
 * To create the instance it calls relative create builder by nodeType.
 * If the prefix is ​​defined all formulas and conditions are calculated based on it.
 */
export function nodeToNodeInstance(
  allNodes: AjfNode[] | AjfNodeInstance[],
  node: AjfNode,
  prefix: number[],
  context: AjfContext,
): AjfNodeInstance | null {
  let instance: AjfNodeInstance | null = null;
  const nodeType = node.nodeType;
  switch (nodeType) {
    case AjfNodeType.AjfField:
      const field = node as AjfField;
      if (field.fieldType > 100) {
        if (
          componentsMap[field.fieldType] != null &&
          componentsMap[field.fieldType].createInstance != null
        ) {
          instance = componentsMap[field.fieldType].createInstance!({node: field, prefix}, context);
        } else {
          instance = createFieldInstance({node: field, prefix}, context);
        }
      } else {
        const containerNode = getContainerNode(allNodes, node);
        switch (field.fieldType) {
          case AjfFieldType.SingleChoice:
          case AjfFieldType.MultipleChoice:
            instance = createFieldWithChoicesInstance({node: field, prefix}, context);
            break;
          case AjfFieldType.Table:
            instance = createTableFieldInstance({node: field, prefix}, context);
            break;
          case AjfFieldType.File:
            // Set the default size limit condition for file input fields.
            // Added in validation conditions only if no size limit condition is found.
            const limitSizeCondition = field.validation?.conditions.find(
              cond => cond.condition.indexOf('.size <') || cond.condition.indexOf('.size<'),
            );
            if (!field.validation) {
              field.validation = {conditions: []};
            }
            if (!field.validation.conditions) {
              field.validation.conditions = [];
            }
            if (!limitSizeCondition) {
              field.validation.conditions.push({
                'condition': `${field.name} == null || ${field.name}.size < ${AjfFileSizeLimit}`,
                'clientValidation': true,
                'errorMessage': `The file exceeds the ${(AjfFileSizeLimit / 1024 ** 2).toFixed(
                  0,
                )} MB limit`,
              });
            }
            instance = createFieldInstance({node: field, prefix}, context, containerNode);
            break;
          default:
            instance = createFieldInstance({node: field, prefix}, context, containerNode);
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
        instance.visibility =
          newVisibility !== oldVisibility
            ? createCondition({condition: newVisibility})
            : node.visibility;
      }

      const conditionalBranches =
        instance.node.conditionalBranches != null && instance.node.conditionalBranches.length > 0
          ? instance.node.conditionalBranches
          : [alwaysCondition()];
      instance.conditionalBranches = getInstanceConditions(
        conditionalBranches,
        ancestorsNames,
        prefix,
      );

      if (isNodeGroupInstance(instance) || isRepeatingSlideInstance(instance)) {
        const formulaReps = instance.node.formulaReps;
        if (formulaReps != null) {
          const oldFormula = formulaReps.formula;
          let newFormula = normalizeExpression(oldFormula, ancestorsNames, prefix);
          instance.formulaReps =
            newFormula !== oldFormula ? createFormula({formula: newFormula}) : formulaReps;
        }
      } else if (isFieldInstance(instance)) {
        instance.readonly = instance.node.readonly;

        if (instance.node.formula) {
          instance.formula = getInstanceFormula(instance.node.formula, ancestorsNames, prefix);
        }

        if (instance.node.validation != null) {
          const newConditions = getInstanceValidations(
            instance.node.validation.conditions,
            ancestorsNames,
            prefix,
          );
          if (newConditions !== instance.node.validation.conditions) {
            instance.validation = createValidationGroup(instance.node.validation);
            instance.validation.conditions = newConditions;
          } else {
            instance.validation = instance.node.validation;
          }
        }

        if (instance.node.warning != null) {
          const newWarnings = getInstanceWarnings(
            instance.node.warning.conditions,
            ancestorsNames,
            prefix,
          );
          if (newWarnings !== instance.node.warning.conditions) {
            instance.warning = createWarningGroup(instance.node.warning);
            instance.warning.conditions = newWarnings;
          } else {
            instance.warning = instance.node.warning;
          }
        }

        if (instance.node.nextSlideCondition != null) {
          instance.nextSlideCondition = getInstanceCondition(
            instance.node.nextSlideCondition,
            ancestorsNames,
            prefix,
          );
        }

        if (isFieldWithChoicesInstance(instance)) {
          if (instance.node.choicesFilter != null) {
            instance.choicesFilter = getInstanceFormula(
              instance.node.choicesFilter,
              ancestorsNames,
              prefix,
            );
          }
          if (instance.node.triggerConditions != null) {
            instance.triggerConditions = getInstanceConditions(
              instance.node.triggerConditions,
              ancestorsNames,
              prefix,
            );
          }
        }
      }
    } else {
      instance.visibility = instance.node.visibility;
      if (isSlideInstance(instance) || isFieldInstance(instance)) {
        instance.readonly = instance.node.readonly;
      }
      const conditionalBranches =
        instance.node.conditionalBranches != null && instance.node.conditionalBranches.length > 0
          ? instance.node.conditionalBranches
          : [alwaysCondition()];
      instance.conditionalBranches = conditionalBranches;
      if (isNodeGroupInstance(instance) || isRepeatingSlideInstance(instance)) {
        const rgInstance = instance as AjfRepeatingContainerNodeInstance;
        rgInstance.formulaReps = rgInstance.node.formulaReps;
      } else if (isFieldInstance(instance)) {
        instance.validation = instance.node.validation;
        instance.warning = instance.node.warning;
        instance.nextSlideCondition = instance.node.nextSlideCondition;
        if (isFieldWithChoicesInstance(instance)) {
          instance.choicesFilter = instance.node.choicesFilter;
          instance.triggerConditions = instance.node.triggerConditions;
        }
        instance.formula = instance.node.formula;
      }
    }
  }
  return instance;
}
