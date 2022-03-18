import {default as esMain} from 'es-main';
import {existsSync} from 'fs';
import {default as ora} from 'ora';
import {join} from 'path';
import {default as shell} from 'shelljs';

import {packages as configPackages} from '../build-config.mjs';
import {findSubpackages, silentExec} from '../utils/index.mjs';

const destDir = join('dist', 'ajf-examples', 'docs-content', 'overviews');

const buildOverview = async (mdPath) => {
  const res = shell.exec(`yarn -s ts-node tools/markdown-to-html/transform-markdown.ts ${destDir} ${mdPath}`, {async: true, silent: silentExec()});
  let stdErr = '';
  await new Promise((resolve, reject) => {
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

export const buildOverviews = async (packages) => {
  const docsPackages = findSubpackages(packages);

  const spinner = ora(`Building overviews`).start();
  const mdPaths = [];
  for (const pkg in docsPackages) {
    const entryPoints = docsPackages[pkg];
    for (const entryPoint of entryPoints) {
      const mdPath = join('projects', pkg, entryPoint, `${entryPoint}.md`);
      if (existsSync(mdPath)) {
        mdPaths.push(mdPath);
      }
    }
  }
  if (mdPaths.length > 0) {
    try {
      await buildOverview(mdPaths.join(' '));
    } catch (e) {
      spinner.fail(`Unable to build overviews`);
      shell.echo(e);
      shell.exit(1);
    }
  }
  spinner.succeed(`Built overviews`);
};

if (esMain(import.meta)) {
  buildOverviews(configPackages);
}
