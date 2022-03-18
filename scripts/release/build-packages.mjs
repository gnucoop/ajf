import {default as esMain} from 'es-main';
import {default as ora} from 'ora';
import {default as shell} from 'shelljs';

import {packages as configPackages} from '../build-config.mjs';
import {silentExec} from '../utils/index.mjs';

const buildPackage = async (pkg, prod) => {
  const env = prod ? 'production' : 'development';
  const spinner = ora(`Building package ${pkg}`, ).start();
  const res = shell.exec(`yarn -s ng build ${pkg} --configuration ${env}`, {async: true, silent: silentExec()});
  let stdErr = '';
  return new Promise((resolve, reject) => {
    res.stderr.on('data', data => stdErr = `${stdErr}${data}`);
    res.on('close', code => {
      if (code === 0) {
        spinner.succeed(`Built package ${pkg}`);
        resolve();
      } else {
        spinner.fail(`Unable to build package ${pkg}`);
        reject(stdErr);
      }
    });
  });
};

export const buildPackages = async (packages, prod) => {
  const failure = (error) => {
    shell.echo('Release failed');
    if (error != null) {
      shell.echo(error);
    }
    shell.exit(1);
  };

  for (const pkg of packages) {
    try {
      await buildPackage(pkg, prod);
    } catch (err) {
      failure(err);
    }
  }
};

if (esMain(import.meta)) {
  buildPackages(configPackages);
}
