#!/usr/bin/env node

import {default as esMain} from 'es-main';
import {default as shell} from 'shelljs';

import {packages} from './build-config.mjs';

const runE2eApp = async () => {
  const res = shell.exec(`yarn -s e2e-app`, {async: true, silent: true});
  res.stdout.setEncoding('utf8');
  return new Promise((resolve, reject) => {
    res.stdout.on('data', data => {
      if (data.includes('Server is listening')) {
        resolve(res);
      }
    });
  });
};

const runPackageE2e = async pkg => {
  shell.env['NO_COLOR'] = '1';
  const res = shell.exec(`yarn -s ng run ${pkg}:cypress-run-ci`, {
    async: true,
    silent: false,
  });
  let stdErr = '';
  return new Promise((resolve, reject) => {
    res.stderr.on('data', data => (stdErr = `${stdErr}${data}`));
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
  const e2eApp = await runE2eApp();
  for (const pkg of packages) {
    try {
      await runPackageE2e(pkg);
    } catch (err) {
      e2eApp.kill();
      shell.exit(1);
    }
  }
  e2eApp.kill();
  shell.exit(0);
};

if (esMain(import.meta)) {
  e2eCi();
}
