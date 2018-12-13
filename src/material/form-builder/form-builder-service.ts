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

import {Injectable, EventEmitter} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {
  filter, map, publishReplay, refCount, scan, withLatestFrom
} from 'rxjs/operators';

import {
  AjfCondition,
  AjfFormula,
} from '@ajf/core/models';
import {
  AjfAttachmentsOrigin,
  AjfBooleanField,
  AjfChoicesFixedOrigin,
  AjfDateField,
  AjfDateInputField,
  AjfField,
  AjfFieldWithChoices,
  AjfForm,
  AjfFormulaField,
  AjfMultipleChoiceField,
  AjfNode,
  AjfNodeGroup,
  AjfNumberField,
  AjfRepeatingSlide,
  AjfSingleChoiceField,
  AjfSlide,
  AjfStringField,
  AjfTableField,
  AjfTextField,
  AjfTimeField,
  AjfValidation,
  AjfValidationGroup,
  AjfWarning,
  AjfWarningGroup,
  IAjfChoicesOrigin,
  IAjfNodesOperation,
} from '@ajf/core/forms';
import {
  IAjfAttachmentsOriginsOperation, IAjfChoicesOriginsOperation
} from './operations';


export interface AjfFormBuilderNodeTypeEntry {
  label: string;
  icon: {
    fontSet: string;
    fontIcon: string;
  };
  nodeType: typeof AjfNode;
  isSlide?: boolean;
}


export interface AjfFormBuilderNodeEntry {
  node: AjfNode;
  container: AjfContainerNode | null;
  children: AjfFormBuilderNodeEntry[];
  content: AjfFormBuilderNodeEntry[];
}


export interface AjfFormBuilderEmptySlot {
  parent: AjfNode;
  parentNode: number;
}


export type AjfFormBuilderNode = AjfFormBuilderNodeEntry | AjfFormBuilderEmptySlot;


export function isContainerNode(node: AjfNode): boolean {
  return node != null && (
    node instanceof AjfSlide ||
    node instanceof AjfRepeatingSlide ||
    node instanceof AjfNodeGroup
  );
}
export type AjfContainerNode = AjfSlide | AjfRepeatingSlide | AjfNodeGroup;

export function isRepeatingContainerNode(node: AjfNode): boolean {
  return node != null && (
    node instanceof AjfRepeatingSlide ||
    node instanceof AjfNodeGroup
  );
}
export type AjfRepeatingContainerNode = AjfRepeatingSlide | AjfNodeGroup;

export function isSlideNode(node: AjfNode): boolean {
  return node != null && (
    node instanceof AjfSlide ||
    node instanceof AjfRepeatingSlide
  );
}


function getNodeContainer(c: {nodes: AjfNode[]}, node: AjfNode): {nodes: AjfNode[]} | null {
  if (c.nodes.indexOf(node) > -1) {
    return c;
  }
  const cns = c.nodes.filter(n => isContainerNode(n));
  const len = cns.length;
  for (let i = 0 ; i < len ; i++) {
    const cn = getNodeContainer(<AjfContainerNode>cns[i], node);
    if (cn != null) { return cn; }
  }
  return null;
}


function buildFormBuilderNodesSubtree(
  nodes: AjfNode[], parent: AjfNode, ignoreConditionalBranches = false
): AjfFormBuilderNode[] {
  const entries: AjfFormBuilderNode[] = nodes
    .filter(n => n.parent === parent.id)
    .sort((n1, n2) => n1.parentNode - n2.parentNode)
    .map(n => <AjfFormBuilderNodeEntry>{
      node: n,
      children: buildFormBuilderNodesSubtree(nodes, n),
      content: buildFormBuilderNodesContent(nodes, n)
    });
  if (!ignoreConditionalBranches) {
    const entriesNum = entries.length;
    const cbs = parent.conditionalBranches.length;
    for (let i = entriesNum ; i < cbs ; i++) {
      entries.push({
        parent: parent,
        parentNode: i
      });
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


function buildFormBuilderNodesTree(nodes: AjfNode[]): (AjfFormBuilderNode | null)[] {
  const rootNodes = nodes.filter(n => n.parent == null);
  if (rootNodes.length === 1) {
    const rootNode = rootNodes[0];
    if (rootNode instanceof AjfRepeatingSlide || rootNode instanceof AjfSlide) {
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
  flatNodes: AjfNode[], parentNode: AjfNode, branch: number | null = null
): AjfNode[] {
  return branch != null ?
    flatNodes.filter(n => n.parent === parentNode.id && n.parentNode === branch) :
    flatNodes.filter(n => n.parent === parentNode.id);
}

function removeNodes(nodes: AjfNode[], ids: number[]): AjfNode[] {
  const len = nodes.length;
  for (let i = 0 ; i < len ; i++) {
    const node = nodes[i];
    if (isContainerNode(node)) {
      const container = (<AjfContainerNode>node);
      container.nodes = removeNodes(container.nodes, ids);
    }
  }
  return nodes.filter(n => ids.indexOf(n.id) === -1);
}

function deleteNodeSubtree(
  nodes: AjfNode[], parentNode: AjfNode, branch: number | null = null
): AjfNode[] {
  const flatNodes = flattenNodes(nodes);
  let delNodes: AjfNode[] = [];
  let descendants = getDescendants(flatNodes, parentNode, branch);
  const len = descendants.length;
  for (let i = 0 ; i < len ; i++) {
    delNodes = delNodes.concat(getDescendants(flatNodes, descendants[i]));
  }
  delNodes = delNodes.concat(descendants);
  return removeNodes(nodes, delNodes.map(n => n.id));
}

let nodeUniqueId = 0;


@Injectable()
export class AjfFormBuilderService {
  private _availableNodeTypes: AjfFormBuilderNodeTypeEntry[] = [
    { label: 'Slide', icon: {fontSet: 'ajf-icon', fontIcon: 'field-slide' }, nodeType: AjfSlide,
      isSlide: true },
    { label: 'Repeating slide', icon: { fontSet: 'ajf-icon', fontIcon: 'field-repeatingslide' },
      nodeType: AjfRepeatingSlide, isSlide: true },
    { label: 'String', icon: { fontSet: 'ajf-icon', fontIcon: 'field-string' },
      nodeType: AjfStringField },
    { label: 'Text', icon: { fontSet: 'ajf-icon', fontIcon: 'field-text' },
      nodeType: AjfTextField },
    { label: 'Number', icon: { fontSet: 'ajf-icon', fontIcon: 'field-number' },
      nodeType: AjfNumberField },
    { label: 'Boolean', icon: { fontSet: 'ajf-icon', fontIcon: 'field-boolean' },
      nodeType: AjfBooleanField },
    { label: 'Single choice', icon: { fontSet: 'ajf-icon', fontIcon: 'field-singlechoice' },
      nodeType: AjfSingleChoiceField },
    { label: 'Multiple choice', icon: { fontSet: 'ajf-icon', fontIcon: 'field-multiplechoice' },
      nodeType: AjfMultipleChoiceField },
    { label: 'Formula', icon: { fontSet: 'ajf-icon', fontIcon: 'field-formula' },
      nodeType: AjfFormulaField },
    { label: 'Date', icon: { fontSet: 'ajf-icon', fontIcon: 'field-date' },
      nodeType: AjfDateField },
    { label: 'Date input', icon: { fontSet: 'ajf-icon', fontIcon: 'field-dateinput' },
      nodeType: AjfDateInputField },
    { label: 'Time', icon: { fontSet: 'ajf-icon', fontIcon: 'field-time' },
      nodeType: AjfTimeField },
    { label: 'Table', icon: { fontSet: 'ajf-icon', fontIcon: 'field-table' },
      nodeType: AjfTableField }
  ];
  /**
   * Available node types
   *
   * @readonly
   * @memberOf AjfFormBuilderService
   */
  get availableNodeTypes(): AjfFormBuilderNodeTypeEntry[] { return this._availableNodeTypes; }

  private _form: BehaviorSubject<AjfForm | null> = new BehaviorSubject<AjfForm | null>(null);
  private _formObs: Observable<AjfForm | null> = this._form.asObservable();
  /**
   * Current edited form stream
   *
   * @readonly
   * @memberOf AjfFormBuilderService
   */
  get form(): Observable<AjfForm | null> { return this._formObs; }

  private _attachmentsOrigins: Observable<AjfAttachmentsOrigin[]>;
  get attachmentsOrigins(): Observable<AjfAttachmentsOrigin[]> { return this._attachmentsOrigins; }

  private _choicesOrigins: Observable<IAjfChoicesOrigin[]>;
  get choicesOrigins(): Observable<IAjfChoicesOrigin[]> { return this._choicesOrigins; }

  private _nodes: Observable<AjfNode[]>;
  get nodes(): Observable<AjfNode[]> { return this._nodes; }

  private _flatNodes: Observable<AjfNode[]>;
  get flatNodes(): Observable<AjfNode[]> {
    return this._flatNodes;
  }

  private _flatFields: Observable<AjfField[]>;
  get flatFields(): Observable<AjfField[]> { return this._flatFields; }

  private _nodeEntriesTree: Observable<AjfFormBuilderNodeEntry[]>;
  get nodeEntriesTree(): Observable<AjfFormBuilderNodeEntry[]> { return this._nodeEntriesTree; }

  private _editedNodeEntry: BehaviorSubject<AjfFormBuilderNodeEntry | null> =
    new BehaviorSubject<AjfFormBuilderNodeEntry | null>(null);
  private _editedNodeEntryObs: Observable<AjfFormBuilderNodeEntry | null> =
    this._editedNodeEntry.asObservable();
  get editedNodeEntry(): Observable<AjfFormBuilderNodeEntry | null> {
    return this._editedNodeEntryObs;
  }

  private _editedCondition: BehaviorSubject<AjfCondition | null> =
    new BehaviorSubject<AjfCondition | null>(null);
  private _editedConditionObs: Observable<AjfCondition | null> =
    this._editedCondition.asObservable();
  get editedCondition(): Observable<AjfCondition | null> { return this._editedConditionObs; }

  private _editedChoicesOrigin: BehaviorSubject<IAjfChoicesOrigin | null> =
    new BehaviorSubject<IAjfChoicesOrigin | null>(null);
  private _editedChoicesOriginObs: Observable<IAjfChoicesOrigin | null> =
    this._editedChoicesOrigin.asObservable();
  get editedChoicesOrigin(): Observable<IAjfChoicesOrigin | null> {
    return this._editedChoicesOriginObs;
  }

  private _beforeNodesUpdate: EventEmitter<void> = new EventEmitter<void>();
  private _beforeNodesUpdateObs: Observable<void> = this._beforeNodesUpdate.asObservable();
  get beforeNodesUpdate(): Observable<void> { return this._beforeNodesUpdateObs; }
  private _afterNodeUpdate: EventEmitter<void> = new EventEmitter<void>();
  private _afterNodeUpdateObs: Observable<void> = this._afterNodeUpdate.asObservable();
  get afterNodeUpdate(): Observable<void> { return this._afterNodeUpdateObs; }

  private _nodesUpdates: Subject<IAjfNodesOperation> = new Subject<IAjfNodesOperation>();
  private _attachmentsOriginsUpdates: Subject<IAjfAttachmentsOriginsOperation> =
    new Subject<IAjfAttachmentsOriginsOperation>();
  private _choicesOriginsUpdates: Subject<IAjfChoicesOriginsOperation> =
    new Subject<IAjfChoicesOriginsOperation>();

  private _saveNodeEntryEvent: EventEmitter<any> = new EventEmitter<any>();
  private _deleteNodeEntryEvent: EventEmitter<AjfFormBuilderNodeEntry> =
    new EventEmitter<AjfFormBuilderNodeEntry>();

  constructor() {
    this._initChoicesOriginsStreams();
    this._initAttachmentsOriginsStreams();
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
  setForm(form: AjfForm | null): void {
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
    if (c == null) { return; }
    c.condition = condition;
    this._editedCondition.next(null);
  }

  cancelConditionEdit(): void {
    this._editedChoicesOrigin.next(null);
  }

  insertNode(
    nodeType: AjfFormBuilderNodeTypeEntry,
    parent: AjfNode,
    parentNode: number,
    inContent = false
  ): void {
    let node = new nodeType.nodeType({
      id: ++nodeUniqueId,
      parent: parent.id,
      parentNode
    });
    this._beforeNodesUpdate.emit();
    this._nodesUpdates.next((nodes: AjfNode[]): AjfNode[] => {
      const cn = isContainerNode(parent) && inContent ?
        (<AjfContainerNode>parent) :
        getNodeContainer({nodes}, parent);
      if (cn != null) {
        if (cn instanceof AjfNode) {
          const newNodes = cn.nodes.slice(0);
          newNodes.push(node);
          cn.nodes = newNodes;
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
    return this._form.pipe(
      withLatestFrom(this._nodes),
      filter((r) => r[0] != null),
      map((r: [AjfForm | null, AjfNode[]]) => {
        const form = r[0]!;
        const nodes = r[1];
        return new AjfForm({
          choicesOrigins: form.choicesOrigins.slice(0),
          attachmentsOrigins: form.attachmentsOrigins.slice(0),
          stringIdentifier: form.stringIdentifier.slice(0),
          nodes: nodes.slice(0)
        });
      })
    );
  }

  editChoicesOrigin(choicesOrigin: IAjfChoicesOrigin): void {
    this._editedChoicesOrigin.next(choicesOrigin);
  }

  createChoicesOrigin(): void {
    this._editedChoicesOrigin.next(new AjfChoicesFixedOrigin<any>());
  }

  cancelChoicesOriginEdit(): void {
    this._editedChoicesOrigin.next(null);
  }

  saveChoicesOrigin(params: {label: string, name: string, choices: any[]}): void {
    const choicesOrigin = this._editedChoicesOrigin.getValue();
    if (choicesOrigin != null) {
      choicesOrigin.setLabel(params.label);
      choicesOrigin.setName(params.name);
      if (choicesOrigin instanceof AjfChoicesFixedOrigin) {
        choicesOrigin.setChoices(params.choices);
      }
    }
    this._editedChoicesOrigin.next(null);
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
    this._form
      .subscribe((form: AjfForm | null) => {
        nodeUniqueId = 0;
        if (form != null && form.nodes != null && form.nodes.length > 0) {
          nodeUniqueId = this._findMaxNodeId(form.nodes);
        }
        this._nodesUpdates.next(
          (_nodes: AjfNode[]): AjfNode[] => {
            return form != null && form.nodes != null ? form.nodes.slice(0) : [];
          }
        );
        this._attachmentsOriginsUpdates.next(
          (_attachmentsOrigins: AjfAttachmentsOrigin[]): AjfAttachmentsOrigin[] => {
            return form != null && form.attachmentsOrigins != null ?
              form.attachmentsOrigins.slice(0) : [];
          }
        );
        this._choicesOriginsUpdates.next(
          (_choicesOrigins: IAjfChoicesOrigin[]): IAjfChoicesOrigin[] => {
            return form != null && form.choicesOrigins != null ? form.choicesOrigins.slice(0) : [];
          }
        );
      });
  }

  private _initChoicesOriginsStreams(): void {
    this._choicesOrigins = (<Observable<IAjfChoicesOriginsOperation>>this._choicesOriginsUpdates)
      .pipe(
        scan((choicesOrigins: IAjfChoicesOrigin[], op: IAjfChoicesOriginsOperation) => {
          return op(choicesOrigins);
        }, []),
        publishReplay(1),
        refCount()
      );
  }

  private _initAttachmentsOriginsStreams(): void {
    this._attachmentsOrigins =
      (<Observable<IAjfAttachmentsOriginsOperation>>this._attachmentsOriginsUpdates).pipe(
        scan((attachmentsOrigins: AjfAttachmentsOrigin[], op: IAjfAttachmentsOriginsOperation) => {
          return op(attachmentsOrigins);
        }, []),
        publishReplay(1),
        refCount()
      );
  }

  private _initNodesStreams(): void {
    this._nodes = (<Observable<IAjfNodesOperation>>this._nodesUpdates).pipe(
      scan((nodes: AjfNode[], op: IAjfNodesOperation) => {
        return op(nodes);
      }, []),
      publishReplay(1),
      refCount()
    );

    this._flatNodes = this._nodes.pipe(
      map((nodes: AjfNode[]) => flattenNodes(nodes)),
      publishReplay(1),
      refCount()
    );

    this._flatFields = this._flatNodes.pipe(
      map((nodes: AjfNode[]) => <AjfField[]>nodes.filter(n => !isContainerNode(n))),
      publishReplay(1),
      refCount()
    );

    this._nodeEntriesTree = this._nodes.pipe(
      map(nodes => <AjfFormBuilderNodeEntry[]>buildFormBuilderNodesTree(nodes)),
      publishReplay(1),
      refCount()
    );
  }

  private _initSaveNode(): void {
    this._saveNodeEntryEvent.pipe(
      withLatestFrom(this.editedNodeEntry, this.choicesOrigins, this.attachmentsOrigins),
      filter((r) => r[1] != null),
      map((r: [
        any, AjfFormBuilderNodeEntry | null, IAjfChoicesOrigin[], AjfAttachmentsOrigin[]
      ]) => {
        this._beforeNodesUpdate.emit();
        const properties = r[0];
        const nodeEntry = r[1]!;
        const choicesOrigins = r[2];
        const attachmentsOrigins = r[3];
        const origNode = nodeEntry.node;
        const node = AjfNode.fromJson(origNode.toJson(), choicesOrigins, attachmentsOrigins);
        node.id = nodeEntry.node.id;
        node.name = properties['name'];
        node.label = properties['label'];
        node.visibility = properties['visibility'] != null ?
          new AjfCondition({ condition: properties['visibility'] }) : null;

        const oldConditionalBranches = node.conditionalBranches.length;
        node.conditionalBranches = properties['conditionalBranches'] != null
          ? properties['conditionalBranches']
            .map((condition: string) => new AjfCondition({condition}))
          : [AjfCondition.alwaysCondition()];
        const newConditionalBranches = node.conditionalBranches.length;

        if (isRepeatingContainerNode(node)) {
          const repNode = <AjfRepeatingContainerNode>node;
          repNode.formulaReps = properties['formulaReps'] != null ?
            new AjfFormula({formula: properties['formulaReps']}) : null;
          repNode.minReps = properties['minReps'];
          repNode.maxReps = properties['maxReps'];
        }

        if (nodeEntry.node instanceof AjfField) {
          const field = <AjfField>nodeEntry.node;
          field.description = properties['description'];
          field.defaultValue = properties['defaultValue'];
          field.formula = properties['formula'] != null ?
            new AjfFormula({formula: properties['formula']}) : null;
          const forceValue = properties['value'];
          const notEmpty = properties['notEmpty'];
          const validationConditions = properties['validationConditions'];
          let minValue: number | null = parseInt(properties['minValue'], 10);
          let maxValue: number | null = parseInt(properties['maxValue'], 10);
          let minDigits: number | null = parseInt(properties['minDigits'], 10);
          let maxDigits: number | null = parseInt(properties['maxDigits'], 10);
          if (isNaN(minValue)) { minValue = null; }
          if (isNaN(maxValue)) { maxValue = null; }
          if (isNaN(minDigits)) { minDigits = null; }
          if (isNaN(maxDigits)) { maxDigits = null; }
          if (
            forceValue != null || notEmpty != null ||
            (validationConditions != null && validationConditions.length > 0) ||
            minValue != null || maxValue != null || minDigits != null || maxDigits != null
          ) {
            const validation = field.validation || new AjfValidationGroup();
            validation.forceValue = forceValue;
            validation.notEmpty = notEmpty ? AjfValidation.getNotEmptyCondition() : null;
            validation.minValue = minValue != null ? AjfValidation.getMinCondition(minValue) : null;
            validation.maxValue = maxValue != null ? AjfValidation.getMaxCondition(maxValue) : null;
            validation.minDigits = minDigits != null ?
              AjfValidation.getMinDigitsCondition(minDigits) : null;
            validation.maxDigits = maxDigits != null ?
              AjfValidation.getMaxDigitsCondition(maxDigits) : null;
            validation.conditions = (validationConditions || [])
              .map((c: {condition: string, errorMessage: string}) => new AjfValidation({
                condition: c.condition,
                errorMessage: c.errorMessage
              }));
            field.validation = validation;
          } else {
            field.validation = null;
          }
          const notEmptyWarning = properties['notEmptyWarning'];
          const warningConditions = properties['warningConditions'];
          if (
            notEmptyWarning != null ||
            (warningConditions != null && warningConditions.length > 0)
          ) {
            const warning = field.warning || new AjfWarningGroup();
            warning.notEmpty = notEmptyWarning ? AjfWarning.getNotEmptyWarning() : null;
            warning.conditions = (warningConditions || [])
              .map((w: {condition: string, warningMessage: string}) => new AjfWarning({
                condition: w.condition, warningMessage: w.warningMessage
              }));
            field.warning = warning;
          } else {
            field.warning = null;
          }
          field.nextSlideCondition = properties['nextSlideCondition'] != null ?
            new AjfCondition({ condition: properties['nextSlideCondition'] }) : null;

          if (field instanceof AjfFieldWithChoices) {
            const fwc = <AjfFieldWithChoices>field;
            let choicesOrigin: IAjfChoicesOrigin | null = null;
            let coIdx = 0;
            const coNum: number = choicesOrigins.length;
            while (choicesOrigin == null && coIdx < coNum) {
              if (choicesOrigins[coIdx].getName() === properties['choicesOrigin']) {
                choicesOrigin = choicesOrigins[coIdx];
              }
              coIdx++;
            }
            if (choicesOrigin != null) {
              fwc.choicesOrigin = choicesOrigin;
            }
            fwc.forceExpanded = properties['forceExpanded'];
            fwc.forceNarrow = properties['forceNarrow'];
            fwc.triggerConditions = (properties['triggerConditions'] || [])
              .map((t: string) => new AjfCondition({condition: t}));
          }
        }

        this._editedNodeEntry.next(null);

        return (nodes: AjfNode[]): AjfNode[] => {
          let cn = getNodeContainer({nodes}, origNode);
          if (cn != null) {
            if (cn instanceof AjfNode) {
              const idx = cn.nodes.indexOf(origNode);
              let newNodes = cn.nodes.slice(0, idx);
              newNodes.push(node);
              newNodes = newNodes.concat(cn.nodes.slice(idx + 1));
              cn.nodes = newNodes;
              nodes = nodes.slice(0);
            } else {
              const idx = nodes.indexOf(origNode);
              nodes = nodes.slice(0, idx).concat([node]).concat(nodes.slice(idx + 1));
            }
            if (newConditionalBranches < oldConditionalBranches) {
              for (let i = newConditionalBranches ; i < oldConditionalBranches ; i++) {
                nodes = deleteNodeSubtree(nodes, node, i);
              }
            }
          }
          return nodes;
        };
      })
    ).subscribe(this._nodesUpdates);
  }

  private _initDeleteNode(): void {
    (<Observable<AjfFormBuilderNodeEntry>>this._deleteNodeEntryEvent).pipe(
      map((nodeEntry: AjfFormBuilderNodeEntry) => {
        this._beforeNodesUpdate.emit();
        return (nodes: AjfNode[]): AjfNode[] => {
          const node = nodeEntry.node;
          let cn = getNodeContainer({nodes}, node);
          if (cn != null) {
            if (cn instanceof AjfNode) {
              const idx = cn.nodes.indexOf(node);
              let newNodes = cn.nodes.slice(0, idx);
              newNodes = newNodes.concat(cn.nodes.slice(idx + 1));
              cn.nodes = newNodes;
              nodes = nodes.slice(0);
            } else {
              const idx = nodes.indexOf(node);
              nodes = nodes.slice(0, idx).concat(nodes.slice(idx + 1));
            }
            nodes = deleteNodeSubtree(nodes, node);
          }
          return nodes;
        };
      })
    ).subscribe(this._nodesUpdates);
  }
}
