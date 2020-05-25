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

import {browser, by, element, ElementFinder} from 'protractor';
import {Point} from './actions';

/**
 * Normalizes either turning a selector into an
 * ElementFinder or returning the finder itself.
 */
export function getElement(el: FinderResult): ElementFinder {
  return typeof el === 'string' ? element(by.css(el)) : el;
}

/**
 * Waits for an element to be rendered.
 */
export async function waitForElement(selector: string) {
  return await browser.isElementPresent(by.css(selector));
}

/**
 * Determines the current scroll position of the page.
 */
export async function getScrollPosition(): Promise<Point> {
  const snippet = `
    var documentRect = document.documentElement.getBoundingClientRect();
    var x = -documentRect.left || document.body.scrollLeft || window.scrollX ||
             document.documentElement.scrollLeft || 0;
    var y = -documentRect.top || document.body.scrollTop || window.scrollY ||
             document.documentElement.scrollTop || 0;

    return {x: x, y: y};
  `;

  return await browser.executeScript<Point>(snippet);
}

export type FinderResult = ElementFinder|string;
