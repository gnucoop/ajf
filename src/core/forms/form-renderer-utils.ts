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

import {tokenize, Token} from 'esprima';

import {AjfCondition, AjfFormula} from '@ajf/core/models';

import {
  AjfField, AjfFieldWithChoices, AjfNode, AjfNodeGroup, AjfRepeatingSlide, AjfSlide, AjfTableField
} from './nodes';
import {
  AjfFieldInstance, AjfTableFieldInstance, AjfFieldWithChoicesInstance, AjfNodeGroupInstance,
  AjfNodeInstance, AjfRepeatingSlideInstance, AjfSlideInstance, IAjfSlideInstance
} from './nodes-instances';
import {AjfValidation, AjfValidationGroup} from './validation';
import {AjfWarning, AjfWarningGroup} from './warning';


export function orderedNodes(nodes: AjfNode[], parent: number | null): AjfNode[] {
  let newNodes: AjfNode[] = [];
  nodes.filter((n: AjfNode) => n.parent == parent)
    .sort((n1: AjfNode, n2: AjfNode) => n1.parentNode - n2.parentNode)
    .forEach((n: AjfNode) => {
      newNodes.push(n);
      newNodes = newNodes.concat(orderedNodes(nodes, n.id));
    });
  return newNodes;
}

export function isRepeatingNode(node: AjfNode): boolean {
  return node != null && (
    node instanceof AjfRepeatingSlide ||
    node instanceof AjfNodeGroup
  );
}

export function isContainerNode(node: AjfNode): boolean {
  return node != null && (
    node instanceof AjfSlide ||
    node instanceof AjfRepeatingSlide ||
    node instanceof AjfNodeGroup
  );
}

export function flattenNodes(nodes: AjfNode[]): AjfNode[] {
  let flatNodes: AjfNode[] = [];
  nodes.forEach((node: AjfNode) => {
    flatNodes.push(node);
    if (
      node instanceof AjfNodeGroup ||
      node instanceof AjfSlide ||
      node instanceof AjfRepeatingSlide
    ) {
      flatNodes = flatNodes.concat(flattenNodes(node.nodes));
    }
  });
  return flatNodes;
}

export function flattenNodesInstances(
  nodes: AjfNodeInstance[], includeGroups = false
): AjfNodeInstance[] {
  let flatNodes: AjfNodeInstance[] = [];
  nodes.forEach((nodeInstance: AjfNodeInstance) => {
    if (nodeInstance instanceof AjfFieldInstance) {
      flatNodes.push(nodeInstance);
    }
    // @TODO missing composed fields
    if (
      nodeInstance instanceof AjfNodeGroupInstance ||
      nodeInstance instanceof AjfSlideInstance ||
      nodeInstance instanceof AjfRepeatingSlideInstance
    ) {
      if (includeGroups) {
        flatNodes.push(nodeInstance);
      }
      flatNodes = flatNodes.concat(flattenNodesInstances(nodeInstance.nodes, includeGroups));
    }
  });
  return flatNodes;
}

export function getAncestorRepeatingNodes(
  allNodes: AjfNode[] | AjfNodeInstance[], node: AjfNode
): AjfNode[] {
  let nodeGroups: AjfNode[] = [];
  let curParent: number | null = node.parent;
  while (curParent != null) {
    node = (<any[]>allNodes).find((n: AjfNode | AjfNodeInstance) => {
      return n instanceof AjfNode ? n.id == curParent : n.node.id == curParent;
    });
    if (node instanceof AjfNodeInstance) {
      node = node.node;
    }
    if (isRepeatingNode(node)) {
      nodeGroups.push(node);
    }
    curParent = node != null ? node.parent : null;
  }
  return nodeGroups;
}

export function getAncestorRepeatingNodesNames(
  allNodes: AjfNode[] | AjfNodeInstance[], node: AjfNode
): {[prop: string]: number} {
  let names: {[prop: string]: number} = {};
  getAncestorRepeatingNodes(allNodes, node)
    .forEach((n, idx) => {
      ((<AjfNodeGroup>n).nodes || [])
        .forEach((sn) => {
          if (sn instanceof AjfField) {
            names[sn.name] = idx;
          }
        });
    });
  return names;
}

export function flattenNodesTree(nodes: AjfNodeInstance[]): IAjfSlideInstance[] {
  let flatTree: IAjfSlideInstance[] = [];
  nodes
    .forEach((nodeInstance: AjfNodeInstance) => {
      if (
        nodeInstance instanceof AjfSlideInstance ||
        nodeInstance instanceof AjfRepeatingSlideInstance
      ) {
        flatTree.push(nodeInstance);
        nodeInstance.flatNodes = flattenNodesInstances(nodeInstance.nodes);
      }
    });
  return flatTree;
}

export function normalizeFormula(
  formula: string, ancestorsNames: {[prop: string]: number}, prefix: number[]
): string {
  const ancestorsNameStrings = Object.keys(ancestorsNames);
  const tokens = tokenize(formula)
    .filter((token: Token) => token.type == 'Identifier' && token.value != '$value')
    .map((token: Token) => token.value);
  tokens.forEach((t) => {
    if (ancestorsNameStrings.indexOf(t) > -1) {
      formula = formula.replace(
        new RegExp(`\\b${t}\\b`, 'g'),
        `${t}__${prefix.slice(ancestorsNames[t]).join('__')}`
      );
    }
  });
  return formula;
}

function getInstanceCondition(
  condition: AjfCondition, ancestorsNames: {[prop: string]: number}, prefix: number[]
): AjfCondition {
  const oldCondition = condition.condition;
  let newCondition = normalizeFormula(oldCondition, ancestorsNames, prefix);
  if (newCondition === oldCondition) {
    return condition;
  }
  return new AjfCondition({condition: newCondition});
}

function getInstanceFormula(
  formula: AjfFormula, ancestorsNames: {[prop: string]: number}, prefix: number[]
): AjfFormula {
  const oldFormula = formula.formula;
  let newFormula = normalizeFormula(oldFormula, ancestorsNames, prefix);
  if (newFormula === oldFormula) {
    return formula;
  }
  return new AjfFormula({formula: newFormula});
}

function getInstanceConditions(
  conditions: AjfCondition[], ancestorsNames: {[prop: string]: number}, prefix: number[]
): AjfCondition[] {
  let changed = false;
  const newConditions = conditions.map((condition) => {
    const newCondition = getInstanceCondition(condition, ancestorsNames, prefix);
    if (newCondition !== condition) {
      changed = true;
    }
    return newCondition;
  });
  return changed ? newConditions : conditions;
}

function getInstanceValidation(
  validation: AjfValidation, ancestorsNames: {[prop: string]: number}, prefix: number[]
): AjfValidation {
  const oldValidation = validation.condition;
  let newValidation = normalizeFormula(oldValidation, ancestorsNames, prefix);
  if (newValidation === oldValidation) {
    return validation;
  }
  return new AjfValidation({condition: newValidation});
}

function getInstanceValidations(
  validations: AjfValidation[], ancestorsNames: {[prop: string]: number}, prefix: number[]
): AjfValidation[] {
  let changed = false;
  const newValidations = validations.map((validation) => {
    const newValidation = getInstanceValidation(validation, ancestorsNames, prefix);
    if (newValidation !== validation) {
      changed = true;
    }
    return newValidation;
  });
  return changed ? newValidations : validations;
}

function getInstanceWarning(
  warning: AjfWarning, ancestorsNames: {[prop: string]: number}, prefix: number[]
): AjfWarning {
  const oldWarning = warning.condition;
  let newWarning = normalizeFormula(oldWarning, ancestorsNames, prefix);
  if (newWarning === oldWarning) {
    return warning;
  }
  return new AjfWarning({condition: newWarning});
}

function getInstanceWarnings(
  warnings: AjfWarning[], ancestorsNames: {[prop: string]: number}, prefix: number[]
): AjfWarning[] {
  let changed = false;
  const newWarnings = warnings.map((warning) => {
    const newWarning = getInstanceWarning(warning, ancestorsNames, prefix);
    if (newWarning !== warning) {
      changed = true;
    }
    return newWarning;
  });
  return changed ? newWarnings : warnings;
}

export function nodeToNodeInstance(
  allNodes: AjfNode[] | AjfNodeInstance[], node: AjfNode, prefix: number[], context: any
): AjfNodeInstance | null {
  let instance: AjfNodeInstance | null = null;
  if (node instanceof AjfFieldWithChoices) {
    instance = new AjfFieldWithChoicesInstance({node: node, prefix: prefix}, context);
  } else if (node instanceof AjfTableField) {
    instance = new AjfTableFieldInstance({node: node, prefix: prefix}, context);
  } else if (node instanceof AjfField) {
    instance = new AjfFieldInstance({node: node, prefix: prefix}, context);
  } else if (node instanceof AjfNodeGroup) {
    instance = new AjfNodeGroupInstance({node: node, prefix: prefix}, context);
  } else if (node instanceof AjfRepeatingSlide) {
    instance = new AjfRepeatingSlideInstance({node: node, prefix: prefix}, context);
  } else if (node instanceof AjfSlide) {
    instance = new AjfSlideInstance({node: node, prefix: prefix}, context);
  }
  if (instance != null) {
    const hasPrefix = prefix != null && prefix.length > 0;
    if (hasPrefix) {
      const ancestorsNames = getAncestorRepeatingNodesNames(allNodes, node);

      if (node.visibility != null) {
        const oldVisibility = node.visibility.condition;
        const newVisibility = normalizeFormula(oldVisibility, ancestorsNames, prefix);
        instance.visibility = newVisibility !== oldVisibility ? new AjfCondition({
          condition: newVisibility
        }) : node.visibility;
      }

      instance.conditionalBranches = getInstanceConditions(
        instance.node.conditionalBranches, ancestorsNames, prefix
      );

      if (
          instance instanceof AjfNodeGroupInstance || instance instanceof AjfRepeatingSlideInstance
        ) {
        const formulaReps = instance instanceof AjfNodeGroupInstance ?
          instance.nodeGroup.formulaReps :
          instance.slide.formulaReps;
        if (formulaReps != null) {
          const oldFormula = formulaReps.formula;
          let newFormula = normalizeFormula(oldFormula, ancestorsNames, prefix);
          instance.formulaReps = newFormula !== oldFormula ?
            new AjfFormula({formula: newFormula}) : formulaReps;
        }
      } else if (instance instanceof AjfFieldInstance) {
        if (instance.field.formula != null) {
          instance.formula = getInstanceFormula(instance.field.formula, ancestorsNames, prefix);
        }

        if (instance.field.validation != null) {
          const newConditions = getInstanceValidations(
            instance.field.validation.conditions, ancestorsNames, prefix
          );
          if (newConditions !== instance.field.validation.conditions) {
            instance.validation = new AjfValidationGroup(instance.field.validation);
            instance.validation.conditions = newConditions;
          } else {
            instance.validation = instance.field.validation;
          }
        }

        if (instance.field.warning != null) {
          const newWarnings = getInstanceWarnings(
            instance.field.warning.conditions, ancestorsNames, prefix
          );
          if (newWarnings !== instance.field.warning.conditions) {
            instance.warning = new AjfWarningGroup(instance.field.warning);
            instance.warning.conditions = newWarnings;
          } else {
            instance.warning = instance.field.warning;
          }
        }

        if (instance.field.nextSlideCondition != null) {
          instance.nextSlideCondition = getInstanceCondition(
            instance.field.nextSlideCondition, ancestorsNames, prefix
          );
        }

        if (instance instanceof AjfFieldWithChoicesInstance) {
          if (instance.field.choicesFilter != null) {
            instance.choicesFilter = getInstanceFormula(
              instance.field.choicesFilter, ancestorsNames, prefix
            );
          }
          if (instance.field.triggerConditions != null) {
            instance.triggerConditions = getInstanceConditions(
              instance.field.triggerConditions, ancestorsNames, prefix
            );
          }
        }
      }
    } else {
      instance.visibility = instance.node.visibility;
      instance.conditionalBranches = instance.node.conditionalBranches;
      if (
        instance instanceof AjfNodeGroupInstance || instance instanceof AjfRepeatingSlideInstance
      ) {
        instance.formulaReps = (instance instanceof AjfNodeGroupInstance ?
          instance.nodeGroup : instance.slide).formulaReps;
      } else if (instance instanceof AjfFieldInstance) {
        instance.formula = instance.field.formula;
        instance.validation = instance.field.validation;
        instance.warning = instance.field.warning;
        instance.nextSlideCondition = instance.field.nextSlideCondition;
        if (instance instanceof AjfFieldWithChoicesInstance) {
          instance.choicesFilter = instance.field.choicesFilter;
          instance.triggerConditions = instance.field.triggerConditions;
        }
      }
    }
  }
  return instance;
}

export function findNodeInstanceInTree(
  nodes: AjfNodeInstance[], node: AjfNodeInstance
): {container: AjfNodeInstance[], index: number} {
  const index = nodes.indexOf(node);
  if (index > -1) {
    return {container: nodes, index: index};
  }
  const groups = nodes.filter(n => isContainerNodeInstance(n));
  let i = 0;
  const len = groups.length;
  while (i < len) {
    const res = findNodeInstanceInTree((<any>groups[i]).node.nodes, node);
    if (res.index > -1) {
      return res;
    }
    i++;
  }
  return {
    container: [],
    index: -1
  };
}

export function flattenNodeInstances(nodes: AjfNodeInstance[] = []): AjfNodeInstance[] {
  let flatNodes: AjfNodeInstance[] = [];
  nodes.forEach((nodeInstance: AjfNodeInstance) => {
    flatNodes.push(nodeInstance);
    if (
      nodeInstance instanceof AjfNodeGroupInstance ||
      nodeInstance instanceof AjfSlideInstance ||
      nodeInstance instanceof AjfRepeatingSlideInstance
    ) {
      flatNodes = flatNodes.concat(flattenNodeInstances(nodeInstance.nodes));
    }
  });
  return flatNodes;
}

export function isContainerNodeInstance(node: AjfNodeInstance): boolean {
  return node != null && (
    node instanceof AjfSlideInstance ||
    node instanceof AjfRepeatingSlideInstance ||
    node instanceof AjfNodeGroupInstance
  );
}
