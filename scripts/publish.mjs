#!/usr/bin/env node

import {default as esMain} from 'es-main';
import {writeFileSync} from 'fs';
import {default as semver} from 'semver';
import {default as shell} from 'shelljs';

import {packages} from './build-config.mjs';

const publish = async () => {
  const npmToken = process.env.NPM_TOKEN;
  if (npmToken == null || npmToken.length === 0) {
    shell.echo(`Error: No access token for Npm could be found. Please set the environment variable 'NPM_TOKEN'.`);
    shell.exit(1);
  }
  const nmpRc = `//registry.npmjs.org/:_authToken=${npmToken}`;
  const curTag = process.env.LATEST_TAG;
  if (curTag == null || curTag.length === 0) {
    shell.echo('No version tag defined');
    shell.exit(0);
  }
  const tagVersion = semver.valid(semver.clean(curTag));
  if (tagVersion == null) {
    shell.echo('Invalid version tag defined');
    shell.exit(0);
  }
  for (const pkg of packages) {
    const pkgName = `@ajf/${pkg}@${tagVersion}`;
    const existing = shell.exec(`npm show ${pkgName}`, {silent: true}).stdout;
    if (existing == null || existing.length === 0) {
      const distDir = `dist/${pkg}`;
      writeFileSync(`${distDir}/.npmrc`, nmpRc);
      shell.cd(distDir);
      shell.exec(`npm publish`);
      shell.cd(`../..`);
    } else {
      shell.echo(`Skipping deploy of ${pkg} package`);
    }
  }
};

if (esMain(import.meta)) {
  publish();
}
