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
  AjfAttachmentsOrigin,
  AjfChoicesOrigin,
  AjfField,
  AjfFieldType,
  AjfFieldWithChoices,
  AjfForm,
  AjfFormStringIdentifier,
  AjfNode,
  AjfNodeGroup,
  AjfNodesOperation,
  AjfNodeType,
  AjfRepeatingContainerNode,
  AjfRepeatingSlide,
  AjfSlide,
  createChoicesFixedOrigin,
  createContainerNode,
  createField,
  createForm,
  createValidation,
  createValidationGroup,
  createWarning,
  createWarningGroup,
  isChoicesFixedOrigin,
  isContainerNode,
  isField,
  isFieldWithChoices,
  isRepeatingContainerNode,
  isSlidesNode,
  maxDigitsValidation,
  maxValidation,
  minDigitsValidation,
  minValidation,
  notEmptyValidation,
  notEmptyWarning
} from '@ajf/core/forms';
import {AjfCondition, alwaysCondition, createCondition, createFormula} from '@ajf/core/models';
import {deepCopy} from '@ajf/core/utils';
import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {filter, map, publishReplay, refCount, scan, withLatestFrom} from 'rxjs/operators';

import {
  AjfAttachmentsOriginsOperation,
  AjfChoicesOriginsOperation,
  AjfFormStringIdentifierOperation
} from './operations';


export interface AjfFormBuilderNodeTypeEntry {
  label: string;
  icon: {fontSet: string, fontIcon: string};
  nodeType: {
    node: AjfNodeType;
    field?: AjfFieldType,
  };
  isSlide?: boolean;
}


export interface AjfFormBuilderNodeEntry {
  node: AjfNode;
  container: AjfContainerNode|null;
  children: AjfFormBuilderNodeEntry[];
  content: AjfFormBuilderNodeEntry[];
}


export interface AjfFormBuilderEmptySlot {
  parent: AjfNode;
  parentNode: number;
}


export type AjfFormBuilderNode = AjfFormBuilderNodeEntry|AjfFormBuilderEmptySlot;
export type AjfContainerNode = AjfSlide|AjfRepeatingSlide|AjfNodeGroup;

function getNodeContainer(c: {nodes: AjfNode[]}, node: AjfNode): {nodes: AjfNode[]}|null {
  if (c.nodes.indexOf(node) > -1) {
    return c;
  }
  const cns = c.nodes.filter(n => isContainerNode(n));
  const len = cns.length;
  for (let i = 0; i < len; i++) {
    const cn = getNodeContainer(<AjfContainerNode>cns[i], node);
    if (cn != null) {
      return cn;
    }
  }
  return null;
}

function buildFormBuilderNodesSubtree(
    nodes: AjfNode[], parent: AjfNode, ignoreConditionalBranches = false): AjfFormBuilderNode[] {
  const entries: AjfFormBuilderNode[] = nodes.filter(n => n.parent === parent.id)
                                            .sort((n1, n2) => n1.parentNode - n2.parentNode)
                                            .map(n => {
                                              const children =
                                                  buildFormBuilderNodesSubtree(nodes, n);
                                              if (children.length === 0) {
                                                children.push({parent: n, parentNode: 0});
                                              }
                                              return <AjfFormBuilderNodeEntry>{
                                                node: n,
                                                children,
                                                content: buildFormBuilderNodesContent(nodes, n)
                                              };
                                            });
  if (!ignoreConditionalBranches) {
    const entriesNum = entries.length;
    const cbs = parent.conditionalBranches.length;
    for (let i = entriesNum; i < cbs; i++) {
      entries.push({parent: parent, parentNode: i});
    }
  }
  return entries;
}

function buildFormBuilderNodesContent(_nodes: AjfNode[], node: AjfNode): AjfFormBuilderNode[] {
  if (isContainerNode(node)) {
    return buildFormBuilderNodesSubtree((<AjfContainerNode>node).nodes, node, true);
  }
  return [];
}


function buildFormBuilderNodesTree(nodes: AjfNode[]): (AjfFormBuilderNode|null)[] {
  const rootNodes = nodes.filter(n => n.parent == null || n.parent === 0);
  if (rootNodes.length === 1) {
    const rootNode = rootNodes[0];
    if (isSlidesNode(rootNode)) {
      const tree: AjfFormBuilderNode[] = [];
      tree.push(<AjfFormBuilderNodeEntry>{
        node: rootNode,
        container: null,
        children: buildFormBuilderNodesSubtree(nodes, rootNode),
        content: buildFormBuilderNodesContent(nodes, rootNode)
      });
      return tree;
    }
  } else if (rootNodes.length === 0) {
    return [null];
  }
  throw new Error('Invalid form definition');
}

export function flattenNodes(nodes: AjfNode[]): AjfNode[] {
  let flatNodes: AjfNode[] = [];

  nodes.forEach((node: AjfNode) => {
    if (isContainerNode(node)) {
      flatNodes = flatNodes.concat(flattenNodes((<AjfContainerNode>node).nodes));
    }
    flatNodes.push(node);
  });

  return flatNodes;
}

function getDescendants(
    flatNodes: AjfNode[], parentNode: AjfNode, branch: number|null = null): AjfNode[] {
  return branch != null ?
      flatNodes.filter(n => n.parent === parentNode.id && n.parentNode === branch) :
      flatNodes.filter(n => n.parent === parentNode.id);
}

function removeNodes(nodes: AjfNode[], ids: number[]): AjfNode[] {
  const len = nodes.length;
  for (let i = 0; i < len; i++) {
    const node = nodes[i];
    if (isContainerNode(node)) {
      const container = (<AjfContainerNode>node);
      container.nodes = removeNodes(container.nodes, ids);
    }
  }
  return nodes.filter(n => ids.indexOf(n.id) === -1);
}

function deleteNodeSubtree(
    nodes: AjfNode[], parentNode: AjfNode, branch: number|null = null): AjfNode[] {
  const flatNodes = flattenNodes(nodes);
  let delNodes: AjfNode[] = [];
  let descendants = getDescendants(flatNodes, parentNode, branch);
  const len = descendants.length;
  for (let i = 0; i < len; i++) {
    delNodes = delNodes.concat(getDescendants(flatNodes, descendants[i]));
  }
  delNodes = delNodes.concat(descendants);
  return removeNodes(nodes, delNodes.map(n => n.id));
}

let nodeUniqueId = 0;


@Injectable()
export class AjfFormBuilderService {
  private _availableNodeTypes: AjfFormBuilderNodeTypeEntry[] = [
    {
      label: 'Slide',
      icon: {fontSet: 'ajf-icon', fontIcon: 'field-slide'},
      nodeType: {node: AjfNodeType.AjfSlide},
      isSlide: true
    },
    {
      label: 'Repeating slide',
      icon: {fontSet: 'ajf-icon', fontIcon: 'field-repeatingslide'},
      nodeType: {node: AjfNodeType.AjfRepeatingSlide},
      isSlide: true
    },
    {
      label: 'String',
      icon: {fontSet: 'ajf-icon', fontIcon: 'field-string'},
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.String}
    },
    {
      label: 'Text',
      icon: {fontSet: 'ajf-icon', fontIcon: 'field-text'},
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.Text}
    },
    {
      label: 'Number',
      icon: {fontSet: 'ajf-icon', fontIcon: 'field-number'},
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.Number}
    },
    {
      label: 'Boolean',
      icon: {fontSet: 'ajf-icon', fontIcon: 'field-boolean'},
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.Boolean}
    },
    {
      label: 'Single choice',
      icon: {fontSet: 'ajf-icon', fontIcon: 'field-singlechoice'},
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.SingleChoice}
    },
    {
      label: 'Multiple choice',
      icon: {fontSet: 'ajf-icon', fontIcon: 'field-multiplechoice'},
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.MultipleChoice}
    },
    {
      label: 'Formula',
      icon: {fontSet: 'ajf-icon', fontIcon: 'field-formula'},
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.Formula}
    },
    {
      label: 'Date',
      icon: {fontSet: 'ajf-icon', fontIcon: 'field-date'},
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.Date}
    },
    {
      label: 'Date input',
      icon: {fontSet: 'ajf-icon', fontIcon: 'field-dateinput'},
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.DateInput}
    },
    {
      label: 'Time',
      icon: {fontSet: 'ajf-icon', fontIcon: 'field-time'},
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.Time}
    },
    {
      label: 'Table',
      icon: {fontSet: 'ajf-icon', fontIcon: 'field-table'},
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.Table}
    }
  ];
  /**
   * Available node types
   *
   * @readonly
   * @memberOf AjfFormBuilderService
   */
  get availableNodeTypes(): AjfFormBuilderNodeTypeEntry[] {
    return this._availableNodeTypes;
  }

  private _form: BehaviorSubject<AjfForm|null> = new BehaviorSubject<AjfForm|null>(null);
  private _formObs: Observable<AjfForm|null> = this._form as Observable<AjfForm|null>;
  /**
   * Current edited form stream
   *
   * @readonly
   * @memberOf AjfFormBuilderService
   */
  get form(): Observable<AjfForm|null> {
    return this._formObs;
  }

  private _attachmentsOrigins: Observable<AjfAttachmentsOrigin<any>[]>;
  get attachmentsOrigins(): Observable<AjfAttachmentsOrigin<any>[]> {
    return this._attachmentsOrigins;
  }

  private _choicesOrigins: Observable<AjfChoicesOrigin<any>[]>;
  get choicesOrigins(): Observable<AjfChoicesOrigin<any>[]> {
    return this._choicesOrigins;
  }

  private _stringIdentifier: Observable<AjfFormStringIdentifier[]>;
  get stringIdentifier(): Observable<AjfFormStringIdentifier[]> {
    return this._stringIdentifier;
  }

  private _nodes: Observable<AjfNode[]>;
  get nodes(): Observable<AjfNode[]> {
    return this._nodes;
  }

  private _flatNodes: Observable<AjfNode[]>;
  get flatNodes(): Observable<AjfNode[]> {
    return this._flatNodes;
  }

  private _flatFields: Observable<AjfField[]>;
  get flatFields(): Observable<AjfField[]> {
    return this._flatFields;
  }

  private _nodeEntriesTree: Observable<AjfFormBuilderNodeEntry[]>;
  get nodeEntriesTree(): Observable<AjfFormBuilderNodeEntry[]> {
    return this._nodeEntriesTree;
  }

  private _editedNodeEntry: BehaviorSubject<AjfFormBuilderNodeEntry|null> =
      new BehaviorSubject<AjfFormBuilderNodeEntry|null>(null);
  private _editedNodeEntryObs: Observable<AjfFormBuilderNodeEntry|null> =
      this._editedNodeEntry as Observable<AjfFormBuilderNodeEntry|null>;
  get editedNodeEntry(): Observable<AjfFormBuilderNodeEntry|null> {
    return this._editedNodeEntryObs;
  }

  private _editedCondition: BehaviorSubject<AjfCondition|null> =
      new BehaviorSubject<AjfCondition|null>(null);
  private _editedConditionObs: Observable<AjfCondition|null> =
      this._editedCondition as Observable<AjfCondition|null>;
  get editedCondition(): Observable<AjfCondition|null> {
    return this._editedConditionObs;
  }

  private _editedChoicesOrigin: BehaviorSubject<AjfChoicesOrigin<any>|null> =
      new BehaviorSubject<AjfChoicesOrigin<any>|null>(null);
  private _editedChoicesOriginObs: Observable<AjfChoicesOrigin<any>|null> =
      this._editedChoicesOrigin as Observable<AjfChoicesOrigin<any>|null>;
  get editedChoicesOrigin(): Observable<AjfChoicesOrigin<any>|null> {
    return this._editedChoicesOriginObs;
  }

  private _beforeNodesUpdate: EventEmitter<void> = new EventEmitter<void>();
  private _beforeNodesUpdateObs: Observable<void> = this._beforeNodesUpdate as Observable<void>;
  get beforeNodesUpdate(): Observable<void> {
    return this._beforeNodesUpdateObs;
  }
  private _afterNodeUpdate: EventEmitter<void> = new EventEmitter<void>();
  private _afterNodeUpdateObs: Observable<void> = this._afterNodeUpdate as Observable<void>;
  get afterNodeUpdate(): Observable<void> {
    return this._afterNodeUpdateObs;
  }

  private _nodesUpdates: Subject<AjfNodesOperation> = new Subject<AjfNodesOperation>();
  private _attachmentsOriginsUpdates: Subject<AjfAttachmentsOriginsOperation> =
      new Subject<AjfAttachmentsOriginsOperation>();
  private _choicesOriginsUpdates: Subject<AjfChoicesOriginsOperation> =
      new Subject<AjfChoicesOriginsOperation>();
  private _stringIdentifierUpdates: Subject<AjfFormStringIdentifierOperation> =
      new Subject<AjfFormStringIdentifierOperation>();

  private _saveNodeEntryEvent: EventEmitter<any> = new EventEmitter<any>();
  private _deleteNodeEntryEvent: EventEmitter<AjfFormBuilderNodeEntry> =
      new EventEmitter<AjfFormBuilderNodeEntry>();

  constructor() {
    this._initChoicesOriginsStreams();
    this._initAttachmentsOriginsStreams();
    this._initStringIdentifierStreams();
    this._initNodesStreams();
    this._initFormStreams();
    this._initSaveNode();
    this._initDeleteNode();
  }

  /**
   * Sets the current edited form
   *
   * @param form
   *
   * @memberOf AjfFormBuilderService
   */
  setForm(form: AjfForm|null): void {
    if (form !== this._form.getValue()) {
      this._form.next(form);
    }
  }

  editNodeEntry(nodeEntry: AjfFormBuilderNodeEntry): void {
    this._editedNodeEntry.next(nodeEntry);
  }

  editCondition(condition: AjfCondition): void {
    this._editedCondition.next(condition);
  }

  saveCurrentCondition(condition: string): void {
    let c = this._editedCondition.getValue();
    if (c == null) {
      return;
    }
    c.condition = condition;
    this._editedCondition.next(null);
  }

  cancelConditionEdit(): void {
    this._editedChoicesOrigin.next(null);
  }

  insertNode(
      nodeType: AjfFormBuilderNodeTypeEntry, parent: AjfNode, parentNode: number,
      inContent = false): void {
    let node: AjfNode|AjfField;
    const id = ++nodeUniqueId;
    const isFieldNode = nodeType.nodeType.field != null;
    if (isFieldNode) {
      node = createField({
        id,
        nodeType: AjfNodeType.AjfField,
        fieldType: nodeType.nodeType.field!,
        parent: parent.id,
        parentNode,
        name: '',
      });
    } else {
      node = createContainerNode({
        id,
        nodeType: nodeType.nodeType.node,
        parent: parent != null ? parent.id : 0,
        parentNode,
        name: '',
        nodes: [],
      });
    }
    this._beforeNodesUpdate.emit();
    this._nodesUpdates.next((nodes: AjfNode[]): AjfNode[] => {
      if (node.parent === 0) {
        return [node];
      }
      const cn = isContainerNode(parent) && inContent ? (<AjfContainerNode>parent) :
                                                        getNodeContainer({nodes}, parent);
      if (cn != null) {
        if (!isFieldNode) {
          const replaceNodes = cn.nodes === nodes;
          const newNodes = cn.nodes.slice(0);
          newNodes.push(node);
          cn.nodes = newNodes;
          if (replaceNodes) {
            nodes = newNodes;
          }
        } else {
          cn.nodes.push(node);
        }
      }
      return nodes;
    });
  }

  saveNodeEntry(properties: any): void {
    this._saveNodeEntryEvent.emit(properties);
  }

  cancelNodeEntryEdit(): void {
    this._editedNodeEntry.next(null);
  }

  deleteNodeEntry(nodeEntry: AjfFormBuilderNodeEntry): void {
    this._deleteNodeEntryEvent.next(nodeEntry);
  }

  getCurrentForm(): Observable<AjfForm> {
    return combineLatest([
             this.form, this.nodes, this.attachmentsOrigins, this.choicesOrigins,
             this.stringIdentifier
           ])
        .pipe(
            filter(([form]) => form != null),
            map(([form, nodes, attachmentsOrigins, choicesOrigins, stringIdentifier]) => {
              return createForm({
                choicesOrigins: (choicesOrigins as AjfChoicesOrigin<any>[]).slice(0),
                attachmentsOrigins: (attachmentsOrigins as AjfAttachmentsOrigin<any>[]).slice(0),
                stringIdentifier: ((stringIdentifier || []) as AjfFormStringIdentifier[]).slice(0),
                nodes: (nodes as AjfSlide[]).slice(0),
                supplementaryInformations: (form as AjfForm).supplementaryInformations,
              });
            }));
  }

  editChoicesOrigin(choicesOrigin: AjfChoicesOrigin<any>): void {
    this._editedChoicesOrigin.next(choicesOrigin);
  }

  createChoicesOrigin(): void {
    this._editedChoicesOrigin.next(createChoicesFixedOrigin<any>({name: ''}));
  }

  cancelChoicesOriginEdit(): void {
    this._editedChoicesOrigin.next(null);
  }

  saveChoicesOrigin(params: {label: string, name: string, choices: any[]}): void {
    const choicesOrigin = this._editedChoicesOrigin.getValue();
    if (choicesOrigin != null) {
      choicesOrigin.label = params.label;
      choicesOrigin.name = params.name;
      if (isChoicesFixedOrigin(choicesOrigin)) {
        choicesOrigin.choices = params.choices;
      }
      this._choicesOriginsUpdates.next((choicesOrigins) => {
        const idx = choicesOrigins.indexOf(choicesOrigin);
        if (idx > -1) {
          choicesOrigins = [
            ...choicesOrigins.slice(0, idx),
            choicesOrigin,
            ...choicesOrigins.slice(idx + 1),
          ];
        } else {
          choicesOrigins = [...choicesOrigins, choicesOrigin];
        }
        return choicesOrigins;
      });
    }
    this._editedChoicesOrigin.next(null);
  }

  saveStringIdentifier(identifier: AjfFormStringIdentifier[]): void {
    this._stringIdentifierUpdates.next(() => [...identifier]);
  }

  private _findMaxNodeId(nodes: AjfNode[], _curMaxId = 0): number {
    let maxId = 0;
    nodes.forEach((n) => {
      maxId = Math.max(maxId, n.id);
      if (isContainerNode(n)) {
        maxId = Math.max(maxId, this._findMaxNodeId((<AjfContainerNode>n).nodes));
      }
    });
    return maxId;
  }

  private _initFormStreams(): void {
    this._form.subscribe((form: AjfForm|null) => {
      nodeUniqueId = 0;
      if (form != null && form.nodes != null && form.nodes.length > 0) {
        nodeUniqueId = this._findMaxNodeId(form.nodes);
      }
      this._nodesUpdates.next((_nodes: AjfNode[]): AjfNode[] => {
        return form != null && form.nodes != null ? form.nodes.slice(0) : [];
      });
      this._attachmentsOriginsUpdates.next(
          (_attachmentsOrigins: AjfAttachmentsOrigin<any>[]): AjfAttachmentsOrigin<any>[] => {
            return form != null && form.attachmentsOrigins != null ?
                form.attachmentsOrigins.slice(0) :
                [];
          });
      this._choicesOriginsUpdates.next(
          (_choicesOrigins: AjfChoicesOrigin<any>[]): AjfChoicesOrigin<any>[] => {
            return form != null && form.choicesOrigins != null ? form.choicesOrigins.slice(0) : [];
          });
      this._stringIdentifierUpdates.next(
          (_: AjfFormStringIdentifier[]): AjfFormStringIdentifier[] => {
            return form != null && form.stringIdentifier != null ? form.stringIdentifier.slice(0) :
                                                                   [];
          });
    });
  }

  private _initChoicesOriginsStreams(): void {
    this._choicesOrigins =
        (<Observable<AjfChoicesOriginsOperation>>this._choicesOriginsUpdates)
            .pipe(
                scan((choicesOrigins: AjfChoicesOrigin<any>[], op: AjfChoicesOriginsOperation) => {
                  return op(choicesOrigins);
                }, []), publishReplay(1), refCount());
  }

  private _initAttachmentsOriginsStreams(): void {
    this._attachmentsOrigins = this._attachmentsOriginsUpdates.pipe(
        scan(
            (attachmentsOrigins: AjfAttachmentsOrigin<any>[],
             op: AjfAttachmentsOriginsOperation) => {
              return op(attachmentsOrigins);
            },
            []),
        publishReplay(1),
        refCount(),
    );
  }

  private _initStringIdentifierStreams(): void {
    this._stringIdentifier = this._stringIdentifierUpdates.pipe(
        scan(
            (stringIdentifier: AjfFormStringIdentifier[], op: AjfFormStringIdentifierOperation) => {
              return op(stringIdentifier);
            },
            []),
        publishReplay(1),
        refCount(),
    );
  }

  private _initNodesStreams(): void {
    this._nodes = (<Observable<AjfNodesOperation>>this._nodesUpdates)
                      .pipe(scan((nodes: AjfNode[], op: AjfNodesOperation) => {
                              return op(nodes);
                            }, []), publishReplay(1), refCount());

    this._flatNodes = this._nodes.pipe(
        map((nodes: AjfNode[]) => flattenNodes(nodes)), publishReplay(1), refCount());

    this._flatFields = this._flatNodes.pipe(
        map((nodes: AjfNode[]) => <AjfField[]>nodes.filter(n => !isContainerNode(n))),
        publishReplay(1), refCount());

    this._nodeEntriesTree = this._nodes.pipe(
        map(nodes => <AjfFormBuilderNodeEntry[]>buildFormBuilderNodesTree(nodes)), publishReplay(1),
        refCount());
  }

  private _initSaveNode(): void {
    this._saveNodeEntryEvent
        .pipe(
            withLatestFrom(this.editedNodeEntry, this.choicesOrigins, this.attachmentsOrigins),
            filter(([_, nodeEntry]) => nodeEntry != null),
            map(([properties, ne]) => {
              this._beforeNodesUpdate.emit();
              const nodeEntry = ne as AjfFormBuilderNodeEntry;
              const origNode = nodeEntry.node;
              const node = deepCopy(origNode);
              node.id = nodeEntry.node.id;
              node.name = properties.name;
              node.label = properties.label;
              node.visibility = properties.visibility != null ?
                  createCondition({condition: properties.visibility}) :
                  null;

              const oldConditionalBranches = node.conditionalBranches.length;
              node.conditionalBranches = properties.conditionalBranches != null ?
                  properties.conditionalBranches.map(
                      (condition: string) => createCondition({condition})) :
                  [alwaysCondition()];
              const newConditionalBranches = node.conditionalBranches.length;

              if (isRepeatingContainerNode(node)) {
                const repNode = <AjfRepeatingContainerNode>node;
                repNode.formulaReps = properties.formulaReps != null ?
                    createFormula({formula: properties.formulaReps}) :
                    undefined;
                repNode.minReps = properties.minReps;
                repNode.maxReps = properties.maxReps;
              }

              if (isField(node)) {
                const field = node as AjfField;
                field.description = properties.description;
                field.defaultValue = properties.defaultValue;
                field.formula = properties.formula != null ?
                    createFormula({formula: properties.formula}) :
                    undefined;
                const forceValue = properties.value;
                const notEmpty = properties.notEmpty;
                const validationConditions = properties.validationConditions;
                let minValue: number|null = parseInt(properties.minValue, 10);
                let maxValue: number|null = parseInt(properties.maxValue, 10);
                let minDigits: number|null = parseInt(properties.minDigits, 10);
                let maxDigits: number|null = parseInt(properties.maxDigits, 10);
                if (isNaN(minValue)) {
                  minValue = null;
                }
                if (isNaN(maxValue)) {
                  maxValue = null;
                }
                if (isNaN(minDigits)) {
                  minDigits = null;
                }
                if (isNaN(maxDigits)) {
                  maxDigits = null;
                }
                if (forceValue != null || notEmpty != null ||
                    (validationConditions != null && validationConditions.length > 0) ||
                    minValue != null || maxValue != null || minDigits != null ||
                    maxDigits != null) {
                  const validation = field.validation || createValidationGroup({});
                  validation.forceValue = forceValue;
                  validation.notEmpty = notEmpty ? notEmptyValidation() : undefined;
                  validation.minValue = minValue != null ? minValidation(minValue) : undefined;
                  validation.maxValue = maxValue != null ? maxValidation(maxValue) : undefined;
                  validation.minDigits =
                      minDigits != null ? minDigitsValidation(minDigits) : undefined;
                  validation.maxDigits =
                      maxDigits != null ? maxDigitsValidation(maxDigits) : undefined;
                  validation.conditions =
                      (validationConditions ||
                       []).map((c: {condition: string, errorMessage: string}) => createValidation({
                                 condition: c.condition,
                                 errorMessage: c.errorMessage
                               }));
                  field.validation = validation;
                } else {
                  field.validation = undefined;
                }
                const notEmptyWarn = properties.notEmptyWarning;
                const warningConditions = properties.warningConditions;
                if (notEmptyWarn != null ||
                    (warningConditions != null && warningConditions.length > 0)) {
                  const warning = field.warning || createWarningGroup({});
                  warning.notEmpty = notEmptyWarn ? notEmptyWarning() : undefined;
                  warning.conditions =
                      (warningConditions ||
                       []).map((w: {condition: string, warningMessage: string}) => createWarning({
                                 condition: w.condition,
                                 warningMessage: w.warningMessage
                               }));
                  field.warning = warning;
                } else {
                  field.warning = undefined;
                }
                field.nextSlideCondition = properties.nextSlideCondition != null ?
                    createCondition({condition: properties.nextSlideCondition}) :
                    undefined;
                field.size = properties.size;
                field.defaultValue = properties.defaultValue;

                if (isFieldWithChoices(field)) {
                  const fwc = <AjfFieldWithChoices<any>>field;
                  (fwc as any).choicesOriginRef = properties.choicesOriginRef;
                  fwc.forceExpanded = properties.forceExpanded;
                  fwc.forceNarrow = properties.forceNarrow;
                  fwc.triggerConditions = (properties.triggerConditions ||
                                           []).map((t: string) => createCondition({condition: t}));
                }
              }

              this._editedNodeEntry.next(null);

              return (nodes: AjfNode[]): AjfNode[] => {
                let cn = getNodeContainer({nodes}, origNode);
                if (cn != null) {
                  // TODO: @trik check this, was always true?
                  // if (cn instanceof AjfNode) {
                  const replaceNodes = cn.nodes === nodes;
                  const idx = cn.nodes.indexOf(origNode);
                  let newNodes = cn.nodes.slice(0, idx);
                  newNodes.push(node);
                  newNodes = newNodes.concat(cn.nodes.slice(idx + 1));
                  cn.nodes = newNodes;
                  if (replaceNodes) {
                    nodes = newNodes;
                  } else {
                    nodes = nodes.slice(0);
                  }
                  // } else {
                  //   const idx = nodes.indexOf(origNode);
                  //   nodes = nodes.slice(0, idx).concat([node]).concat(nodes.slice(idx + 1));
                  // }
                  if (newConditionalBranches < oldConditionalBranches) {
                    for (let i = newConditionalBranches; i < oldConditionalBranches; i++) {
                      nodes = deleteNodeSubtree(nodes, node, i);
                    }
                  }
                }
                return nodes;
              };
            }),
            )
        .subscribe(this._nodesUpdates);
  }

  private _initDeleteNode(): void {
    (<Observable<AjfFormBuilderNodeEntry>>this._deleteNodeEntryEvent)
        .pipe(map((nodeEntry: AjfFormBuilderNodeEntry) => {
          this._beforeNodesUpdate.emit();
          return (nodes: AjfNode[]): AjfNode[] => {
            const node = nodeEntry.node;
            let cn = getNodeContainer({nodes}, node);
            if (cn != null) {
              const replaceNodes = cn.nodes === nodes;
              const idx = cn.nodes.indexOf(node);
              let newNodes = cn.nodes.slice(0, idx);
              newNodes = newNodes.concat(cn.nodes.slice(idx + 1));
              cn.nodes = newNodes;
              if (replaceNodes) {
                nodes = newNodes;
              } else {
                nodes = nodes.slice(0);
              }
              nodes = deleteNodeSubtree(nodes, node);
            }
            return nodes;
          };
        }))
        .subscribe(this._nodesUpdates);
  }
}
