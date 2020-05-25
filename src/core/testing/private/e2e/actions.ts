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

import {browser} from 'protractor';

import {FinderResult, getElement} from './query';

/**
 * Presses a single key or a sequence of keys.
 */
export async function pressKeys(...keys: string[]) {
  const actions = browser.actions();
  await actions.sendKeys(...keys).perform();
}

/**
 * Clicks an element at a specific point. Useful if there's another element
 * that covers part of the target and can catch the click.
 */
export async function clickElementAtPoint(element: FinderResult, coords: Point) {
  const webElement = await getElement(element).getWebElement();
  await browser.actions().mouseMove(webElement, coords).click().perform();
}

export interface Point {
  x: number;
  y: number;
}
