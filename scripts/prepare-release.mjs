#!/usr/bin/env node

import {default as esMain} from 'es-main';
import {readFileSync, writeFileSync} from 'fs';
import {default as inquirer} from 'inquirer';
import {default as semver} from 'semver';
import {default as shell} from 'shelljs';

import {changelog} from './release/index.mjs';

const prepareRelease = async () => {
  const packageFile = 'package.json';
  const content = JSON.parse(readFileSync(packageFile, 'utf8'));
  const currentVersion = content.version;
  shell.echo(`Current version: ${currentVersion}`);
  const choices = [];
  let newVersion;
  if (semver.prerelease(currentVersion) != null) {
    newVersion = semver.inc(currentVersion, 'prerelease');
    choices.push({name: `Next pre-release: ${newVersion}`, value: newVersion});
    newVersion = semver.inc(currentVersion, 'patch');
    choices.push({name: `Next stable: ${newVersion}`, value: newVersion});
  } else {
    newVersion = semver.inc(currentVersion, 'patch');
    choices.push({name: `Next patch: ${newVersion}`, value: newVersion});
    newVersion = semver.inc(currentVersion, 'minor');
    choices.push({name: `Next minor: ${newVersion}`, value: newVersion});
    newVersion = semver.inc(currentVersion, 'major');
    choices.push({name: `Next major: ${newVersion}`, value: newVersion});
  }
  choices.push({name: `Custom`, value: 'custom'});
  newVersion = (
    await inquirer.prompt([
      {
        type: 'list',
        name: 'newVersion',
        message: 'What version do you want to cut?',
        choices,
      },
    ])
  ).newVersion;
  if (newVersion === 'custom') {
    newVersion = (
      await inquirer.prompt([
        {
          type: 'input',
          name: 'newVersion',
          message: 'Please enter a new version:',
        },
      ])
    ).newVersion;
    if (semver.parse(newVersion) == null) {
      shell.echo('Invalid version');
      shell.exit(1);
    }
  }
  content.version = newVersion;
  writeFileSync(packageFile, JSON.stringify(content, null, 2));
  changelog();
  let confirm = (
    await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Please review the staged changelog. Do you want to commit changes? (Y/N)',
      },
    ])
  ).confirm;
  if (confirm === false) {
    shell.exit(0);
  }
  shell.exec(`git add package.json CHANGELOG.md`);
  shell.exec(`git commit -m "release: cut the v${newVersion} release"`, {silent: true});
  shell.exec(`git tag v${newVersion}`, {silent: true});
  confirm = (
    await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Do you want to push this version? (Y/N)',
      },
    ])
  ).confirm;
  if (confirm === false) {
    shell.exec(`Please push with "git push --tags" when ready.`);
    shell.exit(0);
  }
  shell.exec(`git push --tags`);
  shell.exec(`git push`);
};

if (esMain(import.meta)) {
  prepareRelease();
}
