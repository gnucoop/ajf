#!/usr/bin/env node

import {default as esMain} from 'es-main';

import {generateVfsFontsLib} from './postinstall/index.mjs';

if (esMain(import.meta)) {
  generateVfsFontsLib();
}
