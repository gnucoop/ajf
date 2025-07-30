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
  AjfForm,
  AjfFormStringIdentifier,
  AjfNode,
  AjfNodeGroup,
  AjfNodesOperation,
  AjfNodeType,
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
  isRangeField,
  isRepeatingContainerNode,
  isSlidesNode,
  isTableField,
  maxDigitsValidation,
  maxValidation,
  minDigitsValidation,
  minValidation,
  notEmptyValidation,
  notEmptyWarning,
} from '@ajf/core/forms';
import {AjfCondition, alwaysCondition, createCondition, createFormula} from '@ajf/core/models';
import {deepCopy} from '@ajf/core/utils';
import {moveItemInArray} from '@angular/cdk/drag-drop';
import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, of as obsOf, Subject, Subscription} from 'rxjs';
import {filter, map, shareReplay, scan, withLatestFrom, take} from 'rxjs/operators';

import {
  AjfAttachmentsOriginsOperation,
  AjfChoicesOriginsOperation,
  AjfFormStringIdentifierOperation,
} from './operations';

export interface AjfFormBuilderNodeTypeEntry {
  label: string;
  nodeType: {node: AjfNodeType; field?: AjfFieldType};
  isSlide?: boolean;
}

export interface AjfFormBuilderNodeEntry {
  node: AjfNode;
  container: AjfContainerNode | null;
  children: AjfFormBuilderNodeEntry[];
  content: AjfFormBuilderNodeEntry[];
}

export interface FormBuilderFieldValidation {
  isValid: boolean;
  errors: {[key: string]: any} | null;
}

export interface AjfFormBuilderValidation {
  [key: string]: FormBuilderFieldValidation | null;
}

export interface AjfFormBuilderEmptySlot {
  parent: AjfNode;
  parentNode: number;
}

/**
 * Represents a node's position change in the formbuilder.
 */
export interface AjfFormBuilderMoveEvent {
  /**
   * The node being moved.
   */
  nodeEntry: AjfFormBuilderNode;

  /**
   * The index of the node previous position.
   */
  fromIndex: number;

  /**
   * The index of the node new position.
   */
  toIndex: number;
}

export type AjfFormBuilderNode = AjfFormBuilderNodeEntry | AjfFormBuilderEmptySlot;
export type AjfContainerNode = AjfSlide | AjfRepeatingSlide | AjfNodeGroup;

function getNodeContainer(c: {nodes: AjfNode[]}, node: AjfNode): {nodes: AjfNode[]} | null {
  if (c.nodes.indexOf(node) > -1 || c.nodes.map(n => n.id).indexOf(node?.id) > -1) {
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

function getDefaultValue(
  value: any,
  node: AjfField<any>,
): string | string[] | number | boolean | null {
  let defaultValue = value && (value as string).trim() != '' ? (value as string) : null;
  if (defaultValue) {
    switch (node.fieldType) {
      case AjfFieldType.Boolean:
        return defaultValue === 'true' || defaultValue === '1';
      case AjfFieldType.MultipleChoice:
        return [defaultValue];
      case AjfFieldType.Number:
        const v = +defaultValue;
        return isNaN(v) ? 0 : v;
    }
  }
  return defaultValue;
}

function buildFormBuilderNodesSubtree(
  nodes: AjfNode[],
  parent: AjfNode,
  ignoreConditionalBranches = false,
): AjfFormBuilderNode[] {
  const entries: AjfFormBuilderNode[] = nodes
    .filter(n => n.parent === parent.id)
    .sort((n1, n2) => n1.parentNode - n2.parentNode)
    .map(n => {
      const children = buildFormBuilderNodesSubtree(nodes, n);
      if (children.length === 0) {
        children.push({parent: n, parentNode: 0});
      }
      return <AjfFormBuilderNodeEntry>{
        node: n,
        children,
        content: buildFormBuilderNodesContent(nodes, n),
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
  flatNodes: AjfNode[],
  parentNode: AjfNode,
  branch: number | null = null,
): AjfNode[] {
  return branch != null
    ? flatNodes.filter(n => n.parent === parentNode.id && n.parentNode === branch)
    : flatNodes.filter(n => n.parent === parentNode.id);
}

function removeNodes(nodes: AjfNode[], ids: number[]): AjfNode[] {
  const len = nodes.length;
  for (let i = 0; i < len; i++) {
    const node = nodes[i];
    if (isContainerNode(node)) {
      const container = <AjfContainerNode>node;
      container.nodes = removeNodes(container.nodes, ids);
    }
  }
  return nodes.filter(n => ids.indexOf(n.id) === -1);
}

function deleteNodeSubtree(
  nodes: AjfNode[],
  parentNode: AjfNode,
  branch: number | null = null,
): AjfNode[] {
  const flatNodes = flattenNodes(nodes);
  let delNodes: AjfNode[] = [];
  let descendants = getDescendants(flatNodes, parentNode, branch);
  const len = descendants.length;
  for (let i = 0; i < len; i++) {
    delNodes = delNodes.concat(getDescendants(flatNodes, descendants[i]));
  }
  delNodes = delNodes.concat(descendants);
  return removeNodes(
    nodes,
    delNodes.map(n => n.id),
  );
}

let nodeUniqueId = 0;

@Injectable()
export class AjfFormBuilderService {
  private _availableNodeTypes: AjfFormBuilderNodeTypeEntry[] = [
    {
      label: 'Slide',
      nodeType: {node: AjfNodeType.AjfSlide},
      isSlide: true,
    },
    {
      label: 'Repeating slide',
      nodeType: {node: AjfNodeType.AjfRepeatingSlide},
      isSlide: true,
    },
    {
      label: 'String',
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.String},
    },
    {
      label: 'Text',
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.Text},
    },
    {
      label: 'Number',
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.Number},
    },
    {
      label: 'Boolean',
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.Boolean},
    },
    {
      label: 'Single choice',
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.SingleChoice},
    },
    {
      label: 'Multiple choice',
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.MultipleChoice},
    },
    {
      label: 'Formula',
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.Formula},
    },
    {
      label: 'Date',
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.Date},
    },
    {
      label: 'Date input',
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.DateInput},
    },
    {
      label: 'Time',
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.Time},
    },
    {
      label: 'Table',
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.Table},
    },
    {
      label: 'Geolocation',
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.Geolocation},
    },
    {
      label: 'Barcode',
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.Barcode},
    },
    {
      label: 'Signature',
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.Signature},
    },
    {
      label: 'File',
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.File},
    },
    {
      label: 'Image',
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.Image},
    },
    {
      label: 'Range',
      nodeType: {node: AjfNodeType.AjfField, field: AjfFieldType.Range},
    },
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

  private _form: BehaviorSubject<AjfForm | null> = new BehaviorSubject<AjfForm | null>(null);
  private _formObs: Observable<AjfForm | null> = this._form as Observable<AjfForm | null>;

  /**
   * Current edited form stream
   *
   * @readonly
   * @memberOf AjfFormBuilderService
   */
  get form(): Observable<AjfForm | null> {
    return this._formObs;
  }

  private _attachmentsOrigins: Observable<AjfAttachmentsOrigin<any>[]> = obsOf([]);
  get attachmentsOrigins(): Observable<AjfAttachmentsOrigin<any>[]> {
    return this._attachmentsOrigins;
  }

  private _choicesOrigins: Observable<AjfChoicesOrigin<any>[]> = obsOf([]);
  get choicesOrigins(): Observable<AjfChoicesOrigin<any>[]> {
    return this._choicesOrigins;
  }

  private _stringIdentifier: Observable<AjfFormStringIdentifier[]> = obsOf([]);
  get stringIdentifier(): Observable<AjfFormStringIdentifier[]> {
    return this._stringIdentifier;
  }

  private _nodesWithoutChoiceOrigins: Observable<AjfSlide[]> = obsOf([]);
  private _nodes: Observable<AjfNode[]> = obsOf([]);
  get nodes(): Observable<AjfNode[]> {
    return this._nodes;
  }

  private _flatNodes: Observable<AjfNode[]> | undefined;
  get flatNodes(): Observable<AjfNode[]> | undefined {
    return this._flatNodes;
  }

  private _flatFields: Observable<AjfField[]> = obsOf([]);
  get flatFields(): Observable<AjfField[]> {
    return this._flatFields;
  }

  private _nodeEntriesTree: Observable<AjfFormBuilderNodeEntry[]> = obsOf([]);
  get nodeEntriesTree(): Observable<AjfFormBuilderNodeEntry[]> {
    return this._nodeEntriesTree;
  }

  /**
   * A list of the ids of the dropLists connected to the source list.
   */
  private _connectedDropLists: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  get connectedDropLists(): BehaviorSubject<string[]> {
    return this._connectedDropLists;
  }

  /**
   * A dictionary of the 'expanded' status of all nodeEntries in the tree {node.name: boolean}
   */
  private _nodeEntriesTreeExpandedStatus: BehaviorSubject<{[name: string]: boolean}> =
    new BehaviorSubject<{[name: string]: boolean}>({});
  get nodeEntriesTreeExpandedStatus(): BehaviorSubject<{[name: string]: boolean}> {
    return this._nodeEntriesTreeExpandedStatus;
  }

  /**
   * Determines the default expanded state of nodeEntries when the FormBuilder loads
   */
  private _defaultExpanded: boolean = false;

  private _editedNodeEntry: BehaviorSubject<AjfFormBuilderNodeEntry | null> =
    new BehaviorSubject<AjfFormBuilderNodeEntry | null>(null);
  private _editedNodeEntryObs: Observable<AjfFormBuilderNodeEntry | null> = this
    ._editedNodeEntry as Observable<AjfFormBuilderNodeEntry | null>;
  get editedNodeEntry(): Observable<AjfFormBuilderNodeEntry | null> {
    return this._editedNodeEntryObs;
  }

  /**
   * New field or node just added in tree
   */
  private _newNodeEntry: BehaviorSubject<AjfNode | AjfField | null> = new BehaviorSubject<
    AjfNode | AjfField | null
  >(null);

  private _editedCondition: BehaviorSubject<AjfCondition | null> =
    new BehaviorSubject<AjfCondition | null>(null);
  private _editedConditionObs: Observable<AjfCondition | null> = this
    ._editedCondition as Observable<AjfCondition | null>;
  get editedCondition(): Observable<AjfCondition | null> {
    return this._editedConditionObs;
  }

  private _editedChoicesOrigin: BehaviorSubject<AjfChoicesOrigin<any> | null> =
    new BehaviorSubject<AjfChoicesOrigin<any> | null>(null);
  private _editedChoicesOriginObs: Observable<AjfChoicesOrigin<any> | null> = this
    ._editedChoicesOrigin as Observable<AjfChoicesOrigin<any> | null>;
  get editedChoicesOrigin(): Observable<AjfChoicesOrigin<any> | null> {
    return this._editedChoicesOriginObs;
  }

  private _editedNodesValidation: BehaviorSubject<AjfFormBuilderValidation | null> =
    new BehaviorSubject<AjfFormBuilderValidation | null>(null);
  private _editedNodesValidationObs: Observable<AjfFormBuilderValidation | null> = this
    ._editedNodesValidation as Observable<AjfFormBuilderValidation | null>;
  get editedNodesValidation(): Observable<AjfFormBuilderValidation | null> {
    return this._editedNodesValidationObs;
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
  /**
   * Event fired when the position of a node in a tree changes.
   */
  private _moveNodeEntryEvent: EventEmitter<AjfFormBuilderMoveEvent> =
    new EventEmitter<AjfFormBuilderMoveEvent>();

  /**
   * Subscribes to the moveNodeEntryEvent event emitter;
   */
  private _moveNodeSub: Subscription = Subscription.EMPTY;

  /**
   * Counters for default name assigned to inserted fields/slides
   */
  private _emptyFieldCounter: number = 1;
  private _emptySlideCounter: number = 1;

  constructor() {
    this._initChoicesOriginsStreams();
    this._initAttachmentsOriginsStreams();
    this._initStringIdentifierStreams();
    this._initNodesStreams();
    this._initFormStreams();
    this._initSaveNode();
    this._initMoveNode();
    this._initDeleteNode();
  }

  /**
   * Sets the current edited form
   *
   * @param form
   *
   * @memberOf AjfFormBuilderService
   */
  setForm(form: AjfForm | null): void {
    if (form !== this._form.getValue()) {
      this._form.next(form);
    }
  }

  editNodeEntry(nodeEntry: AjfFormBuilderNodeEntry): void {
    this._editedNodeEntry.next(nodeEntry);
  }

  /**
   * Add a node validation entry
   * @param fbNodeValidation
   */
  editNodeValidation(fbNodeValidation: AjfFormBuilderValidation): void {
    this._editedNodesValidation.next({
      ...this._editedNodesValidation.value,
      ...fbNodeValidation,
    });
  }

  /**
   * Return if a node is valid
   * @param nodeName
   */
  isNodeValid(nodeName: string): boolean {
    const allNodeValidations = this._editedNodesValidation.value;
    if (!allNodeValidations || allNodeValidations[nodeName] == null) {
      return true;
    }
    return allNodeValidations[nodeName].isValid;
  }

  /**
   * Clean node validation entries when a node is deleted
   * @param fbNodeValidation the deleted node
   */
  cleanNodeValidation(fbNodeName: string): void {
    if (fbNodeName) {
      // set validation true for old unused name
      const fbNodeValidation: AjfFormBuilderValidation = {};
      fbNodeValidation[fbNodeName] = {isValid: true, errors: null};
      this.editNodeValidation(fbNodeValidation);
    }

    // Clean all not existing invalid nodes
    const allNodeValidations = this._editedNodesValidation.value;
    if (allNodeValidations && this._flatNodes) {
      const invalidNodes: string[] = [];

      Object.keys(allNodeValidations).forEach(key => {
        if (allNodeValidations[key]?.isValid === false) {
          invalidNodes.push(key);
        }
      });

      if (invalidNodes.length) {
        this._flatNodes.pipe(take(1)).subscribe(nodes => {
          const existingNodeNames = new Set(nodes.map(n => n.name));

          invalidNodes.forEach(invalidNode => {
            if (!existingNodeNames.has(invalidNode)) {
              delete allNodeValidations[invalidNode];
            }
          });

          this._editedNodesValidation.next(allNodeValidations);
        });
      }
    }
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

  assignListId(node: AjfNode, empty: boolean = false): string {
    if (node.nodeType === AjfNodeType.AjfSlide || node.nodeType === AjfNodeType.AjfRepeatingSlide) {
      const listId = empty ? `empty_fields_list_${node.id}` : `fields_list_${node.id}`;
      if (this._connectedDropLists.value.indexOf(listId) == -1) {
        this._connectDropList(listId);
      }
      return listId;
    }
    return '';
  }

  insertNode(
    nodeType: AjfFormBuilderNodeTypeEntry,
    parent: AjfNode,
    parentNode: number,
    inContent = false,
    insertInIndex = 0,
  ): void {
    let node: AjfNode | AjfField;
    const id = ++nodeUniqueId;
    const isFieldNode = nodeType.nodeType?.field != null;
    if (isFieldNode) {
      node = createField({
        id,
        nodeType: AjfNodeType.AjfField,
        fieldType: nodeType.nodeType.field!,
        parent: parent.id,
        parentNode,
        name: `new_field_${this._emptyFieldCounter}`,
        label: `New ${AjfFieldType[nodeType.nodeType.field!]} field ${this._emptyFieldCounter}`,
      });
      this._emptyFieldCounter++;
    } else {
      node = createContainerNode({
        id,
        nodeType: nodeType.nodeType.node,
        parent: 0,
        parentNode,
        name: `new_slide_${this._emptySlideCounter}`,
        label: `New Slide ${this._emptySlideCounter}`,
        nodes: [],
      });
      this._emptySlideCounter++;
    }
    this.cancelNodeEntryEdit();
    this._newNodeEntry.next(node);

    this._beforeNodesUpdate.emit();
    this._nodesUpdates.next((nodes: AjfNode[]): AjfNode[] => {
      const cn =
        isContainerNode(parent) && inContent
          ? <AjfContainerNode>parent
          : (getNodeContainer({nodes}, parent) as AjfContainerNode);
      if (!isFieldNode) {
        let newNodes = nodes.slice(0);
        newNodes.splice(insertInIndex, 0, node);
        newNodes = this._updateNodesList(0, newNodes);
        return newNodes;
      } else {
        let newNodes = cn.nodes.slice(0);
        newNodes.splice(insertInIndex, 0, node);
        newNodes = this._updateNodesList(cn.id, newNodes);
        cn.nodes = newNodes;
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
    this.cleanNodeValidation(nodeEntry.node.name);
  }

  /**
   * Triggers the moveNode event when a node is moved in the formbuilder.
   * @param nodeEntry The node to be moved.
   */
  moveNodeEntry(nodeEntry: AjfFormBuilderNodeEntry, from: number, to: number): void {
    const moveEvent: AjfFormBuilderMoveEvent = {nodeEntry: nodeEntry, fromIndex: from, toIndex: to};
    this._moveNodeEntryEvent.next(moveEvent);
    this.cancelNodeEntryEdit();
  }

  getCurrentForm(): Observable<AjfForm> {
    return combineLatest([
      this.form,
      this._nodesWithoutChoiceOrigins,
      this.attachmentsOrigins,
      this.choicesOrigins,
      this.stringIdentifier,
    ]).pipe(
      filter(([form]) => form != null),
      map(([form, nodes, attachmentsOrigins, choicesOrigins, stringIdentifier]) => {
        const supplementaryInformations = (form || {}).supplementaryInformations;
        return createForm({
          choicesOrigins: [...choicesOrigins],
          attachmentsOrigins: [...attachmentsOrigins],
          stringIdentifier: [...(stringIdentifier || [])],
          nodes: [...nodes],
          supplementaryInformations,
        });
      }),
    );
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

  saveChoicesOrigin(params: {label: string; name: string; choices: any[]}): void {
    const choicesOrigin = this._editedChoicesOrigin.getValue();
    const choicesOriginPreviousName: string | undefined = choicesOrigin?.name;
    if (choicesOrigin != null) {
      choicesOrigin.label = params.label;
      choicesOrigin.name = params.name;
      if (isChoicesFixedOrigin(choicesOrigin)) {
        choicesOrigin.choices = params.choices;
      }
      this._updateChoicesOriginRefInNodes(choicesOriginPreviousName, params.name);
      this._choicesOriginsUpdates.next(choicesOrigins => {
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

  /**
   * Resets the nodeEntriesTreeExpandedStatus dictionary to an empty object.
   */
  resetNodeEntriesTreeExpandedStatus(): void {
    this._nodeEntriesTreeExpandedStatus.next({});
  }

  /**
   * Gets the expanded status of an entry in the nodeEntriesTreeExpandedStatus dictionary
   * @param nodeName The unique name of the nodeEntry
   */
  getExpandedStatus(nodeName: string): Observable<boolean> {
    return this._nodeEntriesTreeExpandedStatus.pipe(
      map(tree => {
        if (nodeName in tree) {
          return tree[nodeName];
        }
        return this._defaultExpanded;
      }),
    );
  }

  /**
   * Upserts an entry in the nodeEntriesTreeExpandedStatus dictionary
   * @param nodeName The unique name of the nodeEntry
   * @param expanded True if the nodeEntry is expanded
   */
  updateExpandedStatus(nodeName: string, expanded: boolean): void {
    if (!nodeName) return;
    const dictValue = this._nodeEntriesTreeExpandedStatus.value;
    this._nodeEntriesTreeExpandedStatus.next({...dictValue, [nodeName]: expanded});
  }

  /**
   * Removes an entry from the nodeEntriesTreeExpandedStatus dictionary
   * @param nodeName The unique name of the nodeEntry
   */
  removeExpandedStatus(nodeName: string): void {
    const dictValue = this._nodeEntriesTreeExpandedStatus.value;
    delete dictValue[nodeName];
    this._nodeEntriesTreeExpandedStatus.next(dictValue);
  }

  /**
   * Sets expanded to true for each entry in the nodeEntriesTreeExpandedStatus dictionary
   */
  expandAll() {
    const dictValue = this._nodeEntriesTreeExpandedStatus.value;
    for (let nodeName in dictValue) {
      dictValue[nodeName] = true;
    }
    this._defaultExpanded = true;
    this._nodeEntriesTreeExpandedStatus.next(dictValue);
  }

  /**
   * Sets expanded to false for each entry in the nodeEntriesTreeExpandedStatus dictionary
   */
  collapseAll() {
    const dictValue = this._nodeEntriesTreeExpandedStatus.value;
    for (let nodeName in dictValue) {
      dictValue[nodeName] = false;
    }
    this._defaultExpanded = false;
    this._nodeEntriesTreeExpandedStatus.next(dictValue);
  }

  /**
   * Resets the empty fields/slides counters
   */
  resetEmptyCounters() {
    this._emptyFieldCounter = 1;
    this._emptySlideCounter = 1;
  }

  /**
   * Searches the form nodes for field nodes with choicesOriginRef corresponding
   * to an edited choicesOrigin and updates it with the new name.
   * @param previous_name The choicesOrigin previous name
   * @param new_name The choicesOrigin new name
   */
  private _updateChoicesOriginRefInNodes(previous_name?: string, new_name?: string): void {
    if (!previous_name || !new_name) return;
    const currentForm: AjfForm | null = this._form.value;
    if (!currentForm) return;
    const updatedNodes: AjfNode[] = [];
    const currentSlides: (AjfSlide | AjfRepeatingSlide)[] = currentForm.nodes;
    for (let slide of currentSlides) {
      if (!slide.nodes || !slide.nodes.length) continue;
      for (let node of slide.nodes) {
        const nodeObj = node as {[key: string]: any};
        if (nodeObj['choicesOriginRef'] && nodeObj['choicesOriginRef'] === previous_name) {
          nodeObj['choicesOriginRef'] = new_name;
          updatedNodes.push(nodeObj as AjfNode);
        }
      }
    }
    this._nodesUpdates.next((_nodes: AjfNode[]): AjfNode[] => {
      return currentForm.nodes.slice(0);
    });
  }

  private _buildFormBuilderNodesTree(nodes: AjfNode[]): (AjfFormBuilderNode | null)[] {
    this._updateNodesList(0, nodes);
    const rootNodes = nodes.filter(
      n => n.nodeType == AjfNodeType.AjfSlide || n.nodeType == AjfNodeType.AjfRepeatingSlide,
    );
    if (rootNodes.length === 0) {
      return [null];
    }
    const rootNode = rootNodes[0];
    if (isSlidesNode(rootNode)) {
      const tree: AjfFormBuilderNode[] = [];
      tree.push(<AjfFormBuilderNodeEntry>{
        node: rootNode,
        container: null,
        children: buildFormBuilderNodesSubtree(nodes, rootNode),
        content: buildFormBuilderNodesContent(nodes, rootNode),
      });

      const lastAddedAjfNode = this._newNodeEntry.value;
      if (lastAddedAjfNode) {
        const lastAddedFbNode = this._findNodeInTree(tree, lastAddedAjfNode);
        if (lastAddedFbNode) {
          this.editNodeEntry(<AjfFormBuilderNodeEntry>lastAddedFbNode);
        }
        this._newNodeEntry.next(null);
      }
      return tree;
    }
    throw new Error('Invalid form definition');
  }

  /**
   * Find an ajfNode in AjfFormBuilderNodeEntry tree, by node name
   * @param tree
   * @param node
   * @returns the AjfFormBuilderNodeEntry node
   */
  private _findNodeInTree(
    tree: AjfFormBuilderNode[],
    node: AjfNode | AjfField,
  ): AjfFormBuilderNodeEntry | null {
    for (const fbn of tree) {
      const fbe = fbn as AjfFormBuilderNodeEntry;
      if (fbe.node?.name === node.name) {
        return fbe;
      }
      if (fbe.content && fbe.content.length) {
        const foundInContent = this._findNodeInTree(fbe.content, node);
        if (foundInContent) {
          return foundInContent;
        }
      }
      if (fbe.children && fbe.children.length) {
        const foundInChildren = this._findNodeInTree(fbe.children, node);
        if (foundInChildren) {
          return foundInChildren;
        }
      }
    }
    return null;
  }

  /**
   * Adds the id of a dropList to be connected with the FormBuilder source list.
   * @param listId The id of the list to connect.
   */
  private _connectDropList(listId: string) {
    let connectedLists = this._connectedDropLists.value.slice(0);
    this._connectedDropLists.next([...connectedLists, listId]);
  }

  private _findMaxNodeId(nodes: AjfNode[], _curMaxId = 0): number {
    let maxId = 0;
    nodes.forEach(n => {
      maxId = Math.max(maxId, n.id);
      if (isContainerNode(n)) {
        maxId = Math.max(maxId, this._findMaxNodeId((<AjfContainerNode>n).nodes));
      }
    });
    return maxId;
  }

  private _initFormStreams(): void {
    this._form.subscribe((form: AjfForm | null) => {
      nodeUniqueId = 0;
      if (form != null && form.nodes != null && form.nodes.length > 0) {
        nodeUniqueId = this._findMaxNodeId(form.nodes);
      }
      this._nodesUpdates.next((_nodes: AjfNode[]): AjfNode[] => {
        return form != null && form.nodes != null ? form.nodes.slice(0) : [];
      });
      this._attachmentsOriginsUpdates.next(
        (_attachmentsOrigins: AjfAttachmentsOrigin<any>[]): AjfAttachmentsOrigin<any>[] => {
          return form != null && form.attachmentsOrigins != null
            ? form.attachmentsOrigins.slice(0)
            : [];
        },
      );
      this._choicesOriginsUpdates.next(
        (_choicesOrigins: AjfChoicesOrigin<any>[]): AjfChoicesOrigin<any>[] => {
          return form != null && form.choicesOrigins != null ? form.choicesOrigins.slice(0) : [];
        },
      );
      this._stringIdentifierUpdates.next(
        (_: AjfFormStringIdentifier[]): AjfFormStringIdentifier[] => {
          return form != null && form.stringIdentifier != null
            ? form.stringIdentifier.slice(0)
            : [];
        },
      );
    });
  }

  private _initChoicesOriginsStreams(): void {
    this._choicesOrigins = (<Observable<AjfChoicesOriginsOperation>>(
      this._choicesOriginsUpdates
    )).pipe(
      scan((choicesOrigins: AjfChoicesOrigin<any>[], op: AjfChoicesOriginsOperation) => {
        return op(choicesOrigins);
      }, []),
      shareReplay(1),
    );
  }

  private _initAttachmentsOriginsStreams(): void {
    this._attachmentsOrigins = this._attachmentsOriginsUpdates.pipe(
      scan(
        (attachmentsOrigins: AjfAttachmentsOrigin<any>[], op: AjfAttachmentsOriginsOperation) => {
          return op(attachmentsOrigins);
        },
        [],
      ),
      shareReplay(1),
    );
  }

  private _initStringIdentifierStreams(): void {
    this._stringIdentifier = this._stringIdentifierUpdates.pipe(
      scan((stringIdentifier: AjfFormStringIdentifier[], op: AjfFormStringIdentifierOperation) => {
        return op(stringIdentifier);
      }, []),
      shareReplay(1),
    );
  }

  private _initNodesStreams(): void {
    this._nodes = (<Observable<AjfNodesOperation>>this._nodesUpdates).pipe(
      scan((nodes: AjfNode[], op: AjfNodesOperation) => {
        return op(nodes);
      }, []),
      shareReplay(1),
    );

    this._nodesWithoutChoiceOrigins = (this._nodes as Observable<AjfSlide[]>).pipe(
      map(slides =>
        slides.map(slide => {
          slide.nodes = (slide.nodes as AjfField[]).map((node: AjfField) => {
            if (isFieldWithChoices(node)) {
              const fwc = deepCopy(node);
              if (fwc && fwc.choices) {
                delete fwc.choices;
              }
              if (fwc && fwc.choicesOrigin) {
                delete fwc.choicesOrigin;
              }
              return fwc;
            }
            return node;
          });
          return slide;
        }),
      ),
    );

    this._flatNodes = this._nodes.pipe(
      map((nodes: AjfNode[]) => flattenNodes(nodes)),
      shareReplay(1),
    );

    this._flatFields = this._flatNodes.pipe(
      map((nodes: AjfNode[]) => <AjfField[]>nodes.filter(n => !isContainerNode(n))),
      shareReplay(1),
    );

    this._nodeEntriesTree = this._nodes.pipe(
      map(nodes => <AjfFormBuilderNodeEntry[]>this._buildFormBuilderNodesTree(nodes)),
      shareReplay(1),
    );
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
          node.visibility =
            properties.visibility != null
              ? createCondition({condition: properties.visibility})
              : null;

          const oldConditionalBranches = node.conditionalBranches.length;
          node.conditionalBranches =
            properties.conditionalBranches != null
              ? properties.conditionalBranches.map((condition: string) =>
                  createCondition({condition}),
                )
              : [alwaysCondition()];
          const newConditionalBranches = node.conditionalBranches.length;

          if (isRepeatingContainerNode(node)) {
            node.formulaReps =
              properties.formulaReps != null
                ? createFormula({formula: properties.formulaReps})
                : undefined;
            node.minReps = properties.minReps;
            node.maxReps = properties.maxReps;
          }

          if (isField(node)) {
            node.hint = properties.hint;
            node.editable = !properties.readonlyField;
            node.description = properties.description;
            node.defaultValue = getDefaultValue(properties.defaultValue, node);
            node.formula =
              properties.formula != null ? createFormula({formula: properties.formula}) : undefined;
            const forceValue = properties.value;
            const notEmpty = properties.notEmpty;
            const validationConditions = properties.validationConditions;
            let minValue: number | null = parseInt(properties.minValue, 10);
            let maxValue: number | null = parseInt(properties.maxValue, 10);
            let minDigits: number | null = parseInt(properties.minDigits, 10);
            let maxDigits: number | null = parseInt(properties.maxDigits, 10);
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
            if (
              forceValue != null ||
              notEmpty != null ||
              (validationConditions != null && validationConditions.length > 0) ||
              minValue != null ||
              maxValue != null ||
              minDigits != null ||
              maxDigits != null
            ) {
              const validation = node.validation || createValidationGroup({});
              validation.forceValue = forceValue;
              validation.notEmpty = notEmpty ? notEmptyValidation() : undefined;
              validation.minValue = minValue != null ? minValidation(minValue) : undefined;
              validation.maxValue = maxValue != null ? maxValidation(maxValue) : undefined;
              validation.minDigits = minDigits != null ? minDigitsValidation(minDigits) : undefined;
              validation.maxDigits = maxDigits != null ? maxDigitsValidation(maxDigits) : undefined;
              validation.conditions = (validationConditions || []).map(
                (c: {condition: string; errorMessage: string}) =>
                  createValidation({
                    condition: c.condition,
                    errorMessage: c.errorMessage,
                  }),
              );
              node.validation = validation;
            } else {
              node.validation = undefined;
            }
            const notEmptyWarn = properties.notEmptyWarning;
            const warningConditions = properties.warningConditions;
            if (
              notEmptyWarn != null ||
              (warningConditions != null && warningConditions.length > 0)
            ) {
              const warning = node.warning || createWarningGroup({});
              warning.notEmpty = notEmptyWarn ? notEmptyWarning() : undefined;
              warning.conditions = (warningConditions || []).map(
                (w: {condition: string; warningMessage: string}) =>
                  createWarning({
                    condition: w.condition,
                    warningMessage: w.warningMessage,
                  }),
              );
              node.warning = warning;
            } else {
              node.warning = undefined;
            }
            node.nextSlideCondition =
              properties.nextSlideCondition != null
                ? createCondition({condition: properties.nextSlideCondition})
                : undefined;
            node.size = properties.size;

            if (isFieldWithChoices(node)) {
              (node as any).choicesOriginRef = properties.choicesOriginRef;
              node.forceExpanded = properties.forceExpanded;
              node.forceNarrow = properties.forceNarrow;
              node.triggerConditions = (properties.triggerConditions || []).map((t: string) =>
                createCondition({condition: t}),
              );
            }

            if (isRangeField(node)) {
              node.start = properties.start;
              node.end = properties.end;
              node.step = properties.step;
            }

            if (isTableField(node)) {
              let {columnTypes, rows, columnLabels, rowLabels} = JSON.parse(properties.tableDef);
              node.columnTypes = columnTypes || [];
              node.rows = rows || [];
              node.columnLabels = columnLabels || [];
              node.rowLabels = rowLabels || [];
              node.hideEmptyRows = properties.hideEmptyRows;
            }
          }

          this._editedNodeEntry.next(null);

          return (nodes: AjfNode[]): AjfNode[] => {
            let cn = getNodeContainer({nodes}, origNode);
            if (cn != null) {
              // TODO: @trik check this, was always true?
              // if (cn instanceof AjfNode) {
              const replaceNodes = cn.nodes === nodes;
              const idx = cn.nodes.map(n => n.id).indexOf(origNode.id);
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
      .pipe(
        map((nodeEntry: AjfFormBuilderNodeEntry) => {
          this._beforeNodesUpdate.emit();
          this.removeExpandedStatus(nodeEntry.node.name);
          return (nodes: AjfNode[]): AjfNode[] => {
            const node = nodeEntry.node;
            let cn = getNodeContainer({nodes}, node);
            if (cn != null) {
              const replaceNodes = cn.nodes === nodes;
              const idx = cn.nodes.map(n => n.id).indexOf(node.id);
              let newNodes = cn.nodes.slice(0, idx);
              newNodes = newNodes.concat(cn.nodes.slice(idx + 1));
              cn.nodes = newNodes;
              if (replaceNodes) {
                nodes = newNodes;
              } else {
                nodes = nodes.slice(0);
              }
            }
            return nodes;
          };
        }),
      )
      .subscribe(this._nodesUpdates);
  }

  /**
   * Initializes the subscription to the moveNodeEntryEvent.
   */
  private _initMoveNode(): void {
    this._moveNodeSub.unsubscribe();
    this._moveNodeSub = this._moveNodeEntryEvent
      .pipe(
        map((moveEvent: AjfFormBuilderMoveEvent) => {
          this._beforeNodesUpdate.emit();
          return (nodes: AjfNode[]): AjfNode[] => {
            const nodeEntry = moveEvent.nodeEntry as AjfFormBuilderNodeEntry;
            const node = nodeEntry.node;
            let cn = getNodeContainer({nodes}, node) as AjfContainerNode;
            let newNodes: AjfNode[] = nodes;
            if (cn != null) {
              const replaceNodes = cn.nodes === nodes;
              newNodes = cn.nodes;
              moveItemInArray(newNodes, moveEvent.fromIndex, moveEvent.toIndex);
              newNodes = this._updateNodesList(cn.id, newNodes);
              cn.nodes = newNodes;
              if (replaceNodes) {
                nodes = newNodes;
              } else {
                nodes = nodes.slice(0);
              }
            }
            return nodes;
          };
        }),
      )
      .subscribe(this._nodesUpdates);
  }

  /**
   * Updates the "id" and "parent" fields of a modified or rearranged list of nodes.
   * @param containerId The id of the parent container of the list.
   * @param nodesList The list of nodes to be updated.
   */
  private _updateNodesList(containerId: number, nodesList: AjfNode[]): AjfNode[] {
    if (!nodesList.length) {
      return [];
    }
    const contId = containerId != undefined ? containerId : 0;
    for (let idx = 0; idx < nodesList.length; idx++) {
      let currentNode = nodesList[idx];
      currentNode.id = contId * 1000 + idx + 1;
      currentNode.parent = idx == 0 ? contId : contId * 1000 + idx;
      if (isSlidesNode(currentNode)) {
        this._updateNodesList(currentNode.id, currentNode.nodes);
      }
    }
    return nodesList;
  }
}
