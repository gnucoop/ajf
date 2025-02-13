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
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  isDevMode,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {AjfGraphNode} from './graph-node';
import {BehaviorSubject} from 'rxjs';
import * as dagre from 'dagre';
import * as svgPanZoom from 'svg-pan-zoom';

const TEXT_END = 20;
const LINE_HEIGHT = 40;
const BOX_WIDTH = 170;

const SvgPanZoom = ((svgPanZoom as any).default || svgPanZoom) as typeof svgPanZoom;

interface Box {
  green: boolean;
  height: number;
  label: string;
  name: string;
  red: boolean;
  width: number;
  x: number;
  y: number;
  yellow: boolean;
  color?: string;
}

interface IPoint {
  x: number;
  y: number;
}

export class Edge {
  constructor(private points: IPoint[]) {}

  public get path(): string {
    if (this.points.length < 2) {
      return '';
    }
    let result = 'M ';
    this.points.forEach(pt => {
      result += `${pt.x} ${pt.y} L`;
    });
    return result.substr(0, result.length - 2);
  }
}

@Component({
  selector: 'ajf-graph',
  templateUrl: 'graph.html',
  styleUrls: ['graph.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AjfGraphComponent implements OnInit {
  @Input() nodes?: AjfGraphNode[];
  @ViewChild('graph', {static: true}) graphElement!: ElementRef;
  boxes$: BehaviorSubject<Box[]> = new BehaviorSubject<Box[]>([]);
  edges$: BehaviorSubject<Edge[]> = new BehaviorSubject<Edge[]>([]);
  graph: dagre.graphlib.Graph<{}> = new dagre.graphlib.Graph();

  constructor(private _el: ElementRef, private _renderer: Renderer2) {
    this.graph.setGraph({marginx: BOX_WIDTH / 2, marginy: LINE_HEIGHT});
  }

  /**
   * data una stringa crea un array di stringhe in base ad un TEXT_END
   * se la ripartizione ricade all'interno di una parola shifta il delimiter fino a trovare uno
   * spazio bianco.
   */
  lines(text: string): string[] {
    const lines: string[] = [];
    while (text != null && text.length > 0) {
      let textEnd = TEXT_END;
      while (text[textEnd - 1] !== ' ' && text.length > TEXT_END) {
        textEnd--;
      }
      const line = text.slice(0, textEnd);
      text = text.split(line)[1];
      lines.push(line);
    }
    return lines;
  }

  ngOnInit(): void {
    if (this.nodes != null) {
      const widgetNodes: AjfGraphNode[] = this.nodes;

      widgetNodes.forEach(node => {
        this.graph.setNode(node.id, {
          width: BOX_WIDTH,
          height: this._calculateHeight(node.label),
          label: node.label,
          red: node.red,
          yellow: node.yellow,
          green: node.green,
          color: node.color || undefined,
        });
        if (node.parentId != null) {
          try {
            node.parentId = JSON.parse(node.parentId as string);
          } catch (e) {
            if (isDevMode()) {
              console.log(e);
            }
          }
          const parents: string[] = Array.isArray(node.parentId)
            ? node.parentId
            : [node.parentId as string];
          parents.forEach(parent => {
            this.graph.setEdge(`${parent}`, node.id, {});
          });
        }
      });
      try {
        SvgPanZoom(this.graphElement.nativeElement, {controlIconsEnabled: true});
      } catch (e) {
        console.log(e);
      }
    }

    dagre.layout(this.graph);
    const boxes: Box[] = [];
    this.graph.nodes().forEach((nodeId: any) => {
      const n: any = this.graph.node(nodeId);
      if (n) {
        boxes.push({...n});
      }
    });
    this.boxes$.next(boxes);
    const edges: Edge[] = [];
    this.graph.edges().forEach((edge: any) => {
      edges.push(new Edge(this.graph.edge(edge).points));
    });
    this.edges$.next(edges);
  }

  private _calculateHeight(text: string): number {
    const linesLength = this.lines(text).length;
    if (linesLength === 1) {
      return LINE_HEIGHT * 1.5;
    }
    return linesLength * LINE_HEIGHT;
  }
}
