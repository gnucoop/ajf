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

const JD_EPOCH_OFFSET_AMETE_ALEM = -285019;    //      ዓ/ዓ
const JD_EPOCH_OFFSET_AMETE_MIHRET = 1723856;  //    ዓ/ም
const JD_EPOCH_OFFSET_GREGORIAN = 1721426;
const JD_EPOCH_OFFSET_UNSET = -1;

let JDN_OFFSET = JD_EPOCH_OFFSET_UNSET;

const GREGORIAN_NUMBER_OF_MONTHS = 12;
const monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function quotient(i: number, j: number): number {
  return Math.floor(i / j);
}

function isGregorianLeap(year: number): boolean {
  return (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0));
}

function setEra(era: number): void {
  if ((era === JD_EPOCH_OFFSET_AMETE_ALEM) || (era === JD_EPOCH_OFFSET_AMETE_MIHRET)) {
    JDN_OFFSET = era;
  } else {
    throw (new Error(`Unknown Era: ${era}`));
  }
}

function isEraSet(): boolean {
  return JD_EPOCH_OFFSET_UNSET !== JDN_OFFSET;
}

function unsetEra(): void {
  JDN_OFFSET = JD_EPOCH_OFFSET_UNSET;
}

function guessEraFromJDN(jdn: number) {
  return (jdn >= (JD_EPOCH_OFFSET_AMETE_MIHRET + 365)) ? JD_EPOCH_OFFSET_AMETE_MIHRET :
                                                         JD_EPOCH_OFFSET_AMETE_ALEM;
}

function ethiopicToJDN(day: number, month: number, year: number) {
  const ERA = isEraSet() ? JDN_OFFSET : JD_EPOCH_OFFSET_AMETE_MIHRET;
  const jdn = (ERA + 365) + 365 * (year - 1) + quotient(year, 4) + 30 * month + day - 31;

  return jdn;
}

function jdnToEthiopic(jdn: number): [number, number, number] {
  const ERA = isEraSet() ? JDN_OFFSET : guessEraFromJDN(jdn);
  const r = (jdn - ERA) % 1461;
  const n = (r % 365) + 365 * quotient(r, 1460);
  const year = 4 * quotient((jdn - ERA), 1461) + quotient(r, 365) - quotient(r, 1460);
  const month = quotient(n, 30) + 1;
  const day = (n % 30) + 1;

  return [year, month, day];
}

function gregorianToJDN(day: number, month: number, year: number): number {
  const s = quotient(year, 4) - quotient(year - 1, 4) - quotient(year, 100) +
      quotient(year - 1, 100) + quotient(year, 400) - quotient(year - 1, 400);

  const t = quotient(14 - month, 12);

  const n = 31 * t * (month - 1) +
      (1 - t) * (59 + s + 30 * (month - 3) + quotient((3 * month - 7), 5)) + day - 1;

  const j = JD_EPOCH_OFFSET_GREGORIAN + 365 * (year - 1) + quotient(year - 1, 4) -
      quotient(year - 1, 100) + quotient(year - 1, 400) + n;

  return j;
}

function jdnToGregorian(jdn: number): [number, number, number] {
  const r2000 = (jdn - JD_EPOCH_OFFSET_GREGORIAN) % 730485;
  const r400 = (jdn - JD_EPOCH_OFFSET_GREGORIAN) % 146097;
  const r100 = r400 % 36524;
  const r4 = r100 % 1461;
  let n = (r4 % 365) + 365 * quotient(r4, 1460);
  const s = quotient(r4, 1095);
  const aprime = 400 * quotient((jdn - JD_EPOCH_OFFSET_GREGORIAN), 146097) +
      100 * quotient(r400, 36524) + 4 * quotient(r100, 1461) + quotient(r4, 365) -
      quotient(r4, 1460) - quotient(r2000, 730484);
  const year = aprime + 1;
  const t = quotient((364 + s - n), 306);
  let month = t * (quotient(n, 31) + 1) + (1 - t) * (quotient((5 * (n - s) + 13), 153) + 1);
  n += 1 - quotient(r2000, 730484);
  let day = n;

  if ((r100 === 0) && (n === 0) && (r400 !== 0)) {
    month = 12;
    day = 31;
  } else {
    monthDays[2] = (isGregorianLeap(year)) ? 29 : 28;
    for (let i = 1; i <= GREGORIAN_NUMBER_OF_MONTHS; i += 1) {
      if (n <= monthDays[i]) {
        day = n;
        break;
      }
      n -= monthDays[i];
    }
  }
  return [year, month, day];
}

function gregorianToEthiopic(day: number, month: number, year: number): [number, number, number] {
  const jdn = gregorianToJDN(day, month, year);
  return jdnToEthiopic(jdn);
}

function ethioipicToGreg(day: number, month: number, year: number): [number, number, number] {
  const jdn = ethiopicToJDN(day, month, year);
  return jdnToGregorian(jdn);
}

function ethioipicToGregorian(
    day: number, month: number, year: number, era: number): [number, number, number] {
  setEra(era);
  const result = ethioipicToGreg(day, month, year);
  unsetEra();
  return result;
}

/** API * */

/** ethiopian to gregorian */
export function toGC(dateArray: [number, number, number]|[number, number, number, number]):
    [number, number, number] {
  const [y, m, d] = dateArray;
  let era = dateArray.length === 4 ? dateArray[3] : JD_EPOCH_OFFSET_AMETE_MIHRET;
  if (d < 0 || d > 30 || m < 0 || m > 13) {
    throw new Error('Invalid Ethiopian Date');
  }
  return ethioipicToGregorian(d, m, y, era);
}

/** gregorian to ethiopian */
export function toEC(dateArray: [number, number, number]): [number, number, number] {
  const [y, m, d] = dateArray;
  if (d < 0 || d > 31 || m < 0 || m > 12) {
    throw new Error('Invalid Gregorian Date');
  }
  return gregorianToEthiopic(d, m, y);
}
