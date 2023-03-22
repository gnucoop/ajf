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

import {AjfCondition, AjfContext, getCodeIdentifiers} from '@ajf/core/models';
import {deepCopy} from '@ajf/core/utils';
import {EventEmitter, Injectable} from '@angular/core';
import {AbstractControl, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {format} from 'date-fns';
import {
  BehaviorSubject,
  from,
  Observable,
  of as obsOf,
  Subject,
  Subscriber,
  Subscription,
  timer,
} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  scan,
  share,
  startWith,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

import {AjfFieldInstance} from './interface/fields-instances/field-instance';
import {AjfFieldType} from './interface/fields/field-type';
import {AjfForm} from './interface/forms/form';
import {AjfTableFormControl} from './interface/forms/table-form-control';
import {AjfNodeGroupInstance} from './interface/nodes-instances/node-group-instance';
import {AjfNodeInstance} from './interface/nodes-instances/node-instance';
import {AjfRepeatingContainerNodeInstance} from './interface/nodes-instances/repeating-container-node-instance';
import {AjfNode} from './interface/nodes/node';
import {AjfNodeGroup} from './interface/nodes/node-group';
import {AjfNodeType} from './interface/nodes/node-type';
import {AjfNodesInstancesOperation} from './interface/operations/nodes-instances-operation';
import {AjfRendererUpdateMapOperation} from './interface/operations/renderer-update-map-operation';
import {AjfRendererUpdateMap} from './interface/renderer-maps/update-map';
import {AjfBaseSlideInstance} from './interface/slides-instances/base-slide-instance';
import {AjfRepeatingSlideInstance} from './interface/slides-instances/repeating-slide-instance';
import {AjfSlideInstance} from './interface/slides-instances/slide-instance';
import {initChoicesOrigin} from './utils/choices/init-choices-origin';
import {isFieldWithChoicesInstance} from './utils/fields-instances/is-field-with-choices-instance';
import {isTableFieldInstance} from './utils/fields-instances/is-table-field-instance';
import {updateFieldInstanceState} from './utils/fields-instances/update-field-instance-state';
import {updateFilteredChoices} from './utils/fields-instances/update-filtered-choices';
import {updateFormula} from './utils/fields-instances/update-formula';
import {updateNextSlideCondition} from './utils/fields-instances/update-next-slide-condition';
import {updateTriggerConditions} from './utils/fields-instances/update-trigger-conditions';
import {updateValidation} from './utils/fields-instances/update-validation';
import {updateWarning} from './utils/fields-instances/update-warning';
import {createField} from './utils/fields/create-field';
import {flattenNodesInstances} from './utils/nodes-instances/flatten-nodes-instances';
import {flattenNodesInstancesTree} from './utils/nodes-instances/flatten-nodes-instances-tree';
import {isFieldInstance} from './utils/nodes-instances/is-field-instance';
import {isNodeGroupInstance} from './utils/nodes-instances/is-node-group-instance';
import {isRepeatingContainerNodeInstance} from './utils/nodes-instances/is-repeating-container-node-instance';
import {isRepeatingGroupInstance} from './utils/nodes-instances/is-repeating-group-instance';
import {isRepeatingSlideInstance} from './utils/nodes-instances/is-repeating-slide-instance';
import {isSlideInstance} from './utils/nodes-instances/is-slide-instance';
import {isSlidesInstance} from './utils/nodes-instances/is-slides-instance';
import {nodeInstanceCompleteName} from './utils/nodes-instances/node-instance-complete-name';
import {nodeInstanceSuffix} from './utils/nodes-instances/node-instance-suffix';
import {nodeToNodeInstance} from './utils/nodes-instances/node-to-node-instance';
import {updateConditionalBranches} from './utils/nodes-instances/update-conditional-branches';
import {updateEditability} from './utils/nodes-instances/update-editability';
import {updateVisibility} from './utils/nodes-instances/update-visibility';
import {flattenNodes} from './utils/nodes/flatten-nodes';
import {isContainerNode} from './utils/nodes/is-container-node';
import {orderedNodes} from './utils/nodes/ordered-nodes';
import {updateRepsNum} from './utils/slides-instances/update-reps-num';
import {validSlide} from './utils/slides-instances/valid-slide';
import {AjfValidationService} from './validation-service';

export const enum AjfFormInitStatus {
  Initializing,
  Complete,
}

const updateSlideValidity = (slide: AjfRepeatingSlideInstance | AjfSlideInstance) => {
  const subNodesNum = slide.flatNodes.length;
  let valid = true;
  for (let i = 0; i < subNodesNum; i++) {
    const subNode = slide.flatNodes[i];
    if (subNode.visible && isFieldInstance(subNode) && !subNode.valid) {
      valid = false;
      break;
    }
  }
  if (slide.valid !== valid) {
    slide.valid = valid;
  }
};

@Injectable()
export class AjfFormRendererService {
  private _editabilityNodesMap!: Observable<AjfRendererUpdateMap>;
  private _editabilityNodesMapUpdates: Subject<AjfRendererUpdateMapOperation> =
    new Subject<AjfRendererUpdateMapOperation>();

  private _visibilityNodesMap!: Observable<AjfRendererUpdateMap>;
  private _visibilityNodesMapUpdates: Subject<AjfRendererUpdateMapOperation> =
    new Subject<AjfRendererUpdateMapOperation>();

  private _repetitionNodesMap!: Observable<AjfRendererUpdateMap>;
  private _repetitionNodesMapUpdates: Subject<AjfRendererUpdateMapOperation> =
    new Subject<AjfRendererUpdateMapOperation>();

  private _conditionalBranchNodesMap!: Observable<AjfRendererUpdateMap>;
  private _conditionalBranchNodesMapUpdates: Subject<AjfRendererUpdateMapOperation> =
    new Subject<AjfRendererUpdateMapOperation>();

  private _formulaNodesMap!: Observable<AjfRendererUpdateMap>;
  private _formulaNodesMapUpdates: Subject<AjfRendererUpdateMapOperation> =
    new Subject<AjfRendererUpdateMapOperation>();

  private _validationNodesMap!: Observable<AjfRendererUpdateMap>;
  private _validationNodesMapUpdates: Subject<AjfRendererUpdateMapOperation> =
    new Subject<AjfRendererUpdateMapOperation>();

  private _warningNodesMap!: Observable<AjfRendererUpdateMap>;
  private _warningNodesMapUpdates: Subject<AjfRendererUpdateMapOperation> =
    new Subject<AjfRendererUpdateMapOperation>();

  private _filteredChoicesNodesMap!: Observable<AjfRendererUpdateMap>;
  private _filteredChoicesNodesMapUpdates: Subject<AjfRendererUpdateMapOperation> =
    new Subject<AjfRendererUpdateMapOperation>();

  private _triggerConditionsNodesMap!: Observable<AjfRendererUpdateMap>;
  private _triggerConditionsNodesMapUpdates: Subject<AjfRendererUpdateMapOperation> =
    new Subject<AjfRendererUpdateMapOperation>();

  private _nextSlideConditionsNodesMap!: Observable<AjfRendererUpdateMap>;
  private _nextSlideConditionsNodesMapUpdates: Subject<AjfRendererUpdateMapOperation> =
    new Subject<AjfRendererUpdateMapOperation>();

  private _formInitEvent: EventEmitter<AjfFormInitStatus> = new EventEmitter<AjfFormInitStatus>();
  readonly formInitEvent: Observable<AjfFormInitStatus> = this
    ._formInitEvent as Observable<AjfFormInitStatus>;

  private _formGroup: BehaviorSubject<UntypedFormGroup | null> =
    new BehaviorSubject<UntypedFormGroup | null>(null);
  readonly formGroup: Observable<UntypedFormGroup | null> = this
    ._formGroup as Observable<UntypedFormGroup | null>;

  private _form: BehaviorSubject<{
    form: AjfForm | null;
    context?: AjfContext;
  } | null> = new BehaviorSubject<{
    form: AjfForm | null;
    context?: AjfContext;
  } | null>(null);
  private _nodes!: Observable<AjfNodeInstance[]>;
  private _flatNodes!: Observable<AjfNodeInstance[]>;
  private _flatNodesTree!: Observable<AjfSlideInstance[]>;
  private _nodesUpdates: Subject<AjfNodesInstancesOperation> =
    new Subject<AjfNodesInstancesOperation>();
  private _errorPositions!: Observable<number[]>;
  private _errors!: Observable<number>;

  private _formGroupSubscription: Subscription = Subscription.EMPTY;
  private _valueChanged: Subject<void> = new Subject<void>();

  private _nodesMaps!: Observable<AjfRendererUpdateMap>[];

  private _nextSlideTrigger: EventEmitter<AjfNodeInstance> = new EventEmitter<AjfNodeInstance>();
  readonly nextSlideTrigger: Observable<AjfNodeInstance> = this
    ._nextSlideTrigger as Observable<AjfNodeInstance>;

  private _slidesNum: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  readonly slidesNum: Observable<number> = this._slidesNum as Observable<number>;

  get nodesTree(): Observable<AjfSlideInstance[]> {
    return this._flatNodesTree;
  }
  get errorPositions(): Observable<number[]> {
    return this._errorPositions;
  }
  get errors(): Observable<number> {
    return this._errors;
  }
  get currentSupplementaryInformations(): any {
    const form = this._form.getValue();
    return form != null && form.form != null ? form.form.supplementaryInformations : null;
  }

  constructor(_: AjfValidationService) {
    this._initUpdateMapStreams();
    this._initNodesStreams();
    this._initErrorsStreams();
    this._initFormStreams();
    this._updateFormValueAndValidity();
  }

  setForm(form: AjfForm | null, context: AjfContext = {}) {
    this._initUpdateMapStreams();
    if (
      form != null &&
      Object.keys(context).length === 0 &&
      Object.keys(form.initContext || {}).length > 0
    ) {
      context = form.initContext || {};
    }
    const currentForm = this._form.getValue();
    if (
      (currentForm == null && form != null) ||
      (currentForm != null && form !== currentForm.form)
    ) {
      this._form.next({form: form, context: context});
    }
  }

  /**
   * Replace date values in this format "2023-03-28T22:00:00.000Z" with "yyyy-MM-dd" format
   * @param ctx
   */
  private _fixDates(ctx: any): void {
    if (ctx) {
      Object.keys(ctx).forEach(k => {
        const v = ctx[k];
        if (typeof v === 'string' && /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ$/.test(v)) {
          const d = format(new Date(v), 'yyyy-MM-dd');
          ctx[k] = d;
        }
      });
    }
  }

  getFormValue(): any {
    const formGroup = this._formGroup.getValue();
    if (formGroup == null) {
      return {};
    }
    let res = deepCopy(formGroup.value);
    this._fixDates(res);
    return res;
  }

  addGroup(group: AjfNodeGroupInstance | AjfRepeatingSlideInstance): Observable<boolean> {
    return new Observable<boolean>((subscriber: Subscriber<boolean>) => {
      if (group.formulaReps != null) {
        subscriber.next(false);
        subscriber.complete();
        return;
      }
      const maxReps = group.node.maxReps;
      if (maxReps > 0 && group.reps + 1 > maxReps) {
        subscriber.next(false);
        subscriber.complete();
        return;
      }
      const oldReps = group.reps;
      group.reps = group.reps + 1;
      group.canAdd = group.node.maxReps === 0 || group.reps < group.node.maxReps;
      group.canRemove = group.node.minReps === 0 || group.reps > group.node.minReps;
      this._nodesUpdates.next((nodes: AjfNodeInstance[]): AjfNodeInstance[] => {
        const flatNodes = flattenNodesInstances(nodes, true);
        this._adjustReps(flatNodes, group, oldReps, this.getFormValue());
        subscriber.next(true);
        subscriber.complete();
        return nodes;
      });
    });
  }

  removeGroup(group: AjfNodeGroupInstance | AjfRepeatingSlideInstance): Observable<boolean> {
    return new Observable<boolean>((subscriber: Subscriber<boolean>) => {
      if (group.formulaReps != null) {
        subscriber.next(false);
        subscriber.complete();
        return;
      }
      const minReps = group.node.minReps;
      if (group.reps - 1 < minReps) {
        subscriber.next(false);
        subscriber.complete();
        return;
      }
      const oldReps = group.reps;
      group.reps = group.reps - 1;
      group.canAdd = group.node.maxReps === 0 || group.reps < group.node.maxReps;
      group.canRemove = group.node.minReps === 0 || group.reps > group.node.minReps;
      this._nodesUpdates.next((nodes: AjfNodeInstance[]): AjfNodeInstance[] => {
        this._adjustReps(nodes, group, oldReps, this.getFormValue());
        subscriber.next(true);
        subscriber.complete();
        return nodes;
      });
    });
  }

  getControl(field: AjfFieldInstance | undefined): Observable<AbstractControl | null> {
    return this.formGroup.pipe(
      map(f => {
        if (field == null) {
          return null;
        }
        const fieldName = nodeInstanceCompleteName(field);
        return f != null && f.contains(fieldName) ? f.controls[fieldName] : null;
      }),
    );
  }

  private _initErrorsStreams(): void {
    this._errorPositions = this._valueChanged.pipe(
      withLatestFrom(this._nodes, this._form),
      filter(
        ([_, __, form]) =>
          form != null &&
          (
            form as {
              form: AjfForm | null;
              context?: AjfContext;
            }
          ).form != null,
      ),
      map(([_, nodes, formDef]) => {
        const form = (
          formDef as {
            form: AjfForm | null;
            context?: AjfContext;
          }
        ).form as AjfForm;
        let currentPosition = 0;
        const errors: number[] = [];
        nodes.forEach(node => {
          if (isRepeatingSlideInstance(node)) {
            for (let i = 0; i < node.reps; i++) {
              if (node.visible) {
                currentPosition++;
                if (i == 0) {
                  node.position = currentPosition;
                }
                if (!validSlide(node, i)) {
                  errors.push(currentPosition);
                }
              }
            }
          } else if (isSlideInstance(node)) {
            if (node.visible) {
              currentPosition++;
              node.position = currentPosition;
              if (!node.valid) {
                errors.push(currentPosition);
              }
            }
          }
        });
        form.valid = errors.length == 0;
        this._slidesNum.next(currentPosition);
        return errors;
      }),
      share(),
    );
    this._errors = this._errorPositions.pipe(
      map(e => (e != null ? e.length : 0)),
      startWith(0),
      share(),
    );
  }

  private _initUpdateMapStreams(): void {
    const startValue = (): AjfRendererUpdateMap => ({});
    this._editabilityNodesMap = (<Observable<AjfRendererUpdateMapOperation>>(
      this._editabilityNodesMapUpdates
    )).pipe(
      scan((rmap: AjfRendererUpdateMap, op: AjfRendererUpdateMapOperation) => {
        return op(rmap);
      }, {}),
      startWith(startValue()),
      share(),
    );
    this._visibilityNodesMap = (<Observable<AjfRendererUpdateMapOperation>>(
      this._visibilityNodesMapUpdates
    )).pipe(
      scan((rmap: AjfRendererUpdateMap, op: AjfRendererUpdateMapOperation) => {
        return op(rmap);
      }, {}),
      startWith(startValue()),
      share(),
    );
    this._repetitionNodesMap = (<Observable<AjfRendererUpdateMapOperation>>(
      this._repetitionNodesMapUpdates
    )).pipe(
      scan((rmap: AjfRendererUpdateMap, op: AjfRendererUpdateMapOperation) => {
        return op(rmap);
      }, {}),
      startWith(startValue()),
      share(),
    );
    this._conditionalBranchNodesMap = (<Observable<AjfRendererUpdateMapOperation>>(
      this._conditionalBranchNodesMapUpdates
    )).pipe(
      scan((rmap: AjfRendererUpdateMap, op: AjfRendererUpdateMapOperation) => {
        return op(rmap);
      }, {}),
      startWith(startValue()),
      share(),
    );
    this._formulaNodesMap = (<Observable<AjfRendererUpdateMapOperation>>(
      this._formulaNodesMapUpdates
    )).pipe(
      scan((rmap: AjfRendererUpdateMap, op: AjfRendererUpdateMapOperation) => {
        return op(rmap);
      }, {}),
      startWith(startValue()),
      share(),
    );
    this._validationNodesMap = (<Observable<AjfRendererUpdateMapOperation>>(
      this._validationNodesMapUpdates
    )).pipe(
      scan((rmap: AjfRendererUpdateMap, op: AjfRendererUpdateMapOperation) => {
        return op(rmap);
      }, {}),
      startWith(startValue()),
      share(),
    );
    this._warningNodesMap = (<Observable<AjfRendererUpdateMapOperation>>(
      this._warningNodesMapUpdates
    )).pipe(
      scan((rmap: AjfRendererUpdateMap, op: AjfRendererUpdateMapOperation) => {
        return op(rmap);
      }, {}),
      startWith(startValue()),
      share(),
    );
    this._filteredChoicesNodesMap = (<Observable<AjfRendererUpdateMapOperation>>(
      this._filteredChoicesNodesMapUpdates
    )).pipe(
      scan((rmap: AjfRendererUpdateMap, op: AjfRendererUpdateMapOperation) => {
        return op(rmap);
      }, {}),
      startWith(startValue()),
      share(),
    );
    this._triggerConditionsNodesMap = (<Observable<AjfRendererUpdateMapOperation>>(
      this._triggerConditionsNodesMapUpdates
    )).pipe(
      scan((rmap: AjfRendererUpdateMap, op: AjfRendererUpdateMapOperation) => {
        return op(rmap);
      }, {}),
      startWith(startValue()),
      share(),
    );
    this._nextSlideConditionsNodesMap = (<Observable<AjfRendererUpdateMapOperation>>(
      this._nextSlideConditionsNodesMapUpdates
    )).pipe(
      scan((rmap: AjfRendererUpdateMap, op: AjfRendererUpdateMapOperation) => {
        return op(rmap);
      }, {}),
      startWith(startValue()),
      share(),
    );

    this._nodesMaps = [
      this._editabilityNodesMap,
      this._visibilityNodesMap,
      this._repetitionNodesMap,
      this._conditionalBranchNodesMap,
      this._formulaNodesMap,
      this._validationNodesMap,
      this._warningNodesMap,
      this._nextSlideConditionsNodesMap,
      this._filteredChoicesNodesMap,
      this._triggerConditionsNodesMap,
    ];
  }

  private _initFormStreams(): void {
    const formObs = this._form;
    formObs
      .pipe(
        map(_form => {
          return this._initFormGroupStreams(new UntypedFormGroup({}));
        }),
      )
      .subscribe(this._formGroup);
    formObs
      .pipe(
        switchMap(form => {
          if (form == null || form.form == null) {
            return obsOf(form);
          }
          const choicesOrigins = form.form.choicesOrigins || [];
          if (choicesOrigins.length === 0) {
            return obsOf(form);
          }
          return from(Promise.all(choicesOrigins.map(co => initChoicesOrigin(co)))).pipe(
            map(() => form),
          );
        }),
        map(formDef => {
          return (_nodesInstances: AjfNodeInstance[]): AjfNodeInstance[] => {
            let nodes: AjfNodeInstance[];
            if (
              formDef != null &&
              (
                formDef as {
                  form: AjfForm | null;
                  context?: AjfContext;
                }
              ).form != null
            ) {
              const form = formDef as {
                form: AjfForm;
                context: AjfContext;
              };
              const baseNodes = form.form.nodes;
              nodes = this._orderedNodesInstancesTree(
                flattenNodes(baseNodes),
                baseNodes,
                undefined,
                [],
                form.context || {},
              );
            } else {
              nodes = [];
            }
            let currentPosition = 0;
            nodes.forEach(node => {
              if (isRepeatingSlideInstance(node)) {
                for (let i = 0; i < node.reps; i++) {
                  if (node.visible) {
                    currentPosition++;
                    if (i == 0) {
                      node.position = currentPosition;
                    }
                  }
                }
              } else if (isSlideInstance(node)) {
                if (node.visible) {
                  currentPosition++;
                  node.position = currentPosition;
                }
              }
            });
            return nodes;
          };
        }),
      )
      .subscribe(this._nodesUpdates);
  }

  private _initNodeInstance(
    allNodes: AjfNode[] | AjfNodeInstance[],
    node: AjfNode,
    prefix: number[],
    context: AjfContext,
    branchVisibility = true,
  ): AjfNodeInstance | null {
    let instance = nodeToNodeInstance(allNodes, node, prefix, context);
    if (instance == null) {
      return null;
    }
    if (isRepeatingGroupInstance(instance)) {
      this._explodeRepeatingNode(allNodes, instance, context);
    } else if (isSlideInstance(instance)) {
      instance.nodes = this._orderedNodesInstancesTree(
        allNodes,
        instance.node.nodes,
        instance.node.id,
        prefix,
        context,
      );
      updateEditability(instance, context);
    }
    updateVisibility(instance, context, branchVisibility);
    updateConditionalBranches(instance, context);
    if (isFieldInstance(instance)) {
      if (isFieldWithChoicesInstance(instance)) {
        updateFilteredChoices(instance, context);
      } else {
        if (isTableFieldInstance(instance)) {
          const {node} = instance;
          instance.context = context[nodeInstanceCompleteName(instance)] || context;
          const formGroup = this._formGroup.getValue();
          let controlsWithLabels: [string, (string | AjfTableFormControl)[]][] = [];
          controlsWithLabels.push([node.label, node.columnLabels]);
          if (formGroup != null) {
            const rowsNum = node.rows.length;
            for (let rowIdx = 0; rowIdx < rowsNum; rowIdx++) {
              const row = node.rows[rowIdx];
              let r: AjfTableFormControl[] = [];
              const cellNum = row.length;
              for (let idx = 0; idx < cellNum; idx++) {
                let cell = row[idx];
                if (typeof cell === 'string') {
                  cell = {formula: cell};
                }
                /*
                every control is registered with the cell position
                inside the form control matrix
                with this mask `${tNode.name}__${rowIdx}__${idx}`
                */
                const name = `${node.name}__${rowIdx}__${idx}`;
                const type = (node.columnTypes && node.columnTypes[idx]) || 'number';
                const tableFormControl: AjfTableFormControl = {
                  control: new UntypedFormControl(),
                  show: false,
                  type,
                };
                const value =
                  instance.context[cell.formula] && type === 'number'
                    ? +instance.context[cell.formula]
                    : instance.context[cell.formula];
                tableFormControl.control.setValue(value);
                formGroup.registerControl(name, tableFormControl.control);
                r.push(tableFormControl);
                /* create a object that respect the instance interface
                with the minimum defined properties to allow to run addToNodeFormula map*/
                const fakeInstance = {
                  formula: {formula: cell.formula},
                  node: {name, nodeType: 0, editable: false},
                  visible: true,
                  prefix: [],
                  conditionalBranches: [],
                  updatedEvt: new EventEmitter<void>(),
                } as unknown as AjfNodeInstance;
                this._addToNodesFormulaMap(fakeInstance, cell.formula);
              }
              controlsWithLabels.push([node.rowLabels[rowIdx], r]);
            }
            instance.controls = controlsWithLabels;
          }
        } else {
          instance.value = context[nodeInstanceCompleteName(instance)];
        }
      }
      updateFieldInstanceState(instance, context);
    }
    this._addNodeInstance(instance);
    return instance;
  }

  private _adjustReps(
    allNodes: AjfNode[] | AjfNodeInstance[],
    instance: AjfRepeatingContainerNodeInstance,
    oldReps: number,
    context: AjfContext,
  ): {added: AjfNodeInstance[] | null; removed: AjfNodeInstance[] | null} {
    const newReps = instance.reps;
    const result: {
      added: AjfNodeInstance[] | null;
      removed: AjfNodeInstance[] | null;
    } = {
      added: null,
      removed: null,
    };
    if (oldReps < newReps) {
      const newNodes: AjfNodeInstance[] = [];
      if (instance.nodes == null) {
        instance.nodes = [];
      }
      if (instance.node.nodeType === AjfNodeType.AjfNodeGroup) {
        const node = createField({
          id: 999,
          name: '',
          parent: -1,
          fieldType: AjfFieldType.Empty,
          label: instance.node.label,
        });
        const newInstance = this._initNodeInstance(
          allNodes,
          node,
          instance.prefix.slice(0),
          context,
        );
        if (newInstance != null) {
          instance.nodes.push(newInstance);
        }
      }
      for (let i = oldReps; i < newReps; i++) {
        const prefix = instance.prefix.slice(0);
        const group = instance.node;
        prefix.push(i);
        const orderedListNodes = orderedNodes(group.nodes, instance.node.id);
        orderedListNodes.forEach(n => {
          const newInstance = this._initNodeInstance(allNodes, n, prefix, context);
          if (newInstance != null) {
            newNodes.push(newInstance);
            instance.nodes.push(newInstance);
          }
        });
        this._addNodeInstance(instance);
      }
      result.added = newNodes;
    } else if (oldReps > newReps) {
      let nodesNum = instance.nodes.length / oldReps;
      if (instance.node.nodeType === AjfNodeType.AjfNodeGroup) {
        nodesNum++;
      }
      result.removed = instance.nodes.splice(newReps * nodesNum, nodesNum);
      result.removed.forEach(n => {
        this._removeNodeInstance(n);
      });
    }
    if (oldReps != newReps && instance.formulaReps == null) {
      const fg = this._formGroup.getValue();
      const completeName = nodeInstanceCompleteName(instance);
      if (fg != null && fg.contains(completeName)) {
        fg.controls[completeName].setValue(instance.reps);
      }
    }
    instance.flatNodes = flattenNodesInstances(instance.nodes);
    if (isRepeatingSlideInstance(instance)) {
      const slideNodes: AjfNodeInstance[][] = [];
      const nodesPerSlide = instance.nodes != null ? instance.nodes.length / instance.reps : 0;
      for (let i = 0; i < instance.reps; i++) {
        const startNode = i * nodesPerSlide;
        slideNodes.push(instance.nodes.slice(startNode, startNode + nodesPerSlide));
      }
      instance.slideNodes = slideNodes;
    }
    return result;
  }

  private _updateFormValueAndValidity(): void {
    this._nodesUpdates
      .pipe(
        withLatestFrom(this._formGroup),
        filter(([_, fg]) => fg !== null),
      )
      .subscribe(([_, fg]) => {
        const form = fg as UntypedFormGroup;
        form.updateValueAndValidity();
      });
  }

  private _explodeRepeatingNode(
    allNodes: AjfNode[] | AjfNodeInstance[],
    instance: AjfNodeGroupInstance | AjfRepeatingSlideInstance,
    context: AjfContext,
  ) {
    const oldReps = updateRepsNum(instance, context);
    if (oldReps !== instance.reps) {
      this._adjustReps(allNodes, instance, oldReps, context);
    }
  }

  private _orderedNodesInstancesTree(
    allNodes: AjfNode[] | AjfNodeInstance[],
    nodes: AjfNode[],
    parent: number | null = null,
    prefix: number[] = [],
    context: AjfContext,
  ): AjfNodeInstance[] {
    let nodesInstances: AjfNodeInstance[] = [];
    const curSuffix = prefix.length > 0 ? '__' + prefix.join('__') : '';
    orderedNodes(nodes, parent).forEach((node: AjfNode) => {
      const parentNodeInstance = nodesInstances.find(
        ni => ni.node.id == node.parent && nodeInstanceSuffix(ni) == curSuffix,
      );
      const branchVisibility =
        parentNodeInstance != null
          ? parentNodeInstance.verifiedBranch != null &&
            parentNodeInstance.verifiedBranch == node.parentNode
          : true;
      const nni = this._initNodeInstance(allNodes, node, prefix, context, branchVisibility);
      if (nni != null) {
        nodesInstances.push(nni);
      }
    });
    return nodesInstances;
  }

  private _formValueDelta(oldValue: any, newValue: any): string[] {
    const allKeys = [] as string[];
    [...Object.keys(oldValue), ...Object.keys(newValue)].forEach(key => {
      if (key !== '$value' && allKeys.indexOf(key) === -1) {
        allKeys.push(key);
      }
    });
    return allKeys.filter(k => oldValue[k] !== newValue[k]);
  }

  private _initFormGroupStreams(formGroup: UntypedFormGroup): UntypedFormGroup {
    this._formGroupSubscription.unsubscribe();
    let init = true;
    let initForm = true;
    this._formInitEvent.emit(AjfFormInitStatus.Initializing);
    this._formGroupSubscription = formGroup.valueChanges
      .pipe(
        startWith({}),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        pairwise(),
        withLatestFrom(
          this._nodesMaps[0],
          this._nodesMaps[1],
          this._nodesMaps[2],
          this._nodesMaps[3],
          this._nodesMaps[4],
          this._nodesMaps[5],
          this._nodesMaps[6],
          this._nodesMaps[7],
          this._nodesMaps[8],
          this._nodesMaps[9],
          this._flatNodes,
        ),
      )
      .subscribe(v => {
        const oldFormValue = (init && {}) || v[0][0];
        init = false;
        const newFormValue = v[0][1];
        const editability = v[1];
        const visibilityMap = v[2];
        const repetitionMap = v[3];
        const conditionalBranchesMap = v[4];
        const formulaMap = v[5];
        const validationMap = v[6];
        const warningMap = v[7];
        const nextSlideConditionsMap = v[8];
        const filteredChoicesMap = v[9];
        const triggerConditionsMap = v[10];
        const nodes = v[11];

        // takes the names of the fields that have changed
        const delta = this._formValueDelta(oldFormValue, newFormValue);
        const deltaLen = delta.length;
        let updatedNodes: AjfNodeInstance[] = [];

        /*
                        for each field update all properties map
                        with the following rule  "if fieldname is in map update it" and
                        push on updateNodes the node instance that wrap field
                      */
        delta.forEach(fieldName => {
          updatedNodes = updatedNodes.concat(
            nodes.filter(n => nodeInstanceCompleteName(n) === fieldName),
          );
          if (editability[fieldName] != null) {
            editability[fieldName].forEach(nodeInstance => {
              if (isSlideInstance(nodeInstance)) {
                updateEditability(nodeInstance, newFormValue);
              }
            });
          }
          if (visibilityMap[fieldName] != null) {
            visibilityMap[fieldName].forEach(nodeInstance => {
              updateVisibilityMapEntry(nodeInstance, this._formGroup, newFormValue);
              if (updatedNodes.indexOf(nodeInstance) === -1) {
                updatedNodes.push(nodeInstance);
              }
            });
          }

          if (repetitionMap[fieldName] != null) {
            repetitionMap[fieldName].forEach(nodeInstance => {
              updateRepetitionMapEntry(nodeInstance, newFormValue, nodes, this._adjustReps);
              if (updatedNodes.indexOf(nodeInstance) === -1) {
                updatedNodes.push(nodeInstance);
              }
            });
          }

          if (conditionalBranchesMap[fieldName] != null) {
            conditionalBranchesMap[fieldName].forEach(nodeInstance => {
              updateConditionalBranchesMapEntry(
                nodeInstance,
                newFormValue,
                nodes,
                this._showSubtree,
                this._hideSubtree,
              );
              if (updatedNodes.indexOf(nodeInstance) === -1) {
                updatedNodes.push(nodeInstance);
              }
            });
          }

          if (formulaMap[fieldName] != null) {
            formulaMap[fieldName].forEach(nodeInstance => {
              updateFormulaMapEntry(nodeInstance, newFormValue, this._formGroup);
              if (updatedNodes.indexOf(nodeInstance) === -1) {
                updatedNodes.push(nodeInstance);
              }
            });
          }

          if (validationMap[fieldName] != null) {
            validationMap[fieldName].forEach(nodeInstance => {
              updateValidationMapEntry(
                nodeInstance,
                newFormValue,
                this.currentSupplementaryInformations,
              );
              if (updatedNodes.indexOf(nodeInstance) === -1) {
                updatedNodes.push(nodeInstance);
              }
            });
          }

          if (warningMap[fieldName] != null) {
            warningMap[fieldName].forEach(nodeInstance => {
              updateWarningMapEntry(nodeInstance, newFormValue);
              if (updatedNodes.indexOf(nodeInstance) === -1) {
                updatedNodes.push(nodeInstance);
              }
            });
          }

          if (deltaLen == 1 && nextSlideConditionsMap[fieldName] != null) {
            if (
              nextSlideConditionsMap[fieldName].filter(nodeInstance => {
                if (isFieldInstance(nodeInstance)) {
                  return updateNextSlideCondition(nodeInstance, newFormValue);
                }
                return false;
              }).length == 1
            ) {
              this._nextSlideTrigger.emit();
            }
          }

          if (filteredChoicesMap[fieldName] != null) {
            filteredChoicesMap[fieldName].forEach(nodeInstance => {
              updateFilteredChoicesMapEntry(nodeInstance, newFormValue);
              if (updatedNodes.indexOf(nodeInstance) === -1) {
                updatedNodes.push(nodeInstance);
              }
            });
          }

          if (deltaLen == 1 && triggerConditionsMap[fieldName] != null) {
            const res = triggerConditionsMap[fieldName].filter(nodeInstance => {
              if (!isFieldWithChoicesInstance(nodeInstance)) {
                return false;
              }
              return updateTriggerConditions(nodeInstance, newFormValue);
            });
            if (res.length == 1 && isFieldWithChoicesInstance(res[0])) {
              res[0].selectionTrigger.emit();
            }
          }
        });
        updatedNodes.forEach(n => {
          const nodeIdx = nodes.indexOf(n);
          let idx = nodeIdx - 1;
          while (idx >= 0) {
            const curNode = nodes[idx];
            if (isSlidesInstance(curNode)) {
              updateSlideValidity(curNode);
              curNode.updatedEvt.emit();
            }
            idx--;
          }
          n.updatedEvt.emit();
        });
        if (initForm) {
          initForm = false;
          this._formInitEvent.emit(AjfFormInitStatus.Complete);
        }
        this._valueChanged.next();
      });
    return formGroup;
  }

  private _showSubtree(
    context: AjfContext,
    nodes: AjfNodeInstance[],
    node: AjfNodeInstance,
    branch?: number,
  ) {
    this._updateSubtreeVisibility(context, nodes, node, true, branch);
  }

  private _hideSubtree(
    context: AjfContext,
    nodes: AjfNodeInstance[],
    node: AjfNodeInstance,
    branch?: number,
  ) {
    this._updateSubtreeVisibility(context, nodes, node, false, branch);
  }

  private _updateSubtreeVisibility(
    context: AjfContext,
    nodes: AjfNodeInstance[],
    node: AjfNodeInstance,
    visible: boolean,
    branch?: number,
  ) {
    let subNodes: AjfNodeInstance[];
    const nodeSuffix = nodeInstanceSuffix(node);
    if (branch != null) {
      subNodes = nodes.filter(n => {
        const suffix = nodeInstanceSuffix(n);
        return suffix == nodeSuffix && n.node.parent == node.node.id && n.node.parentNode == branch;
      });
    } else {
      subNodes = nodes.filter(n => {
        const suffix = nodeInstanceSuffix(n);
        return suffix == nodeSuffix && n.node.parent == node.node.id;
      });
    }
    const isContainer = isContainerNode(node.node);
    subNodes.forEach(n => {
      if (
        !isContainer ||
        (isContainer && (<AjfNodeGroup>node.node).nodes.find(cn => cn.id == n.node.id) == null)
      ) {
        updateVisibility(n, context, visible);
        if (isFieldInstance(n)) {
          updateFormula(n, context);
        }
        this._updateSubtreeVisibility(context, nodes, n, visible);
      }
    });
  }

  private _initNodesStreams(): void {
    this._nodes = this._nodesUpdates.pipe(
      scan((nodes: AjfNodeInstance[], op: AjfNodesInstancesOperation) => {
        return op(nodes);
      }, []),
      share(),
    );
    this._flatNodesTree = this._nodes.pipe(
      map(nodes => flattenNodesInstancesTree(nodes)),
      share(),
    );
    this._flatNodes = this._flatNodesTree.pipe(
      map(slides => {
        let nodes: AjfNodeInstance[] = [];
        slides.forEach(s => {
          nodes.push(s);
          nodes = nodes.concat(s.flatNodes);
          updateSlideValidity(s);
        });
        return nodes;
      }),
      share(),
    );
  }

  private _removeNodeInstance(nodeInstance: AjfNodeInstance): AjfNodeInstance {
    const nodeName = nodeInstanceCompleteName(nodeInstance);
    const fg = this._formGroup.getValue();
    if (fg != null) {
      const curValue = fg.value;
      const newFormValue = {...curValue, [nodeName]: undefined};
      fg.patchValue(newFormValue);
    }
    this._removeNodesVisibilityMapIndex(nodeName);
    this._removeNodesRepetitionMapIndex(nodeName);
    this._removeNodesConditionalBranchMapIndex(nodeName);
    this._removeNodesFormulaMapIndex(nodeName);
    this._removeNodesValidationMapIndex(nodeName);
    this._removeNodesWarningMapIndex(nodeName);
    this._removeNodesNextSlideConditionsMapIndex(nodeName);
    this._removeNodesFilteredChoicesMapIndex(nodeName);
    this._removeNodesTriggerConditionsMapIndex(nodeName);
    if (isSlidesInstance(nodeInstance)) {
      this._removeNodesEditabilityMapIndex(nodeName);
      return this._removeSlideInstance(nodeInstance);
    } else if (isRepeatingContainerNodeInstance(nodeInstance)) {
      this._removeNodeGroupInstance(nodeInstance);
    } else if (isFieldInstance(nodeInstance)) {
      this._removeFieldInstance(nodeInstance);
    }

    return nodeInstance;
  }

  private _removeSlideInstance(slideInstance: AjfBaseSlideInstance): AjfBaseSlideInstance {
    const slide = slideInstance.node;
    if (slide.visibility != null) {
      this._removeFromNodesVisibilityMap(slideInstance, slide.visibility.condition);
    }
    slideInstance.conditionalBranches.forEach((conditionalBranch: AjfCondition) => {
      this._removeFromNodesConditionalBranchMap(slideInstance, conditionalBranch.condition);
    });
    return slideInstance;
  }

  private _removeNodeGroupInstance(
    nodeGroupInstance: AjfRepeatingContainerNodeInstance,
  ): AjfRepeatingContainerNodeInstance {
    const nodeGroup = nodeGroupInstance.node;
    if (nodeGroup.visibility != null) {
      this._removeFromNodesVisibilityMap(nodeGroupInstance, nodeGroup.visibility.condition);
    }
    if (nodeGroupInstance.formulaReps != null && nodeGroup.formulaReps != null) {
      this._removeFromNodesRepetitionMap(nodeGroupInstance, nodeGroup.formulaReps.formula);
    }
    return nodeGroupInstance;
  }

  private _removeFieldInstance(fieldInstance: AjfFieldInstance): AjfFieldInstance {
    const formGroup = this._formGroup.getValue();
    const fieldInstanceName = nodeInstanceCompleteName(fieldInstance);
    if (formGroup != null && formGroup.contains(fieldInstanceName)) {
      formGroup.removeControl(fieldInstanceName);
    }
    if (fieldInstance.validation != null) {
      this._validationNodesMapUpdates.next((vmap: AjfRendererUpdateMap): AjfRendererUpdateMap => {
        if (vmap[fieldInstanceName] == null) {
          delete vmap[fieldInstanceName];
        }
        return vmap;
      });
    }

    if (fieldInstance.visibility != null) {
      this._removeFromNodesVisibilityMap(fieldInstance, fieldInstance.visibility.condition);
    }

    fieldInstance.conditionalBranches.forEach((conditionalBranch: AjfCondition) => {
      this._removeFromNodesConditionalBranchMap(fieldInstance, conditionalBranch.condition);
    });

    if (fieldInstance.formula) {
      this._removeFromNodesFormulaMap(fieldInstance, fieldInstance.formula.formula);
    }

    // TODO: check this, probably is never verified
    if (isRepeatingContainerNodeInstance(fieldInstance)) {
      if (fieldInstance.formulaReps != null) {
        this._removeFromNodesRepetitionMap(fieldInstance, fieldInstance.formulaReps.formula);
      }
    }

    if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
      fieldInstance.validation.conditions.forEach(condition => {
        this._removeFromNodesValidationMap(fieldInstance, condition.condition);
      });
    }

    if (fieldInstance.warning != null) {
      fieldInstance.warning.conditions.forEach(condition => {
        this._removeFromNodesWarningMap(fieldInstance, condition.condition);
      });
    }

    if (fieldInstance.nextSlideCondition != null) {
      this._removeFromNodesNextSlideConditionsMap(
        fieldInstance,
        fieldInstance.nextSlideCondition.condition,
      );
    }

    if (isFieldWithChoicesInstance(fieldInstance)) {
      if (fieldInstance.choicesFilter != null) {
        this._removeFromNodesFilteredChoicesMap(fieldInstance, fieldInstance.choicesFilter.formula);
        if (fieldInstance.triggerConditions != null) {
          fieldInstance.triggerConditions.forEach(condition => {
            this._removeFromNodesTriggerConditionsMap(fieldInstance, condition.condition);
          });
        }
      }
    }

    return fieldInstance;
  }

  private _addNodeInstance(nodeInstance: AjfNodeInstance): AjfNodeInstance {
    if (isRepeatingContainerNodeInstance(nodeInstance)) {
      return this._addNodeGroupInstance(nodeInstance);
    } else if (isSlideInstance(nodeInstance)) {
      return this._addSlideInstance(nodeInstance);
    } else if (isFieldInstance(nodeInstance)) {
      return this._addFieldInstance(nodeInstance);
    }

    return nodeInstance;
  }

  private _addFieldInstance(fieldInstance: AjfFieldInstance): AjfFieldInstance {
    const formGroup = this._formGroup.getValue();
    const fieldInstanceName = nodeInstanceCompleteName(fieldInstance);
    if (formGroup != null && !formGroup.contains(fieldInstanceName)) {
      const control = new UntypedFormControl();
      control.setValue(fieldInstance.value);
      formGroup.registerControl(fieldInstanceName, control);
    }
    if (fieldInstance.validation != null) {
      this._validationNodesMapUpdates.next((vmap: AjfRendererUpdateMap): AjfRendererUpdateMap => {
        if (vmap[fieldInstanceName] == null) {
          vmap[fieldInstanceName] = [];
        }
        if (vmap[fieldInstanceName].indexOf(fieldInstance) == -1) {
          vmap[fieldInstanceName].push(fieldInstance);
        }
        return vmap;
      });
    } else {
      fieldInstance.valid = true;
    }

    if (fieldInstance.visibility != null) {
      this._addToNodesVisibilityMap(fieldInstance, fieldInstance.visibility.condition);
    }

    fieldInstance.conditionalBranches.forEach((conditionalBranch: AjfCondition) => {
      this._addToNodesConditionalBranchMap(fieldInstance, conditionalBranch.condition);
    });

    if (fieldInstance.formula) {
      this._addToNodesFormulaMap(fieldInstance, fieldInstance.formula.formula);
    }

    if (isNodeGroupInstance(fieldInstance)) {
      if (fieldInstance.formulaReps != null) {
        this._addToNodesRepetitionMap(fieldInstance, fieldInstance.formulaReps.formula);
      }
    }

    if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
      fieldInstance.validation.conditions.forEach(condition => {
        this._addToNodesValidationMap(fieldInstance, condition.condition);
      });
    }

    if (fieldInstance.warning != null) {
      fieldInstance.warning.conditions.forEach(condition => {
        this._addToNodesWarningMap(fieldInstance, condition.condition);
      });
    }

    if (fieldInstance.nextSlideCondition != null) {
      this._addToNodesNextSlideConditionsMap(
        fieldInstance,
        fieldInstance.nextSlideCondition.condition,
      );
    }

    if (isFieldWithChoicesInstance(fieldInstance)) {
      if (fieldInstance.choicesFilter != null) {
        this._addToNodesFilteredChoicesMap(fieldInstance, fieldInstance.choicesFilter.formula);
      }
      if (fieldInstance.triggerConditions != null) {
        fieldInstance.triggerConditions.forEach((condition: AjfCondition) => {
          this._addToNodesTriggerConditionsMap(fieldInstance, condition.condition);
        });
      }
    }

    return fieldInstance;
  }

  private _addSlideInstance(slideInstance: AjfSlideInstance): AjfSlideInstance {
    const slide = slideInstance.node;
    if (slide.readonly != null) {
      this._addToNodesEditabilityMap(slideInstance, slide.readonly.condition);
    }
    if (slide.visibility != null) {
      this._addToNodesVisibilityMap(slideInstance, slide.visibility.condition);
    }
    slideInstance.conditionalBranches.forEach((conditionalBranch: AjfCondition) => {
      this._addToNodesConditionalBranchMap(slideInstance, conditionalBranch.condition);
    });
    return slideInstance;
  }

  private _addNodeGroupInstance(
    nodeGroupInstance: AjfRepeatingContainerNodeInstance,
  ): AjfRepeatingContainerNodeInstance {
    const nodeGroup = nodeGroupInstance.node;
    if (nodeGroup.visibility != null) {
      this._addToNodesVisibilityMap(nodeGroupInstance, nodeGroup.visibility.condition);
    }
    nodeGroupInstance.conditionalBranches.forEach((conditionalBranch: AjfCondition) => {
      this._addToNodesConditionalBranchMap(nodeGroupInstance, conditionalBranch.condition);
    });
    if (nodeGroupInstance.formulaReps != null) {
      if (nodeGroup.formulaReps != null) {
        this._addToNodesRepetitionMap(nodeGroupInstance, nodeGroup.formulaReps.formula);
      }
    } else {
      let formGroup = this._formGroup.getValue();
      let nodeGroupInstanceName = nodeInstanceCompleteName(nodeGroupInstance);
      if (formGroup != null && !formGroup.contains(nodeGroupInstanceName)) {
        const control = new UntypedFormControl();
        control.setValue(nodeGroupInstance.reps);
        formGroup.registerControl(nodeGroupInstanceName, control);
      }
    }
    return nodeGroupInstance;
  }
  private _removeNodesEditabilityMapIndex(index: string): void {
    this._removeNodesMapIndex(this._editabilityNodesMapUpdates, index);
  }
  private _removeNodesVisibilityMapIndex(index: string): void {
    this._removeNodesMapIndex(this._visibilityNodesMapUpdates, index);
  }

  private _removeNodesRepetitionMapIndex(index: string): void {
    this._removeNodesMapIndex(this._repetitionNodesMapUpdates, index);
  }

  private _removeNodesConditionalBranchMapIndex(index: string): void {
    this._removeNodesMapIndex(this._conditionalBranchNodesMapUpdates, index);
  }

  private _removeNodesFormulaMapIndex(index: string): void {
    this._removeNodesMapIndex(this._formulaNodesMapUpdates, index);
  }

  private _removeNodesValidationMapIndex(index: string): void {
    this._removeNodesMapIndex(this._validationNodesMapUpdates, index);
  }

  private _removeNodesWarningMapIndex(index: string): void {
    this._removeNodesMapIndex(this._warningNodesMapUpdates, index);
  }

  private _removeNodesFilteredChoicesMapIndex(index: string): void {
    this._removeNodesMapIndex(this._filteredChoicesNodesMapUpdates, index);
  }

  private _removeNodesTriggerConditionsMapIndex(index: string): void {
    this._removeNodesMapIndex(this._triggerConditionsNodesMapUpdates, index);
  }

  private _removeNodesNextSlideConditionsMapIndex(index: string): void {
    this._removeNodesMapIndex(this._nextSlideConditionsNodesMapUpdates, index);
  }

  private _removeNodesMapIndex(nodesMap: Subject<AjfRendererUpdateMapOperation>, index: string) {
    nodesMap.next((vmap: AjfRendererUpdateMap): AjfRendererUpdateMap => {
      if (Object.keys(vmap).indexOf(index) > -1) {
        delete vmap[index];
      }
      return vmap;
    });
  }

  private _removeFromNodesVisibilityMap(nodeInstance: AjfNodeInstance, formula: string): void {
    this._removeFromNodesMap(this._visibilityNodesMapUpdates, nodeInstance, formula);
  }

  private _removeFromNodesRepetitionMap(nodeInstance: AjfNodeInstance, formula: string): void {
    this._removeFromNodesMap(this._repetitionNodesMapUpdates, nodeInstance, formula);
  }

  private _removeFromNodesConditionalBranchMap(
    nodeInstance: AjfNodeInstance,
    formula: string,
  ): void {
    this._removeFromNodesMap(this._conditionalBranchNodesMapUpdates, nodeInstance, formula);
  }

  private _removeFromNodesFormulaMap(nodeInstance: AjfNodeInstance, formula: string): void {
    this._removeFromNodesMap(this._formulaNodesMapUpdates, nodeInstance, formula);
  }

  private _removeFromNodesValidationMap(nodeInstance: AjfNodeInstance, formula: string): void {
    this._removeFromNodesMap(this._validationNodesMapUpdates, nodeInstance, formula);
  }

  private _removeFromNodesWarningMap(nodeInstance: AjfNodeInstance, formula: string): void {
    this._removeFromNodesMap(this._warningNodesMapUpdates, nodeInstance, formula);
  }

  private _removeFromNodesFilteredChoicesMap(nodeInstance: AjfNodeInstance, formula: string): void {
    this._removeFromNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
  }

  private _removeFromNodesTriggerConditionsMap(
    nodeInstance: AjfNodeInstance,
    formula: string,
  ): void {
    this._removeFromNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
  }

  private _removeFromNodesNextSlideConditionsMap(
    nodeInstance: AjfNodeInstance,
    formula: string,
  ): void {
    this._removeFromNodesMap(this._nextSlideConditionsNodesMapUpdates, nodeInstance, formula);
  }

  private _removeFromNodesMap(
    nodesMap: Subject<AjfRendererUpdateMapOperation>,
    nodeInstance: AjfNodeInstance,
    formula: string,
  ): void {
    const tokens = getCodeIdentifiers(formula);
    if (tokens.length > 0) {
      nodesMap.next((vmap: AjfRendererUpdateMap): AjfRendererUpdateMap => {
        tokens.forEach(token => {
          if (vmap[token] != null) {
            const idx = vmap[token].indexOf(nodeInstance);
            if (idx > -1) {
              vmap[token].splice(idx, 1);
              if (vmap[token].length == 0) {
                delete vmap[token];
              }
            }
          }
        });
        return vmap;
      });
    }
  }

  private _addToNodesEditabilityMap(nodeInstance: AjfNodeInstance, formula: string): void {
    this._addToNodesMap(this._editabilityNodesMapUpdates, nodeInstance, formula);
  }

  private _addToNodesVisibilityMap(nodeInstance: AjfNodeInstance, formula: string): void {
    this._addToNodesMap(this._visibilityNodesMapUpdates, nodeInstance, formula);
  }

  private _addToNodesRepetitionMap(nodeInstance: AjfNodeInstance, formula: string): void {
    this._addToNodesMap(this._repetitionNodesMapUpdates, nodeInstance, formula);
  }

  private _addToNodesConditionalBranchMap(nodeInstance: AjfNodeInstance, formula: string): void {
    this._addToNodesMap(this._conditionalBranchNodesMapUpdates, nodeInstance, formula);
  }

  private _addToNodesFormulaMap(nodeInstance: AjfNodeInstance, formula: string): void {
    this._addToNodesMap(this._formulaNodesMapUpdates, nodeInstance, formula);
  }

  private _addToNodesValidationMap(nodeInstance: AjfNodeInstance, formula: string): void {
    this._addToNodesMap(this._validationNodesMapUpdates, nodeInstance, formula);
  }

  private _addToNodesWarningMap(nodeInstance: AjfNodeInstance, formula: string): void {
    this._addToNodesMap(this._warningNodesMapUpdates, nodeInstance, formula);
  }

  private _addToNodesFilteredChoicesMap(nodeInstance: AjfNodeInstance, formula: string): void {
    this._addToNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
  }

  private _addToNodesTriggerConditionsMap(nodeInstance: AjfNodeInstance, formula: string): void {
    this._addToNodesMap(this._triggerConditionsNodesMapUpdates, nodeInstance, formula);
  }

  private _addToNodesNextSlideConditionsMap(nodeInstance: AjfNodeInstance, formula: string): void {
    this._addToNodesMap(this._nextSlideConditionsNodesMapUpdates, nodeInstance, formula);
  }

  private _addToNodesMap(
    nodesMap: Subject<AjfRendererUpdateMapOperation>,
    nodeInstance: AjfNodeInstance,
    formula: string,
  ): void {
    const tokens = getCodeIdentifiers(formula);
    if (tokens.length > 0) {
      nodesMap.next((vmap: AjfRendererUpdateMap): AjfRendererUpdateMap => {
        tokens.forEach(token => {
          if (vmap[token] == null) {
            vmap[token] = [];
          }
          if (vmap[token].indexOf(nodeInstance) === -1) {
            vmap[token].push(nodeInstance);
          }
        });
        return vmap;
      });
    }
  }
}

const updateVisibilityMapEntry = (
  nodeInstance: AjfNodeInstance,
  formGroup: BehaviorSubject<UntypedFormGroup | null>,
  newFormValue: any,
) => {
  const completeName = nodeInstanceCompleteName(nodeInstance);
  const visibilityChanged = updateVisibility(nodeInstance, newFormValue);
  const isField = isFieldInstance(nodeInstance);
  if (visibilityChanged && !nodeInstance.visible) {
    const fg = formGroup.getValue();
    if (fg != null) {
      const s = timer(200).subscribe(() => {
        if (s && !s.closed) {
          s.unsubscribe();
        }
        if (fg.controls != null && fg.controls[completeName] != null) {
          fg.controls[completeName].setValue(null);
        }
      });
    }
    if (isField) {
      nodeInstance.value = null;
    }
  } else if (visibilityChanged && nodeInstance.visible && isField) {
    const fg = formGroup.getValue();
    const res = updateFormula(nodeInstance, newFormValue);
    if (fg != null && res.changed && fg.controls != null && fg.controls[completeName] != null) {
      fg.controls[completeName].setValue(res.value);
    }
  }
};

const updateRepetitionMapEntry = (
  nodeInstance: AjfNodeInstance,
  newFormValue: any,
  nodes: AjfNodeInstance[],
  cb: (
    allNodes: AjfNode[] | AjfNodeInstance[],
    instance: AjfRepeatingContainerNodeInstance,
    oldReps: number,
    context: AjfContext,
  ) => {added: AjfNodeInstance[] | null; removed: AjfNodeInstance[] | null},
) => {
  if (isRepeatingContainerNodeInstance(nodeInstance)) {
    const oldReps = updateRepsNum(nodeInstance, newFormValue);
    if (oldReps !== nodeInstance.reps) {
      cb(nodes, nodeInstance, oldReps, newFormValue);
    }
  }
};

const updateConditionalBranchesMapEntry = (
  nodeInstance: AjfNodeInstance,
  newFormValue: any,
  nodes: AjfNodeInstance[],
  showCb: (
    context: AjfContext,
    nodes: AjfNodeInstance[],
    node: AjfNodeInstance,
    branch?: number,
  ) => void,
  hideCb: (
    context: AjfContext,
    nodes: AjfNodeInstance[],
    node: AjfNodeInstance,
    branch?: number,
  ) => void,
) => {
  // const branchChanged =
  // nodeInstance.updateConditionalBranches(newFormValue);
  updateConditionalBranches(nodeInstance, newFormValue);
  // if (branchChanged) {
  const verifiedBranch = nodeInstance.verifiedBranch;
  nodeInstance.conditionalBranches.forEach((_condition, idx) => {
    if (idx == verifiedBranch) {
      showCb(newFormValue, nodes, nodeInstance, idx);
    } else {
      hideCb(newFormValue, nodes, nodeInstance, idx);
    }
  });
  // }
};

const updateFormulaMapEntry = (
  nodeInstance: AjfNodeInstance,
  newFormValue: any,
  formGroup: BehaviorSubject<UntypedFormGroup | null>,
) => {
  if (isFieldInstance(nodeInstance)) {
    const res = updateFormula(nodeInstance, newFormValue);
    const fg = formGroup.getValue();
    if (fg != null && res.changed) {
      updateValidation(nodeInstance, newFormValue);
      fg.controls[nodeInstanceCompleteName(nodeInstance)].setValue(res.value);
    }
  }
};

const updateValidationMapEntry = (nodeInstance: AjfNodeInstance, newFormValue: any, supp: any) => {
  if (isFieldInstance(nodeInstance)) {
    newFormValue.$value = newFormValue[nodeInstanceCompleteName(nodeInstance)];
    updateValidation(nodeInstance, newFormValue, supp);
  }
};

const updateWarningMapEntry = (nodeInstance: AjfNodeInstance, newFormValue: any) => {
  if (isFieldInstance(nodeInstance)) {
    updateWarning(nodeInstance, newFormValue);
    if (
      nodeInstance.warningResults != null &&
      nodeInstance.warningResults.filter(warning => warning.result).length > 0
    ) {
      nodeInstance.warningTrigger.emit();
    }
  }
};

const updateFilteredChoicesMapEntry = (nodeInstance: AjfNodeInstance, newFormValue: any) => {
  if (isFieldWithChoicesInstance(nodeInstance)) {
    updateFilteredChoices(nodeInstance, newFormValue);
  }
};
