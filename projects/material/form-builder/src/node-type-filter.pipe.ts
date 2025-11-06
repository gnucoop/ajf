import {Pipe, PipeTransform} from '@angular/core';
import {AjfFormBuilderNodeTypeEntry} from './form-builder-service';

@Pipe({
  name: 'nodeTypeFilter',
  pure: false,
})
export class NodeTypeFilterPipe implements PipeTransform {
  transform(nodeTypes: AjfFormBuilderNodeTypeEntry[], searchTerm: string): any[] {
    if (!nodeTypes) return [];
    if (!searchTerm) return nodeTypes;
    const term = searchTerm.toLowerCase();
    return nodeTypes.filter(nt => nt.label.toLowerCase().includes(term));
  }
}
