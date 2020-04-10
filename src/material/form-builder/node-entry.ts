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

import {isContainerNode} from '@ajf/core/forms';
import {CdkDrag, CdkDragDrop, CdkDropList} from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

import {AjfFbBranchLine} from './branch-line';
import {
  AjfFormBuilderEmptySlot,
  AjfFormBuilderNode,
  AjfFormBuilderNodeEntry,
  AjfFormBuilderNodeTypeEntry,
  AjfFormBuilderService
} from './form-builder-service';


const branchColors: string[] = [
  '#F44336',  // RED
  '#4CAF50',  // GREEN
  '#3F51B5',  // INDIGO
  '#FFC107',  // AMBER
  '#795548',  // BROWN
];


@Component({
  selector: 'ajf-fb-node-entry',
  templateUrl: 'node-entry.html',
  styleUrls: ['node-entry.css'],
  host: {'(window.resize)': 'onResize()'},
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AjfFbNodeEntry implements AfterViewInit, OnDestroy {
  @ViewChildren(AjfFbBranchLine) branchLines: QueryList<AjfFbBranchLine>;
  @ViewChildren(AjfFbNodeEntry, {read: ElementRef}) childEntries: QueryList<ElementRef>;

  private _hasContent = false;
  get hasContent(): boolean {
    return this._hasContent;
  }

  private _isFirst = false;
  get isFirst(): boolean {
    return this._isFirst;
  }
  @Input()
  set isFirst(isFirst: boolean) {
    this._isFirst = isFirst;
  }

  private _isNodeEntry = false;
  get isNodeEntry(): boolean {
    return this._isNodeEntry;
  }

  private _nodeEntry: AjfFormBuilderNode;
  get nodeEntry(): AjfFormBuilderNode {
    return this._nodeEntry;
  }
  @Input()
  set nodeEntry(nodeEntry: AjfFormBuilderNode) {
    this._nodeEntry = nodeEntry;
    if (nodeEntry != null && (<AjfFormBuilderNodeEntry>nodeEntry).node !== void 0) {
      const ne = <AjfFormBuilderNodeEntry>nodeEntry;
      this._isNodeEntry = true;
      const node = ne.node;
      this._hasContent = node != null && isContainerNode(node);
    } else {
      this._isNodeEntry = false;
      this._hasContent = false;
    }
  }

  private _level = 0;
  get level(): number {
    return this._level;
  }
  @Input()
  set level(value: number) {
    this._level = value;
  }

  get realNodeEntry(): AjfFormBuilderNodeEntry {
    return this._nodeEntry as AjfFormBuilderNodeEntry;
  }

  private _branchColors: string[] = branchColors.slice(0);
  get branchColors(): string[] {
    return this._branchColors;
  }

  private _dropZones: string[] = ['fbdz-node'];
  get dropZones(): string[] {
    return this._dropZones;
  }

  private _slideDropZones: string[] = ['fbdz-slide'];
  get slideDropZones(): string[] {
    return this._slideDropZones;
  }

  private _originOffset = 0;
  get originOffset(): number {
    return this._originOffset;
  }
  @Input()
  set originOffset(originOffset: number) {
    this._originOffset = originOffset;
    this._originLeftMargin = `${this._originOffset * 4}px`;
  }
  private _originLeftMargin = '0';
  get originLeftMargin(): string {
    return this._originLeftMargin;
  }

  private _firstBranchColor = branchColors[0];
  get firstBranchColor(): string {
    return this._firstBranchColor;
  }
  @Input()
  set firstBranchColor(firstBranchColor: string) {
    const idx = branchColors.indexOf(firstBranchColor);
    if (idx > 0) {
      this._firstBranchColor = firstBranchColor;
      this._branchColors = branchColors.slice(idx).concat(branchColors.slice(0, idx));
    } else {
      this._firstBranchColor = branchColors[0];
      this._branchColors = branchColors.slice(0);
    }
  }

  private _currentEditedNode: Observable<AjfFormBuilderNodeEntry|null>;
  get currentEditedNode(): Observable<AjfFormBuilderNodeEntry|null> {
    return this._currentEditedNode;
  }

  private _branchLinesSubscription: Subscription = Subscription.EMPTY;
  private _childEntriesSubscription: Subscription = Subscription.EMPTY;

  constructor(private _service: AjfFormBuilderService) {
    this._currentEditedNode = this._service.editedNodeEntry;
  }

  onResize(): void {}

  edit(): void {
    if (this.nodeEntry == null || !this.isNodeEntry) {
      return;
    }
    this._service.editNodeEntry(<AjfFormBuilderNodeEntry>this.nodeEntry);
  }

  delete(): void {
    if (this.nodeEntry == null || !this.isNodeEntry) {
      return;
    }
    this._service.deleteNodeEntry(<AjfFormBuilderNodeEntry>this.nodeEntry);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this._updateBranchHeights());
    this._childEntriesSubscription = this.childEntries.changes.subscribe(() => {
      this._updateBranchHeights();
    });
  }

  ngOnDestroy(): void {
    this._branchLinesSubscription.unsubscribe();
    this._childEntriesSubscription.unsubscribe();
  }

  onDropSuccess(evt: CdkDragDrop<AjfFormBuilderNodeTypeEntry>, content = false): void {
    const dd = evt.item.data as AjfFormBuilderNodeTypeEntry;
    if (this._nodeEntry == null) {
      this._service.insertNode(dd, null as any, 0, content);
      return;
    }
    if (dd.nodeType !== void 0 && (!this.isNodeEntry || (this.isNodeEntry && content))) {
      const emptySlot = content ?
          {parent: (<AjfFormBuilderNodeEntry>this.nodeEntry).node, parentNode: 0} :
          <AjfFormBuilderEmptySlot>this._nodeEntry;
      this._service.insertNode(
          <AjfFormBuilderNodeTypeEntry>dd, emptySlot.parent, emptySlot.parentNode, content);
    }
  }

  disableSlideDropPredicate(item: CdkDrag<AjfFormBuilderNodeTypeEntry>): boolean {
    return !item.data.isSlide;
  }

  emptyAreaDropPredicate(): (item: CdkDrag, _drop: CdkDropList) => boolean {
    return (item: CdkDrag, _drop: CdkDropList): boolean => {
      if (this._level > 0) {
        return !item.data.isSlide;
      }
      return item.data.isSlide || false;
    };
  }

  private _updateBranchHeights(): void {
    if (this.nodeEntry == null || !this.isNodeEntry || this.branchLines == null ||
        this.childEntries == null) {
      return;
    }
    const nodeEntry = <AjfFormBuilderNodeEntry>this.nodeEntry;
    const branchLines: AjfFbBranchLine[] = this.branchLines.toArray();
    const sliceIdx = nodeEntry.content != null ? nodeEntry.content.length : 0;
    const childEntries: ElementRef[] = this.childEntries.toArray().slice(sliceIdx);

    if (branchLines.length != childEntries.length) {
      return;
    }

    branchLines.forEach((bl: AjfFbBranchLine, idx: number) => {
      const ce: ElementRef = childEntries[idx];
      bl.height = ce.nativeElement.offsetTop;
    });
  }
}
