import {default as esMain} from 'es-main';
import {existsSync, mkdirSync} from 'fs';
import {join} from 'path';
import {default as shell} from 'shelljs';

import {packages as configPackages} from '../build-config.mjs';

const srcDir = join('projects', 'ajf-examples');
const destDir = join('dist', 'ajf-examples', 'docs-content', 'examples-source');

export const copyExamplesSource = (packages) => {
  if (!existsSync(destDir)) {
    mkdirSync(destDir, {recursive: true});
  }
  for (const pkg of packages) {
    const examples = join(srcDir, pkg);
    if (existsSync(examples)) {
      shell.cp('-r', examples, destDir);
    }
  }
};

if (esMain(import.meta)) {
  copyExamplesSource(configPackages);
}
