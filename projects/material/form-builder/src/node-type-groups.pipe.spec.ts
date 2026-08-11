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

import {AjfNodeType} from '@ajf/core/forms';

import {AjfFormBuilderNodeTypeEntry} from './form-builder-service';
import {NodeTypeGroupsPipe} from './node-type-groups.pipe';

describe('NodeTypeGroupsPipe', () => {
  const pipe = new NodeTypeGroupsPipe();

  const entry = (label: string, category?: string): AjfFormBuilderNodeTypeEntry => ({
    label,
    nodeType: {node: AjfNodeType.AjfSlide},
    category,
  });

  it('should group the entries keeping the order of the categories', () => {
    const groups = pipe.transform([
      entry('Slide', 'Structure'),
      entry('Repeating slide', 'Structure'),
      entry('String', 'Text'),
    ]);
    expect(groups.map(g => g.category)).toEqual(['Structure', 'Text']);
    expect(groups[0].nodeTypes.map(nt => nt.label)).toEqual(['Slide', 'Repeating slide']);
    expect(groups[1].nodeTypes.map(nt => nt.label)).toEqual(['String']);
  });

  it('should collect the entries of a category in a single group', () => {
    const groups = pipe.transform([
      entry('Slide', 'Structure'),
      entry('String', 'Text'),
      entry('Custom', 'Structure'),
    ]);
    expect(groups.length).toBe(2);
    expect(groups[0].nodeTypes.map(nt => nt.label)).toEqual(['Slide', 'Custom']);
  });

  it('should keep the entries with no category in a trailing group with no header', () => {
    const groups = pipe.transform([entry('Custom'), entry('Slide', 'Structure')]);
    expect(groups.map(g => g.category)).toEqual(['Structure', '']);
    expect(groups[1].nodeTypes.map(nt => nt.label)).toEqual(['Custom']);
  });

  it('should handle an empty list', () => {
    expect(pipe.transform([])).toEqual([]);
    expect(pipe.transform(null as any)).toEqual([]);
  });
});
