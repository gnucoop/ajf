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

import {Point} from './actions';
import {FinderResult, getElement, waitForElement} from './query';

/**
 * Asserts that an element exists.
 */
export async function expectToExist(selector: string, expected = true) {
  await waitForElement(selector).then((isPresent: boolean) => {
    expect(isPresent).toBe(expected, `Expected "${selector}"${expected ? '' : ' not'} to exist`);
  });
}

/**
 * Asserts that an element is focused.
 */
export async function expectFocusOn(element: FinderResult, expected = true) {
  expect(await browser.driver.switchTo().activeElement().getId()).toBe(
    await getElement(element).getId(),
    `Expected element${expected ? '' : ' not'} to be focused.`,
  );
}

/**
 * Asserts that an element has a certain location.
 */
export async function expectLocation(element: FinderResult, {x, y}: Point) {
  await getElement(element)
    .getLocation()
    .then((location: Point) => {
      expect(Math.round(location.x)).toEqual(Math.round(x));
      expect(Math.round(location.y)).toEqual(Math.round(y));
    });
}

/**
 * Asserts that one element is aligned with another.
 */
export async function expectAlignedWith(element: FinderResult, otherElement: FinderResult) {
  await getElement(otherElement)
    .getLocation()
    .then((location: Point) => {
      expectLocation(getElement(element), location);
    });
}
