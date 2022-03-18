import {default as esMain} from 'es-main';
import {default as ora} from 'ora';
import {join} from 'path';
import {default as shell} from 'shelljs';

import {packages as configPackages} from '../build-config.mjs';
import {findSubpackages, silentExec} from '../utils/index.mjs';

export const buildDgeniDocs = async (packages) => {
  const docsPackages = findSubpackages(packages);

  const params = [];
  for (const pkg in docsPackages) {
    const entryPoints = docsPackages[pkg];
    if (entryPoints.length > 0) {
      params.push(pkg);
      params.push(entryPoints.join(','));
    }
  }

  const destDir = join('dist', 'ajf-examples', 'docs-content', 'api-docs');
  const spinner = ora(`Building API docs`).start();
  const res = shell.exec(`yarn -s ts-node tools/dgeni/generate-docs.ts ${destDir} ${params.join(' ')}`, {async: true, silent: silentExec()});
  let stdErr = '';
  await new Promise((resolve, reject) => {
    res.stderr.on('data', data => stdErr = `${stdErr}${data}`);
    res.on('close', code => {
      if (code === 0) {
        spinner.succeed(`Built API docs`);
        resolve();
      } else {
        spinner.fail(`Unable to build API docs`);
        reject(stdErr);
      }
    });
  });
};

if (esMain(import.meta)) {
  buildDgeniDocs(configPackages);
}
