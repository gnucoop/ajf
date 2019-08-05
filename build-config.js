/**
 * Build configuration for the packaging tool. This file will be automatically detected and used
 * to build the different packages inside of Ajf.
 */
const {join} = require('path');

const packageJson = require('./package.json');

/** Current version of the project*/
const buildVersion = packageJson.version;

/**
 * Required Angular version for all Ajf packages. This version will be used
 * as the peer dependency version for Angular in all release packages.
 */
const angularVersion = packageJson.requiredAngularVersion;

const angularMaterialVersion = packageJson.requiredAngularMaterialVersion;
const ngxtVersion = packageJson.requiredNgxtVersion;
const gicVersion = packageJson.requiredGicVersion;
const ionicVersion = packageJson.requiredIonicVersion;
const ionicNativeVersion = packageJson.requiredIonicNativeVersion;

/** License that will be placed inside of all created bundles. */
const buildLicense = `/**
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
 */`;

module.exports = {
  projectVersion: buildVersion,
  angularVersion: angularVersion,
  angularMaterialVersion: angularMaterialVersion,
  ngxtVersion: ngxtVersion,
  gicVersion: gicVersion,
  ionicVersion: ionicVersion,
  ionicNativeVersion: ionicNativeVersion,
  projectDir: __dirname,
  packagesDir: join(__dirname, 'src'),
  outputDir: join(__dirname, 'dist'),
  licenseBanner: buildLicense
};
