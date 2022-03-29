import {AjfField} from '../fields/field';
import {AjfRepeatingSlide} from '../slides/repeating-slide';
import {AjfSlide} from '../slides/slide';
import {AjfBaseNode} from './base-node';
import {AjfContainerNode} from './container-node';
import {AjfNodeGroup} from './node-group';
import {AjfFieldNodeLink} from './node-link';
import {AjfNodeType} from './node-type';
import {AjfRepeatingContainerNode} from './repeating-container-node';
import {AjfRepeatingNode} from './repeating-node';

export interface AjfUnknownNode extends AjfBaseNode {
  nodeType: AjfNodeType.LENGTH;
}

export type AjfNode =
  | AjfContainerNode
  | AjfField
  | AjfFieldNodeLink
  | AjfNodeGroup
  | AjfRepeatingNode
  | AjfRepeatingSlide
  | AjfRepeatingContainerNode
  | AjfSlide
  | AjfUnknownNode;
