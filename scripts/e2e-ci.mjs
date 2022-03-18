#!/usr/bin/env node

import {default as esMain} from 'es-main';
import {default as shell} from 'shelljs';

import {packages} from './build-config.mjs';

const runPackageE2e = async (pkg) => {
  const res = shell.exec(`yarn -s ng run ${pkg}:cypress-run`, {async: true, silent: false});
  let stdErr = '';
  return new Promise((resolve, reject) => {
    res.stderr.on('data', data => stdErr = `${stdErr}${data}`);
    res.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(stdErr);
      }
    });
  });
};

const e2eCi = async () => {
  for (const pkg of packages) {
    await runPackageE2e(pkg);
  }
};

if (esMain(import.meta)) {
  e2eCi();
}
