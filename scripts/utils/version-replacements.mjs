import {existsSync, readFileSync, writeFileSync} from 'fs';
import {join} from 'path';

export const versionReplacements = (packages) => {
  const mainPackage = JSON.parse(readFileSync('package.json', 'utf-8'));
  const mainDeps = {...mainPackage.devDependencies, ...mainPackage.dependencies};

  const replacements = [
    ['@angular/core', 'NGF'],
    ['@angular/cdk', 'NGC'],
    ['@gic/angular', 'GIC'],
    ['@ionic/angular', 'IONIC'],
    ['@ngneat/transloco', 'TRANSLOCO'],
    ['@zxing/browser', 'ZXING-BROWSER'],
    ['@zxing/library', 'ZXING-LIBRARY'],
    ['chart.js', 'CHARTJS'],
    ['date-fns', 'DATE-FNS'],
    ['flag-icon-css', 'FLAG-ICON-CSS'],
    ['leaflet', 'LEAFLET'],
    ['meriyah', 'MERIYAH'],
    ['numbro', 'NUMBRO'],
    ['pdfmake', 'PDFMAKE'],
    ['tslib', 'TSLIB'],
    ['xlsx', 'XLSX'],
  ];

  for (const pkg of packages) {
    const packageFile = join('dist', pkg, 'package.json');
    if (existsSync(packageFile)) {
      let content = readFileSync(packageFile, 'utf8');
      content = content.replace(/0.0.0-PLACEHOLDER/g, mainPackage.version);
      for (const [version, search] of replacements) {
        if (mainDeps[version] != null) {
          content = content.replace(new RegExp(`0.0.0-${search}`, 'g'), mainDeps[version]);
        }
      }
      writeFileSync(packageFile, content);
    }
  }
};
