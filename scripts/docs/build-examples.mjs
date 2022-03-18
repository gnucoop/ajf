import {default as esMain} from 'es-main';
import {existsSync, mkdirSync, unlinkSync, writeFileSync} from 'fs';
import {default as ora} from 'ora';
import {join} from 'path';
import {default as shell} from 'shelljs';

import {packages as configPackages} from '../build-config.mjs';
import {scanDir, silentExec} from '../utils/index.mjs';

const examplesBaseDir = join('projects', 'ajf-examples');

const buildExampleManifest = (packages) => {
  let content = [];
  for (const pkg of packages) {
    const examplesDir = join(examplesBaseDir, pkg);
    content = [...content, ...scanDir(examplesDir)];
  }
  return content.join(' ');
};

export const buildExamples = async (packages) => {
  const manifestDir = 'dist';
  const content = buildExampleManifest(packages);
  if (!existsSync(manifestDir)) {
    mkdirSync(manifestDir);
  }
  const destFile = join(manifestDir, 'ajf-examples.mf');
  writeFileSync(destFile, content);
  const outDir = join(examplesBaseDir, 'src');
  const outFile = join(outDir, 'example-module.ts');
  let spinner = ora(`Generating examples module`).start();
  let res = shell.exec(`yarn -s ts-node tools/example-module/generate-example-module-bin.ts ${destFile} ${outFile} ${examplesBaseDir}`, {async: true, silent: silentExec()});
  let stdErr = '';
  await new Promise((resolve, reject) => {
    res.stderr.on('data', data => stdErr = `${stdErr}${data}`);
    res.on('close', code => {
      unlinkSync(destFile);
      if (code === 0) {
        spinner.succeed(`Generated examples module`);
        resolve();
      } else {
        spinner.fail(`Unable to generate examples module`);
        reject(stdErr);
      }
    });
  });
  spinner = ora(`Building Ajf examples`).start();
  res = shell.exec(`yarn -s ng build ajf-examples`, {async: true, silent: silentExec()});
  stdErr = ''
  await new Promise((resolve, reject) => {
    res.stderr.on('data', data => stdErr = `${stdErr}${data}`);
    res.on('close', code => {
      if (code === 0) {
        spinner.succeed(`Built Ajf examples`);
        resolve();
      } else {
        spinner.fail(`Unable to build Ajf examples`);
        reject(stdErr);
      }
    });
  });
};

if (esMain(import.meta)) {
  buildExamples(configPackages);
}
