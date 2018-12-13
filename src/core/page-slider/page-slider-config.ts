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

import {AjfEasingFunction, IAjfEasingFunction} from './easing';


export class AjfPageSliderConfig {

  /**
   * The number of milliseconds to wait till updating the scroll position again.
   * Small amounts may produce smoother animations but require more processing
   * power.
   */
  static _interval = 10;

  /**
   * The duration how long a scrollTo animation should last by default.
   * May be overridden using the page-scroll-duration attribute on a single
   * ng2PageScroll instance.
   */
  static defaultDuration = 500;

  /**
   * The distance in pixels above scroll target where the animation should stop.
   * Setting a positive number results in
   * the scroll target being more in the middle of the screen, negative numbers
   * will produce scrolling "too far"
   */
  static defaultScrollOffset = 0;

  /**
   * The events that are listened to on the body to decide whether a scroll
   * animation has been interfered by the user
   */
  static _interruptEvents: string[] = [
    'mousedown', 'wheel', 'DOMMouseScroll', 'mousewheel', 'keyup', 'touchmove'
  ];

  /**
   * The keys that are considered to interrupt a scroll animation (mainly
   * the arrow keys). All other key presses will not stop the
   * scroll animation.
   */
  static _interruptKeys: number[] = [33, 34, 35, 36, 38, 40];

  /**
   * Whether a scroll animation should be interruptible by user interaction
   * (true) or not (false). If the user performs an
   * interrupting event while a scroll animation takes place, the scroll
   * animation stops.
   */
  static defaultInterruptible = true;

  static defaultEasingFunction: IAjfEasingFunction = AjfEasingFunction.EXP;
}
