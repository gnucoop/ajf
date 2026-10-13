import {Pipe, PipeTransform} from '@angular/core';
import {AjfFormBuilderNodeTypeEntry} from './form-builder-service';

// Must stay pure: run on every change detection, it would hand `nodeTypeGroups` a
// new array each time, and the palette would rebuild its `cdkDrag` entries under
// the pointer, cancelling any drag while a search term is set.
@Pipe({
  name: 'nodeTypeFilter',
  standalone: false,
})
export class NodeTypeFilterPipe implements PipeTransform {
  transform(nodeTypes: AjfFormBuilderNodeTypeEntry[], searchTerm: string): any[] {
    if (!nodeTypes) return [];
    if (!searchTerm) return nodeTypes;
    const term = searchTerm.toLowerCase();
    return nodeTypes.filter(nt => nt.label.toLowerCase().includes(term));
  }
}
