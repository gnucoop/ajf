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

import {CdkDrag, CdkDragDrop} from '@angular/cdk/drag-drop';
import {
  AjfFormBuilderEmptySlot,
  AjfFormBuilderNode,
  AjfFormBuilderNodeEntry,
  AjfFormBuilderNodeTypeEntry,
  AjfFormBuilderService,
} from './form-builder-service';

/**
 * Triggers when a field or slide node is moved or inserted by drag&dropping in the formbuilder.
 * @param event The drop event.
 * @param fbService The AjfFormBuilderService.
 * @param nodeEntry The current nodeEntry, if present.
 * @param content True if the current nodeEntry contains other nodeEntries.
 */
export function onDropProcess(
  event: CdkDragDrop<AjfFormBuilderNodeEntry> | CdkDragDrop<AjfFormBuilderNodeTypeEntry>,
  fbService: AjfFormBuilderService,
  nodeEntry: AjfFormBuilderNode | null,
  content = false,
): void {
  const itemData = event.item.data;
  const containerId = event.container.id;
  if (!itemData.node) {
    if (nodeEntry == null && containerId === 'slides-list') {
      fbService.insertNode(itemData, null as any, 0, content, event.currentIndex);
      return;
    }
    const emptySlot = content
      ? {parent: (<AjfFormBuilderNodeEntry>nodeEntry).node, parentNode: 0}
      : <AjfFormBuilderEmptySlot>nodeEntry;
    fbService.insertNode(
      itemData as AjfFormBuilderNodeTypeEntry,
      emptySlot.parent,
      emptySlot.parentNode,
      content,
      event.currentIndex,
    );
    return;
  }
  const previousIndex = event.previousIndex;
  const currentIndex = event.currentIndex;
  fbService.moveNodeEntry(<AjfFormBuilderNodeEntry>event.item.data, previousIndex, currentIndex);
}

/**
 * Disables the drag&drop of Slide items.
 * @param item The dragged item.
 */
export function disableSlideDropPredicate(item: CdkDrag<AjfFormBuilderNodeTypeEntry>): boolean {
  return !item.data.isSlide;
}

/**
 * Disables the drag&drop of Field items.
 * @param item The dragged item.
 */
export function disableFieldDropPredicate(item: CdkDrag<AjfFormBuilderNodeTypeEntry>): boolean {
  if (!item.data.isSlide) {
    return false;
  }
  return true;
}
