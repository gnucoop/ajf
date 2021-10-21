const fs = require('fs');
const path = require('path');

const packages = ['@gic', '@ionic'];

packages.forEach(package => {
  const packageJsonPath = path.posix.join(
    'node_modules',
    package,
    'core',
    'loader',
    'package.json',
  );
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.name = `${package}/core/loader`;
  packageJson.browser = './index.cjs.js';
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson));
});

const cleanDirs = [
  '@angular/common/locales',
  '@angular/core/schematics',
  '@angular/cdk/schematics',
  '@angular/material/schematics',
  '@ngneat/transloco/schematics',
];
cleanDirs.forEach(cleanDir => {
  const cleanDirPath = path.join('node_modules', cleanDir);
  if (fs.existsSync(cleanDirPath) && fs.statSync(cleanDirPath).isDirectory()) {
    fs.rmdirSync(cleanDirPath, {recursive: true});
  }
});
