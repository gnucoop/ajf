const fs = require('fs');
const path = require('path');

const ngDevFile = 'node_modules/@angular/dev-infra-private/ng-dev/cli-bundle.js';
let ngDev = fs.readFileSync(ngDevFile, 'utf8');
ngDev = ngDev.replace(
  `    function getReleaseTagForVersion(version) {
      return version.format();
    }`,
  `    function getReleaseTagForVersion(version) {
      return 'v' + version.format();
    }`,
);
fs.writeFileSync(ngDevFile, ngDev);

const ioniconsFile = 'node_modules/ionicons/dist/types/components.d.ts';
let ionicons = fs.readFileSync(ioniconsFile, 'utf8');
ionicons = ionicons.replace(/"aria(Hidden|Label)"\?:/gm, '"aria$1":');
fs.writeFileSync(ioniconsFile, ionicons);

const cleanDirs = [
  '@angular/common/locales',
  '@angular/core/schematics',
  '@angular/cdk/schematics',
  '@angular/material/schematics',
  '@ionic/angular/schematics',
  '@ngneat/transloco/schematics',
];
cleanDirs.forEach(cleanDir => {
  const cleanDirPath = path.join('node_modules', cleanDir);
  if (fs.existsSync(cleanDirPath) && fs.statSync(cleanDirPath).isDirectory()) {
    fs.rmdirSync(cleanDirPath, {recursive: true});
  }
});
