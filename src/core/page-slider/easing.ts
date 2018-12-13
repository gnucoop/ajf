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

export interface IAjfEasingFunction {
  /**
   * Examples may be found at https://github.com/gdsmith/jquery.easing/blob/master/jquery.easing.js
   * or http://gizma.com/easing/
   * @param t current time
   * @param b beginning value
   * @param c change In value
   * @param d duration
   */
  (t: number, b: number, c: number, d: number): number;
}

export class AjfEasingFunction {
  static LINEAR(t: number, b: number, c: number, d: number): number {
    return c * t / d + b;
  }
  static QUAD(t: number, b: number, c: number, d: number): number {
    t /= d / 2;
    if (t < 1) { return c / 2 * t * t + b; }
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
  static CUBIC(t: number, b: number, c: number, d: number): number {
    t /= d / 2;
    if (t < 1) { return c / 2 * t * t * t + b; }
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  }
  static QUARTIC(t: number, b: number, c: number, d: number): number {
    t /= d / 2;
    if (t < 1) { return c / 2 * t * t * t * t + b; }
    t -= 2;
    return -c / 2 * (t * t * t * t - 2) + b;
  }
  static QUINTIC(t: number, b: number, c: number, d: number): number {
    t /= d / 2;
    if (t < 1) { return c / 2 * t * t * t * t * t + b; }
    t -= 2;
    return c / 2 * (t * t * t * t * t + 2) + b;
  }
  static SIN(t: number, b: number, c: number, d: number): number {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  }
  static EXP(t: number, b: number, c: number, d: number): number {
    t /= d / 2;
    if (t < 1) { return c / 2 * Math.pow(2, 10 * (t - 1)) + b; }
    t--;
    return c / 2 * (-Math.pow( 2, -10 * t) + 2 ) + b;
  }
  static CIRCULAR(t: number, b: number, c: number, d: number): number {
    t /= d / 2;
    if (t < 1) { return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b; }
    t -= 2;
    return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
  }
}

export const expEasingFunction: IAjfEasingFunction =
  (t: number, b: number, c: number, d: number): number => {
    t /= d / 2;
    if (t < 1) { return c / 2 * Math.pow(2, 10 * (t - 1)) + b; }
    t--;
    return c / 2 * (-Math.pow( 2, -10 * t) + 2 ) + b;
  };
