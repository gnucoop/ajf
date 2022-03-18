#!/usr/bin/env node

import {default as esMain} from 'es-main';
import {join} from 'path';
import {default as shell} from 'shelljs';

import {packages} from './build-config.mjs';
import {buildPackages} from './release/index.mjs';
import {versionReplacements} from './utils/index.mjs';

const release = async () => {
  await buildPackages(packages, true);
  versionReplacements(packages);
  const allPackages = [...packages, 'ajf-examples'];
  for (const pkg of allPackages) {
    shell.cp('README.md', join('dist', pkg));
  }
};

if (esMain(import.meta)) {
  release();
}
