import {default as esMain} from 'es-main';
import {default as ora} from 'ora';
import {join} from 'path';
import {default as shell} from 'shelljs';

import {packages as configPackages} from '../build-config.mjs';
import {scanDir, silentExec} from '../utils/index.mjs';

const baseDir = join('dist', 'ajf-examples', 'docs-content');
const srcDir = join(baseDir, 'examples-source');
const destDir = join(baseDir, 'examples-highlighted');

export const highlightExamplesSource = async (packages) => {
  const sources = scanDir(srcDir);
  for (const pkg of packages) {
    const pkgDir = join(srcDir, pkg);
    const pkgSources = sources.filter(s => s.startsWith(pkgDir));
    if (pkgSources.length == 0) {
      continue;
    }
    const spinner = ora(`Building ${pkg} highlighted examples source`).start();
    const res = shell.exec(`yarn -s ts-node tools/highlight-files/highlight-files.ts ${destDir} ${pkg} ${sources.join(' ')}`, {async: true, silent: silentExec()});
    let stdErr = '';
    await new Promise((resolve, reject) => {
      res.stderr.on('data', data => stdErr = `${stdErr}${data}`);
      res.on('close', code => {
        if (code === 0) {
          spinner.succeed(`Built  ${pkg} highlighted examples source`);
          resolve();
        } else {
          spinner.fail(`Unable to build ${pkg} highlighted examples source`);
          reject(stdErr);
        }
      });
    });
  }
  shell.rm('-r', join(baseDir, 'dist'));
};

if (esMain(import.meta)) {
  highlightExamplesSource(configPackages);
}
