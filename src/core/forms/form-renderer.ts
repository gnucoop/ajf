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

import {EventEmitter, Injectable} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

import {BehaviorSubject, Observable, Subject, Subscriber, Subscription, timer} from 'rxjs';
import {
  debounceTime, filter, map, pairwise, publishReplay, refCount,
  scan, share, startWith, withLatestFrom
} from 'rxjs/operators';

import {AjfCondition} from '@ajf/core/models';
import {deepCopy} from '@ajf/core/utils';
import {AjfForm} from './forms';
import {AjfEmptyField, AjfNode, AjfNodeGroup, AjfTableField} from './nodes';
import {
  AjfFieldInstance, AjfFieldWithChoicesInstance, AjfNodeGroupInstance, AjfNodeInstance,
  AjfRepeatingSlideInstance, AjfSlideInstance, AjfTableFieldInstance, IAjfNodeInstance,
  IAjfSlideInstance
} from './nodes-instances';
import {
  IAjfNodesInstancesOperation, IAjfRendererUpdateMap, IAjfRendererUpdateMapOperation,
  IAjfRendererTableMap, IAjfRendererUpdateTableMapOperation
} from './form-renderer-operations';
import {
  flattenNodes, flattenNodesTree, flattenNodesInstances, isContainerNode,
  isRepeatingNode, nodeToNodeInstance, orderedNodes
} from './form-renderer-utils';
import {AjfValidationService} from './validation-service';

import {tokenize, Token} from 'esprima';


export enum AjfFormInitStatus {
  Initializing,
  Complete
}


@Injectable()
export class AjfFormRendererService {
  private _visibilityNodesMap: Observable<IAjfRendererUpdateMap>;
  private _visibilityNodesMapUpdates: Subject<IAjfRendererUpdateMapOperation>
    = new Subject<IAjfRendererUpdateMapOperation>();

  private _repetitionNodesMap: Observable<IAjfRendererUpdateMap>;
  private _repetitionNodesMapUpdates: Subject<IAjfRendererUpdateMapOperation>
    = new Subject<IAjfRendererUpdateMapOperation>();

  private _conditionalBranchNodesMap: Observable<IAjfRendererUpdateMap>;
  private _conditionalBranchNodesMapUpdates: Subject<IAjfRendererUpdateMapOperation>
    = new Subject<IAjfRendererUpdateMapOperation>();

  private _formulaNodesMap: Observable<IAjfRendererUpdateMap>;
  private _formulaNodesMapUpdates: Subject<IAjfRendererUpdateMapOperation>
    = new Subject<IAjfRendererUpdateMapOperation>();

  private _validationNodesMap: Observable<IAjfRendererUpdateMap>;
  private _validationNodesMapUpdates: Subject<IAjfRendererUpdateMapOperation>
    = new Subject<IAjfRendererUpdateMapOperation>();

  private _warningNodesMap: Observable<IAjfRendererUpdateMap>;
  private _warningNodesMapUpdates: Subject<IAjfRendererUpdateMapOperation>
    = new Subject<IAjfRendererUpdateMapOperation>();

  private _filteredChoicesNodesMap: Observable<IAjfRendererUpdateMap>;
  private _filteredChoicesNodesMapUpdates: Subject<IAjfRendererUpdateMapOperation>
    = new Subject<IAjfRendererUpdateMapOperation>();

  private _triggerConditionsNodesMap: Observable<IAjfRendererUpdateMap>;
  private _triggerConditionsNodesMapUpdates: Subject<IAjfRendererUpdateMapOperation>
    = new Subject<IAjfRendererUpdateMapOperation>();

  private _nextSlideConditionsNodesMap: Observable<IAjfRendererUpdateMap>;
  private _nextSlideConditionsNodesMapUpdates: Subject<IAjfRendererUpdateMapOperation>
    = new Subject<IAjfRendererUpdateMapOperation>();

  private _formInitEvent: EventEmitter<AjfFormInitStatus> = new EventEmitter<AjfFormInitStatus>();
  readonly formInitEvent: Observable<AjfFormInitStatus> = this._formInitEvent.asObservable();

  private _tablesContextMap: Observable<IAjfRendererTableMap>;
  private _tablesContextMapUpdates: Subject<IAjfRendererUpdateMapOperation>
    = new Subject<IAjfRendererUpdateMapOperation>();

  private _formGroup: BehaviorSubject<FormGroup | null> =
    new BehaviorSubject<FormGroup | null>(null);
  readonly formGroup: Observable<FormGroup | null> = this._formGroup.asObservable();

  private _form: BehaviorSubject<{form: AjfForm | null, context?: any} | null> =
    new BehaviorSubject<{form: AjfForm | null, context?: any} | null>(null);
  private _nodes: Observable<AjfNodeInstance[]>;
  private _flatNodes: Observable<IAjfNodeInstance[]>;
  private _flatNodesTree: Observable<IAjfSlideInstance[]>;
  private _nodesUpdates: Subject<IAjfNodesInstancesOperation>
    = new Subject<IAjfNodesInstancesOperation>();
  private _errorPositions: Observable<number[]>;
  private _errors: Observable<number>;

  private _formGroupSubscription: Subscription = Subscription.EMPTY;
  private _valueChanged: Subject<void> = new Subject<void>();

  private _nodesMaps: Observable<IAjfRendererUpdateMap>[];

  private _nextSlideTrigger: EventEmitter<AjfNodeInstance> = new EventEmitter<AjfNodeInstance>();
  readonly nextSlideTrigger: Observable<AjfNodeInstance> = this._nextSlideTrigger.asObservable();

  private _slidesNum: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  readonly slidesNum: Observable<number> = this._slidesNum.asObservable();

  get nodesTree(): Observable<IAjfSlideInstance[]> { return this._flatNodesTree; }
  get errorPositions(): Observable<number[]> { return this._errorPositions; }
  get errors(): Observable<number> { return this._errors; }
  get currentSupplementaryInformations(): any {
    const form = this._form.getValue();
    return form != null && form.form != null ? form.form.supplementaryInformations : null;
  }

  constructor(_: AjfValidationService) {
    this._initUpdateMapStreams();
    this._initNodesStreams();
    this._initErrorsStreams();
    this._initFormStreams();
  }

  setForm(form: AjfForm | null, context: any = {}) {
    this._resetTableContext();
    this._initUpdateMapStreams();
    if (
      form != null && Object.keys(context).length === 0 &&
      Object.keys(form.initContext).length > 0
    ) {
      context = form.initContext;
    }
    const currentForm = this._form.getValue();
    if (
      (currentForm == null && form != null) ||
      (currentForm != null && form !== currentForm.form)
    ) {
      this._form.next({form: form, context: context});
    }
  }

  getFormValue(): any {
    const formGroup = this._formGroup.getValue();
    if (formGroup == null) { return {}; }
    let res = deepCopy(formGroup.value);
    return res;
  }

  addGroup(group: AjfNodeGroupInstance | AjfRepeatingSlideInstance): Observable<boolean> {
    return new Observable<boolean>((subscriber: Subscriber<boolean>) => {
      if (group.formulaReps != null) {
        subscriber.next(false);
        subscriber.complete();
        return;
      }
      const maxReps = group instanceof AjfNodeGroupInstance ?
        group.nodeGroup.maxReps : group.slide.maxReps;
      if (maxReps > 0 && group.reps + 1 > maxReps) {
        subscriber.next(false);
        subscriber.complete();
        return;
      }
      const oldReps = group.reps;
      group.reps = group.reps + 1;
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
      const minReps = group instanceof AjfNodeGroupInstance ?
        group.nodeGroup.minReps : group.slide.minReps;
      if (group.reps - 1 < minReps) {
        subscriber.next(false);
        subscriber.complete();
        return;
      }
      const oldReps = group.reps;
      group.reps = group.reps - 1;
      this._nodesUpdates.next((nodes: AjfNodeInstance[]): AjfNodeInstance[] => {
        this._adjustReps(nodes, group, oldReps, this.getFormValue());
        subscriber.next(true);
        subscriber.complete();
        return nodes;
      });
    });
  }

  getControl(field: AjfFieldInstance): Observable<AbstractControl | null> {
    return this.formGroup.pipe(
      map((f) => {
        const fieldName = field.completeName;
        return f != null && f.contains(fieldName) ? f.controls[fieldName] : null;
      })
    );
  }

  private _initErrorsStreams(): void {
    this._errorPositions = this._valueChanged.pipe(
      withLatestFrom(this._nodes, this._form),
      filter(v => v[2] != null && v[2].form != null),
      map((v: [void, AjfNodeInstance[], {form: AjfForm | null, context?: any} | null]) => {
        const nodes = v[1];
        const form = v[2]!.form!;
        let currentPosition = 0;
        const errors: number[] = [];
        nodes.forEach((node) => {
          if (node instanceof AjfRepeatingSlideInstance) {
            for (let i = 0 ; i < node.reps ; i ++) {
              if (node.visible) {
                currentPosition++;
                if (i == 0) {
                  node.position = currentPosition;
                }
                if (!node.validSlide(i)) {
                  errors.push(currentPosition);
                }
              }
            }
          } else if (node instanceof AjfSlideInstance) {
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
      publishReplay(),
      refCount()
    );
    this._errors = this._errorPositions.pipe(
      map(e => e != null ? e.length : 0),
      startWith(0),
      publishReplay(),
      refCount()
    );
  }

  private _initUpdateMapStreams(): void {
    this._visibilityNodesMap =
      (<Observable<IAjfRendererUpdateMapOperation>>this._visibilityNodesMapUpdates).pipe(
        scan((rmap: IAjfRendererUpdateMap, op: IAjfRendererUpdateMapOperation) => {
          return op(rmap);
        }, {}),
        startWith<IAjfRendererUpdateMap>({}),
        share()
      );
    this._repetitionNodesMap =
      (<Observable<IAjfRendererUpdateMapOperation>>this._repetitionNodesMapUpdates).pipe(
        scan((rmap: IAjfRendererUpdateMap, op: IAjfRendererUpdateMapOperation) => {
          return op(rmap);
        }, {}),
        startWith<IAjfRendererUpdateMap>({}),
        share()
      );
    this._conditionalBranchNodesMap =
      (<Observable<IAjfRendererUpdateMapOperation>>this._conditionalBranchNodesMapUpdates).pipe(
        scan((rmap: IAjfRendererUpdateMap, op: IAjfRendererUpdateMapOperation) => {
          return op(rmap);
        }, {}),
        startWith<IAjfRendererUpdateMap>({}),
        share()
      );
    this._formulaNodesMap =
      (<Observable<IAjfRendererUpdateMapOperation>>this._formulaNodesMapUpdates).pipe(
        scan((rmap: IAjfRendererUpdateMap, op: IAjfRendererUpdateMapOperation) => {
          return op(rmap);
        }, {}),
        startWith<IAjfRendererUpdateMap>({}),
        share()
      );
    this._validationNodesMap =
      (<Observable<IAjfRendererUpdateMapOperation>>this._validationNodesMapUpdates).pipe(
        scan((rmap: IAjfRendererUpdateMap, op: IAjfRendererUpdateMapOperation) => {
          return op(rmap);
        }, {}),
        startWith<IAjfRendererUpdateMap>({}),
        share()
      );
    this._warningNodesMap =
      (<Observable<IAjfRendererUpdateMapOperation>>this._warningNodesMapUpdates).pipe(
        scan((rmap: IAjfRendererUpdateMap, op: IAjfRendererUpdateMapOperation) => {
          return op(rmap);
        }, {}),
        startWith<IAjfRendererUpdateMap>({}),
        share()
      );
    this._filteredChoicesNodesMap =
      (<Observable<IAjfRendererUpdateMapOperation>>this._filteredChoicesNodesMapUpdates).pipe(
        scan((rmap: IAjfRendererUpdateMap, op: IAjfRendererUpdateMapOperation) => {
          return op(rmap);
        }, {}),
        startWith<IAjfRendererUpdateMap>({}),
        share()
      );
    this._triggerConditionsNodesMap =
      (<Observable<IAjfRendererUpdateTableMapOperation>>this._triggerConditionsNodesMapUpdates)
        .pipe(
          scan((rmap: IAjfRendererUpdateMap, op: IAjfRendererUpdateTableMapOperation) => {
            return op(rmap);
          }, {}),
          startWith<IAjfRendererUpdateMap>({}),
          share()
        );
    this._tablesContextMap =
      (<Observable<IAjfRendererUpdateMapOperation>>this._tablesContextMapUpdates).pipe(
        scan((rmap: IAjfRendererUpdateMap, op: IAjfRendererUpdateMapOperation) => {
          return op(rmap);
        }, {}),
        startWith<IAjfRendererUpdateMap>({}),
        share()
      );
    this._nextSlideConditionsNodesMap =
      (<Observable<IAjfRendererUpdateMapOperation>>this._nextSlideConditionsNodesMapUpdates).pipe(
        scan((rmap: IAjfRendererUpdateMap, op: IAjfRendererUpdateMapOperation) => {
          return op(rmap);
        }, {}),
        startWith<IAjfRendererUpdateMap>({}),
        share()
      );

    this._nodesMaps = [
      this._visibilityNodesMap,
      this._repetitionNodesMap,
      this._conditionalBranchNodesMap,
      this._formulaNodesMap,
      this._validationNodesMap,
      this._warningNodesMap,
      this._nextSlideConditionsNodesMap,
      this._filteredChoicesNodesMap,
      this._triggerConditionsNodesMap
    ];
  }

  private _initFormStreams(): void {
    const formObs = <Observable<{form: AjfForm | null, context?: any}>>this._form;
    formObs
      .pipe(map((_form) => {
        return this._initFormGroupStreams(new FormGroup({}));
      }))
      .subscribe(this._formGroup);
    formObs
      .pipe(map((form) => {
        return (_nodesInstances: AjfNodeInstance[]): AjfNodeInstance[] => {
          const nodes = form != null && form.form != null ?
            this._orderedNodesInstancesTree(
              flattenNodes(form.form.nodes), form.form.nodes, undefined, [], form.context
            ) : [];
          let currentPosition = 0;
          nodes.forEach((node) => {
            if (node instanceof AjfRepeatingSlideInstance) {
              for (let i = 0 ; i < node.reps ; i ++) {
                if (node.visible) {
                  currentPosition++;
                  if (i == 0) {
                    node.position = currentPosition;
                  }
                }
              }
            } else if (node instanceof AjfSlideInstance) {
              if (node.visible) {
                currentPosition++;
                node.position = currentPosition;
              }
            }
          });
          return nodes;
        };
      }))
      .subscribe(this._nodesUpdates);
  }

  private _initNodeInstance(
    allNodes: AjfNode[] | AjfNodeInstance[], node: AjfNode,
    prefix: number[], context: any, branchVisibility = true
  ): AjfNodeInstance | null {
    let instance = nodeToNodeInstance(allNodes, node, prefix, context);
    if (instance != null) {
      if (
        instance instanceof AjfNodeGroupInstance ||
        instance instanceof AjfRepeatingSlideInstance
      ) {
        this._explodeRepeatingNode(allNodes, instance, context);
      } else if ( instance instanceof AjfSlideInstance ) {
        instance.nodes = this._orderedNodesInstancesTree(
          allNodes, instance.slide.nodes, instance.slide.id, prefix, context
        );
      }
      instance.updateVisibility(context, branchVisibility);
      instance.updateConditionalBranches(context);
      if (instance instanceof AjfFieldWithChoicesInstance) {
        instance.updateFilteredChoices(context);
      } else if (instance instanceof AjfFieldInstance) {
        instance.value = context[instance.completeName];
        instance.updateFieldState(context);
      }
      this._addNodeInstance(instance);
    }
    return instance;
  }

  private _adjustReps(
    allNodes: AjfNode[] | AjfNodeInstance[],
    instance: AjfNodeGroupInstance | AjfRepeatingSlideInstance,
    oldReps: number, context: any
  ): { added: AjfNodeInstance[] | null, removed: AjfNodeInstance[] | null } {
    const newReps = instance.reps;
    const result: { added: AjfNodeInstance[] | null, removed: AjfNodeInstance[] | null } = {
      added: null,
      removed: null
    };
    if (oldReps < newReps) {
      const newNodes: AjfNodeInstance[] = [];
      if (instance.nodes == null) {
        instance.nodes = [];
      }
      if (instance instanceof AjfNodeGroupInstance) {
        const node = new AjfEmptyField({
          'label': instance.node.label
        });
        const newInstance = this._initNodeInstance(
          allNodes, node, instance.prefix.slice(0), context);
        if (newInstance != null) {
          instance.nodes.push(newInstance);
        }
      }
      for (let i = oldReps ; i < newReps ; i++) {
        const prefix = instance.prefix.slice(0);
        const group = instance instanceof AjfNodeGroupInstance ?
          instance.nodeGroup : instance.slide;
        prefix.push(i);
        orderedNodes(group.nodes, instance.node.id)
          .forEach((n) => {
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
      if (instance instanceof AjfNodeGroupInstance) {
        nodesNum ++;
      }
      result.removed = instance.nodes.splice(newReps * nodesNum, nodesNum);
      result.removed.forEach((n => {
        this._removeNodeInstance(n);
      }));
    }
    if (oldReps != newReps && instance.formulaReps == null) {
      const fg = this._formGroup.getValue();
      if (fg != null && fg.contains(instance.completeName)) {
        fg.controls[instance.completeName].setValue(instance.reps);
      }
    }
    instance.flatNodes = flattenNodesInstances(instance.nodes);
    if (instance instanceof AjfRepeatingSlideInstance) {
      const slideNodes: AjfNodeInstance[][] = [];
      const nodesPerSlide = instance.nodesPerSlide;
      for (let i = 0 ; i < instance.reps ; i++) {
        const startNode = i * nodesPerSlide;
        slideNodes.push(instance.nodes.slice(startNode, startNode + nodesPerSlide));
      }
      instance.slideNodes = slideNodes;
    }
    return result;
  }

  private _explodeRepeatingNode(
    allNodes: AjfNode[] | AjfNodeInstance[],
    instance: AjfNodeGroupInstance | AjfRepeatingSlideInstance,
    context: any
  ) {
    const oldReps = instance.updateRepsNum(context);
    if (oldReps !== instance.reps) {
      this._adjustReps(allNodes, instance, oldReps, context);
    }
  }

  private _orderedNodesInstancesTree(
    allNodes: AjfNode[] | AjfNodeInstance[],
    nodes: AjfNode[], parent: number | null = null,
    prefix: number[] = [], context: any
  ): AjfNodeInstance[] {
    let nodesInstances: AjfNodeInstance[] = [];
    const curSuffix = prefix.length > 0 ? '__' + prefix.join('__') : '';
    orderedNodes(nodes, parent)
      .forEach((node: AjfNode) => {
        const parentNodeInstance = nodesInstances.find(
          ni => ni.node.id == node.parent && ni.suffix == curSuffix);
        const branchVisibility = parentNodeInstance != null ?
          parentNodeInstance.verifiedBranch != null &&
          parentNodeInstance.verifiedBranch == node.parentNode : true;
        const nni = this._initNodeInstance(allNodes, node, prefix, context, branchVisibility);
        if (nni != null) {
          nodesInstances.push(nni);
        }
      });
    return nodesInstances;
  }

  private _formValueDelta(oldValue: any, newValue: any): string[] {
    return Object.keys(newValue)
      .filter((k) => oldValue[k] !== newValue[k]);
  }

  private _initFormGroupStreams(formGroup: FormGroup): FormGroup {
    this._formGroupSubscription.unsubscribe();
    let init = true;
    let initForm = true;
    this._formInitEvent.emit(AjfFormInitStatus.Initializing);
    this._formGroupSubscription = formGroup.valueChanges.pipe(
      startWith<any>({}),
      pairwise(),
      debounceTime(200),
      withLatestFrom<
        [any, any], [[any, any], IAjfRendererUpdateMap, IAjfRendererUpdateMap,
        IAjfRendererUpdateMap, IAjfRendererUpdateMap, IAjfRendererUpdateMap,
        IAjfRendererUpdateMap, IAjfRendererUpdateMap, IAjfRendererUpdateMap,
        IAjfRendererUpdateMap, AjfNodeInstance[]]
      >(...(this._nodesMaps), this._flatNodes)
    ).subscribe((
        v: [[any, any], IAjfRendererUpdateMap, IAjfRendererUpdateMap,
        IAjfRendererUpdateMap, IAjfRendererUpdateMap, IAjfRendererUpdateMap,
        IAjfRendererUpdateMap, IAjfRendererUpdateMap, IAjfRendererUpdateMap,
        IAjfRendererUpdateMap, AjfNodeInstance[]]
      ) => {
        const oldFormValue = init && {} || v[0][0];
        init = false;
        const newFormValue = v[0][1];
        const visibilityMap = v[1];
        const repetitionMap = v[2];
        const conditionalBranchesMap = v[3];
        const formulaMap = v[4];
        const validationMap = v[5];
        const warningMap = v[6];
        const nextSlideConditionsMap = v[7];
        const filteredChoicesMap = v[8];
        const triggerConditionsMap = v[9];
        const nodes = v[10];

        const delta = this._formValueDelta(oldFormValue, newFormValue);
        const deltaLen = delta.length;
        let updatedNodes: AjfNodeInstance[] = [];

        delta.forEach((fieldName) => {
          updatedNodes = updatedNodes.concat(nodes.filter(n => n.completeName === fieldName));
          if (visibilityMap[fieldName] != null) {
            visibilityMap[fieldName].forEach(nodeInstance => {
              const visibilityChanged = nodeInstance.updateVisibility(newFormValue);
              if (visibilityChanged && !nodeInstance.visible) {
                const fg = this._formGroup.getValue();
                if (fg != null) {
                  const s = timer(200).subscribe(() => {
                    if (s && !s.closed) { s.unsubscribe(); }
                    fg.controls[nodeInstance.completeName].setValue(null);
                  });
                }
                if (nodeInstance instanceof AjfFieldInstance) {
                  (<AjfFieldInstance>nodeInstance).value = null;
                }
              } else if (
                visibilityChanged && nodeInstance.visible &&
                nodeInstance instanceof AjfFieldInstance
              ) {
                const fg = this._formGroup.getValue();
                const res = (<AjfFieldInstance>nodeInstance).updateFormula(newFormValue);
                if (fg != null && res.changed) {
                  fg.controls[nodeInstance.completeName].setValue(res.value);
                }
              }
              if (updatedNodes.indexOf(nodeInstance) === -1) {
                updatedNodes.push(nodeInstance);
              }
            });
          }

          if (repetitionMap[fieldName] != null) {
            repetitionMap[fieldName].forEach(nodeInstance => {
              if (
                nodeInstance instanceof AjfNodeGroupInstance ||
                nodeInstance instanceof AjfRepeatingSlideInstance
              ) {
                const oldReps = nodeInstance.updateRepsNum(newFormValue);
                if (oldReps !== nodeInstance.reps) {
                  this._adjustReps(nodes, nodeInstance, oldReps, newFormValue);
                }
              }
              if (updatedNodes.indexOf(nodeInstance) === -1) {
                updatedNodes.push(nodeInstance);
              }
            });
          }

          if (conditionalBranchesMap[fieldName] != null) {
            conditionalBranchesMap[fieldName].forEach((nodeInstance) => {
              // const branchChanged = nodeInstance.updateConditionalBranches(newFormValue);
              nodeInstance.updateConditionalBranches(newFormValue);
              // if (branchChanged) {
                const verifiedBranch = nodeInstance.verifiedBranch;
                nodeInstance.conditionalBranches.forEach((_condition, idx) => {
                  if (idx == verifiedBranch) {
                    this._showSubtree(newFormValue, nodes, nodeInstance, idx);
                  } else {
                    this._hideSubtree(newFormValue, nodes, nodeInstance, idx);
                  }
                });
              // }
              if (updatedNodes.indexOf(nodeInstance) === -1) {
                updatedNodes.push(nodeInstance);
              }
            });
          }

          if (formulaMap[fieldName] != null) {
            formulaMap[fieldName].forEach((nodeInstance) => {
              if (nodeInstance instanceof AjfFieldInstance) {
                const res = nodeInstance.updateFormula(newFormValue);
                const fg = this._formGroup.getValue();
                if (fg != null && res.changed) {
                  nodeInstance.updateValidation(newFormValue);
                  fg.controls[nodeInstance.completeName].setValue(res.value);
                }
              }
              if (updatedNodes.indexOf(nodeInstance) === -1) {
                updatedNodes.push(nodeInstance);
              }
            });
          }

          if (validationMap[fieldName] != null) {
            validationMap[fieldName].forEach((nodeInstance) => {
              if (nodeInstance instanceof AjfFieldInstance) {
                newFormValue.$value = newFormValue[nodeInstance.completeName];
                nodeInstance.updateValidation(
                  newFormValue,
                  this.currentSupplementaryInformations
                );
              }
              if (updatedNodes.indexOf(nodeInstance) === -1) {
                updatedNodes.push(nodeInstance);
              }
            });
          }

          if (warningMap[fieldName] != null) {
            warningMap[fieldName].forEach((nodeInstance) => {
              if (nodeInstance instanceof AjfFieldInstance) {
                nodeInstance.updateWarning(newFormValue);
                if (nodeInstance.warningResults.filter(warning => warning.result).length > 0) {
                  nodeInstance.emitTriggerWarning();
                }
              }
              if (updatedNodes.indexOf(nodeInstance) === -1) {
                updatedNodes.push(nodeInstance);
              }
            });
          }

          if (deltaLen == 1 && nextSlideConditionsMap[fieldName] != null) {
            if (
              nextSlideConditionsMap[fieldName].filter((nodeInstance) => {
                if (nodeInstance instanceof AjfFieldInstance) {
                  return nodeInstance.updateNextSlideCondition(newFormValue);
                }
                return false;
              }).length == 1
            ) {
              this._nextSlideTrigger.emit();
            }
          }

          if (filteredChoicesMap[fieldName] != null) {
            filteredChoicesMap[fieldName].forEach((nodeInstance) => {
              if (nodeInstance instanceof AjfFieldWithChoicesInstance) {
                nodeInstance.updateFilteredChoices(newFormValue);
              }
              if (updatedNodes.indexOf(nodeInstance) === -1) {
                updatedNodes.push(nodeInstance);
              }
            });
          }

          if (deltaLen == 1 && triggerConditionsMap[fieldName] != null) {
            const res = triggerConditionsMap[fieldName]
              .filter((nodeInstance) => {
                return nodeInstance instanceof AjfFieldWithChoicesInstance &&
                  nodeInstance.updateTriggerConditions(newFormValue);
              });
            if (res.length == 1) {
              (<AjfFieldWithChoicesInstance>res[0]).emitTriggerSelection();
            }
          }
        });
        updatedNodes.forEach(n => n.triggerUpdate());
        if (initForm) {
          initForm = false;
          this._formInitEvent.emit(AjfFormInitStatus.Complete);
        }
        this._valueChanged.next();
      });
    return formGroup;
  }

  private _showSubtree(
    context: any, nodes: AjfNodeInstance[], node: AjfNodeInstance, branch?: number
  ) {
    this._updateSubtreeVisibility(context, nodes, node, true, branch);
  }

  private _hideSubtree(
    context: any, nodes: AjfNodeInstance[], node: AjfNodeInstance, branch?: number
  ) {
    this._updateSubtreeVisibility(context, nodes, node, false, branch);
  }

  private _updateSubtreeVisibility(
    context: any, nodes: AjfNodeInstance[], node: AjfNodeInstance,
    visible: boolean, branch?: number
  ) {
    let subNodes: AjfNodeInstance[];
    if (branch != null) {
      subNodes = nodes.filter(
        n => {
          return n.suffix == node.suffix && n.node.parent == node.node.id &&
            n.node.parentNode == branch;
        }
      );
    } else {
      subNodes = nodes.filter(n => n.suffix == node.suffix && n.node.parent == node.node.id);
    }
    const isContainer = isContainerNode(node.node);
    subNodes.forEach((n) => {
      if (
        !isContainer ||
        (isContainer && (<AjfNodeGroup>node.node).nodes.find(cn => cn.id == n.node.id) == null)
      ) {
        n.updateVisibility(context, visible);
        if (n instanceof AjfFieldInstance) {
          (<AjfFieldInstance>n).updateFormula(context);
        }
        this._updateSubtreeVisibility(context, nodes, n, visible);
      }
    });
  }

  private _initNodesStreams(): void {
    this._nodes = this._nodesUpdates.pipe(
      scan((nodes: AjfNodeInstance[], op: IAjfNodesInstancesOperation) => {
        return op(nodes);
      }, []),
      share()
    );
    this._flatNodesTree = this._nodes.pipe(
      map(nodes => flattenNodesTree(nodes)),
      share()
    );
    this._flatNodes = this._flatNodesTree.pipe(
      map(slides => {
        let nodes: IAjfNodeInstance[] = [];
        slides.forEach(s => {
          nodes.push(s);
          nodes = nodes.concat(s.flatNodes);
        });
        return nodes;
      }),
      share()
    );
  }

  private _removeNodeInstance(nodeInstance: AjfNodeInstance): AjfNodeInstance {
    const nodeName = nodeInstance.completeName;
    this._removeNodesVisibilityMapIndex(nodeName);
    this._removeNodesRepetitionMapIndex(nodeName);
    this._removeNodesConditionalBranchMapIndex(nodeName);
    this._removeNodesFormulaMapIndex(nodeName);
    this._removeNodesValidationMapIndex(nodeName);
    this._removeNodesWarningMapIndex(nodeName);
    this._removeNodesNextSlideConditionsMapIndex(nodeName);
    this._removeNodesFilteredChoicesMapIndex(nodeName);
    this._removeNodesTriggerConditionsMapIndex(nodeName);
    if (nodeInstance instanceof AjfSlideInstance) {
      return this._removeSlideInstance(nodeInstance);
    } else if (isRepeatingNode(nodeInstance.node)) {
      this._removeNodeGroupInstance(<AjfNodeGroupInstance | AjfRepeatingSlideInstance>nodeInstance);
    } else if (nodeInstance instanceof AjfFieldInstance) {
      this._removeFieldInstance(nodeInstance);
    }

    return nodeInstance;
  }

  private _removeSlideInstance(slideInstance: AjfSlideInstance): AjfSlideInstance {
    const slide = slideInstance.slide;
    if (slide.visibility != null) {
      this._removeFromNodesVisibilityMap(slideInstance, slide.visibility.condition);
    }
    slideInstance.conditionalBranches.forEach((conditionalBranch: AjfCondition) => {
      this._removeFromNodesConditionalBranchMap(slideInstance, conditionalBranch.condition);
    });
    return slideInstance;
  }

  private _removeNodeGroupInstance(
    nodeGroupInstance: AjfNodeGroupInstance | AjfRepeatingSlideInstance
  ): AjfNodeGroupInstance | AjfRepeatingSlideInstance {
    const nodeGroup = nodeGroupInstance instanceof AjfNodeGroupInstance ?
      nodeGroupInstance.nodeGroup : nodeGroupInstance.slide;
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
    const fieldInstanceName = fieldInstance.completeName;
    if (formGroup != null && formGroup.contains(fieldInstanceName)) {
      formGroup.removeControl(fieldInstanceName);
    }
    if (fieldInstance.validation != null) {
      this._validationNodesMapUpdates.next((vmap: IAjfRendererUpdateMap): IAjfRendererUpdateMap => {
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

    if (fieldInstance.formula != null) {
      this._removeFromNodesFormulaMap(fieldInstance, fieldInstance.formula.formula);
    }

    if (fieldInstance instanceof AjfNodeGroupInstance) {
      if (fieldInstance.formulaReps != null) {
        this._removeFromNodesRepetitionMap(fieldInstance, fieldInstance.formulaReps.formula);
      }
    }

    if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
      fieldInstance.validation.conditions.forEach((condition) => {
        this._removeFromNodesValidationMap(fieldInstance, condition.condition);
      });
    }

    if (fieldInstance.warning != null) {
      fieldInstance.warning.conditions.forEach((condition) => {
        this._removeFromNodesWarningMap(fieldInstance, condition.condition);
      });
    }

    if (fieldInstance.nextSlideCondition != null) {
      this._removeFromNodesNextSlideConditionsMap(
        fieldInstance, fieldInstance.nextSlideCondition.condition
      );
    }

    if (
      fieldInstance instanceof AjfFieldWithChoicesInstance && fieldInstance.choicesFilter != null
    ) {
      this._removeFromNodesFilteredChoicesMap(fieldInstance, fieldInstance.choicesFilter.formula);
      if (fieldInstance.triggerConditions != null) {
        fieldInstance.triggerConditions.forEach((condition) => {
          this._removeFromNodesTriggerConditionsMap(fieldInstance, condition.condition);
        });
      }
    }

    return fieldInstance;
  }

  private _addNodeInstance(nodeInstance: AjfNodeInstance): AjfNodeInstance {
    if (
      nodeInstance instanceof AjfRepeatingSlideInstance ||
      nodeInstance instanceof AjfNodeGroupInstance
    ) {
      return this._addNodeGroupInstance(nodeInstance);
    } else if (nodeInstance instanceof AjfSlideInstance) {
      return this._addSlideInstance(nodeInstance);
    } else if (nodeInstance instanceof AjfFieldInstance) {
      return this._addFieldInstance(nodeInstance);
    }

    return nodeInstance;
  }

  private _addFieldInstance(fieldInstance: AjfFieldInstance): AjfFieldInstance {
    const formGroup = this._formGroup.getValue();
    const fieldInstanceName = fieldInstance.completeName;
    if (formGroup != null && !formGroup.contains(fieldInstanceName)) {
      const control = new FormControl();
      control.setValue(fieldInstance.value);
      formGroup.addControl(fieldInstanceName, control);
    }
    if (
      formGroup != null && fieldInstance instanceof AjfTableFieldInstance
      && (<AjfTableField>fieldInstance.node).editable
    ) {
      let node = <AjfTableField>fieldInstance.node;
      let value: FormControl[][] = [];
      node.rows.forEach((row) => {
        let r: FormControl[] = [];
        row.forEach((k) => {
          const control = new FormControl();
          control.setValue(fieldInstance.context[k]);
          formGroup!.addControl(k, control);
          r.push(control);
        });
        value.push(r);
      });
      fieldInstance.controls = value;
    }
    if (fieldInstance.validation != null) {
      this._validationNodesMapUpdates.next((vmap: IAjfRendererUpdateMap): IAjfRendererUpdateMap => {
          if (vmap[fieldInstanceName] == null) {
            vmap[fieldInstanceName] = [];
          }
          if (vmap[fieldInstanceName].indexOf(fieldInstance) == -1) {
            vmap[fieldInstanceName].push(fieldInstance);
          }
          return vmap;
        });
    }

    if (fieldInstance.visibility != null) {
      this._addToNodesVisibilityMap(fieldInstance, fieldInstance.visibility.condition);
    }

    fieldInstance.conditionalBranches.forEach((conditionalBranch: AjfCondition) => {
      this._addToNodesConditionalBranchMap(fieldInstance, conditionalBranch.condition);
    });

    if (fieldInstance.formula != null) {
      this._addToNodesFormulaMap(fieldInstance, fieldInstance.formula.formula);
    }

    if (fieldInstance instanceof AjfNodeGroupInstance) {
      if (fieldInstance.formulaReps != null) {
        this._addToNodesRepetitionMap(fieldInstance, fieldInstance.formulaReps.formula);
      }
    }

    if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
      fieldInstance.validation.conditions.forEach((condition) => {
        this._addToNodesValidationMap(fieldInstance, condition.condition);
      });
    }

    if (fieldInstance.warning != null) {
      fieldInstance.warning.conditions.forEach((condition) => {
        this._addToNodesWarningMap(fieldInstance, condition.condition);
      });
    }

    if (fieldInstance.nextSlideCondition != null) {
      this._addToNodesNextSlideConditionsMap(
        fieldInstance, fieldInstance.nextSlideCondition.condition
      );
    }

    if (fieldInstance instanceof AjfFieldWithChoicesInstance) {
      if (fieldInstance.choicesFilter != null) {
        this._addToNodesFilteredChoicesMap(fieldInstance, fieldInstance.choicesFilter.formula);
      }
      if (fieldInstance.triggerConditions != null) {
        fieldInstance.triggerConditions.forEach((condition: AjfCondition) => {
          this._addToNodesTriggerConditionsMap(fieldInstance, condition.condition);
        });
      }
    }

    if (fieldInstance instanceof AjfTableFieldInstance) {
      this._addTableContext(fieldInstance.context);
    }

    return fieldInstance;
  }

  private _addSlideInstance(slideInstance: AjfSlideInstance): AjfSlideInstance {
    const slide = slideInstance.slide;
    if (slide.visibility != null) {
      this._addToNodesVisibilityMap(slideInstance, slide.visibility.condition);
    }
    slideInstance.conditionalBranches.forEach((conditionalBranch: AjfCondition) => {
      this._addToNodesConditionalBranchMap(slideInstance, conditionalBranch.condition);
    });
    return slideInstance;
  }

  private _addNodeGroupInstance(
    nodeGroupInstance: AjfNodeGroupInstance | AjfRepeatingSlideInstance
  ): AjfNodeGroupInstance | AjfRepeatingSlideInstance {
    const nodeGroup = nodeGroupInstance instanceof AjfNodeGroupInstance ?
      nodeGroupInstance.nodeGroup : nodeGroupInstance.slide;
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
      let nodeGroupInstanceName = nodeGroupInstance.completeName;
      if (formGroup != null && !formGroup.contains(nodeGroupInstanceName)) {
        const control = new FormControl();
        control.setValue(nodeGroupInstance.reps);
        formGroup.addControl(nodeGroupInstanceName, control);
      }
    }
    return nodeGroupInstance;
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

  private _removeNodesMapIndex(nodesMap: Subject<IAjfRendererUpdateMapOperation>, index: string) {
    nodesMap.next((vmap: IAjfRendererUpdateMap): IAjfRendererUpdateMap => {
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
    nodeInstance: AjfNodeInstance, formula: string
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
    nodeInstance: AjfNodeInstance, formula: string
  ): void {
    this._removeFromNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
  }

  private _removeFromNodesNextSlideConditionsMap(
    nodeInstance: AjfNodeInstance, formula: string
  ): void {
    this._removeFromNodesMap(this._nextSlideConditionsNodesMapUpdates, nodeInstance, formula);
  }

  private _removeFromNodesMap(
    nodesMap: Subject<IAjfRendererUpdateMapOperation>, nodeInstance: AjfNodeInstance,
    formula: string
  ): void {
    let tokens = tokenize(formula)
      .filter((token: Token) => token.type == 'Identifier' && token.value != '$value');
    if (tokens.length > 0) {
      nodesMap.next((vmap: IAjfRendererUpdateMap): IAjfRendererUpdateMap => {
        tokens.forEach((token: Token) => {
          let tokenName = token.value;
          if (vmap[tokenName] != null) {
            const idx = vmap[tokenName].indexOf(nodeInstance);
            if (idx > -1) {
              vmap[tokenName].splice(idx, 1);
              if (vmap[tokenName].length == 0) {
                delete vmap[tokenName];
              }
            }
          }
        });
        return vmap;
      });
    }
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
    nodesMap: Subject<IAjfRendererUpdateMapOperation>, nodeInstance: AjfNodeInstance,
    formula: string
  ): void {
    let tokens = tokenize(formula)
      .filter((token: Token) => token.type == 'Identifier' && token.value != '$value');
    if (tokens.length > 0) {
      nodesMap.next((vmap: IAjfRendererUpdateMap): IAjfRendererUpdateMap => {
        tokens.forEach((token: Token) => {
          let tokenName = token.value;
          if (vmap[tokenName] == null) {
            vmap[tokenName] = [];
          }
          if (vmap[tokenName].indexOf(nodeInstance) === -1) {
            vmap[tokenName].push(nodeInstance);
          }
        });
        return vmap;
      });
    }
  }

  private _addTableContext(ctxToAdd: any) {
    this._tablesContextMapUpdates
      .next((oldCtxtL: any): any => {
        let result = deepCopy(oldCtxtL);
        Object.keys(ctxToAdd).forEach((k) => {
          result[k] = ctxToAdd[k];
        });
        return result;
      });
  }

  private _resetTableContext() {
    this._tablesContextMapUpdates
      .next((_oldCtxtL: any): any => {
        return {};
      });
  }
}
