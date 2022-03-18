#!/usr/bin/env node

import {default as esMain} from 'es-main';

import {generateVfsFontsLib, patchIonicons} from './postinstall/index.mjs';

if (esMain(import.meta)) {
  generateVfsFontsLib();
  patchIonicons();
}
