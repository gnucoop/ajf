#!/usr/bin/env node

import {default as esMain} from 'es-main';

import {packages} from './build-config.mjs';
import {buildPackages} from './release/index.mjs';

const build = async () => {
  await buildPackages(packages);
};

if (esMain(import.meta)) {
  build();
}
