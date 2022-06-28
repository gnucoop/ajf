#!/usr/bin/env node

import {default as esMain} from 'es-main';
import {default as shell} from 'shelljs';

const testCi = () => {
  shell.env['CI_TEST'] = '1';
  shell.exec(`yarn -s ng test --no-watch`);
};

if (esMain(import.meta)) {
  testCi();
}
