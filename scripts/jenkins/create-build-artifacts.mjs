#!/usr/bin/env node

import {default as childProcess} from 'child_process';
import {default as fs} from 'fs';
import {default as path} from 'path';
import {default as shell} from 'shelljs';

import {packages} from '../build-config.mjs';

const cwd = process.cwd();
const mainPackage = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf8'));
const baseVersion = mainPackage.version;
const sha = childProcess.execSync('git rev-parse --short HEAD').toString('utf-8').trim();
const version = `${baseVersion}-${sha}`;

for (const pkg of packages) {
  const packageSrcDir = path.join(cwd, 'dist', pkg);
  const packageDir = path.join(cwd, 'dist', 'artifacts', pkg);
  if (!fs.existsSync(packageDir)) {
    shell.mkdir('-p', packageDir);
  }
  shell.cp('-r', path.join(packageSrcDir, '*'), packageDir);
  const packageJsonPath = path.join(packageDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.version = version;
  for (const dep in packageJson.dependencies) {
    if (dep.startsWith('@ajf') && packageJson.dependencies[dep] === baseVersion) {
      packageJson.dependencies[dep] = version;
    }
  }
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  childProcess.execSync(`cd ${packageDir} ; yarn pack`);
}
