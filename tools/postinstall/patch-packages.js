const {readFileSync, writeFileSync} = require('fs');
const {posix} = require('path');

const xlsxPath = 'node_modules/xlsx';

const xlsxPackagePath = posix.join(xlsxPath, 'package.json');
const xlsxPackage = JSON.parse(readFileSync(xlsxPackagePath, 'utf8'));
xlsxPackage.main = xlsxPackage.unpkg;
writeFileSync(xlsxPackagePath, JSON.stringify(xlsxPackage, null, 2));

const xlsxBundlePath = posix.join(xlsxPath, xlsxPackage.main);
let xlsxBundle = readFileSync(xlsxBundlePath, 'utf8');
xlsxBundle = xlsxBundle.replace(/require\("fs"\)/gm, 'undefined');
writeFileSync(xlsxBundlePath, xlsxBundle);

['gic', 'ionic'].forEach(m => {
  const packagePath = posix.join('node_modules', `@${m}`, 'core', 'loader', 'package.json');
  const package = JSON.parse(readFileSync(packagePath, 'utf8'));
  package.module = package.unpkg;
  writeFileSync(packagePath, JSON.stringify(package, null, 2));
});

const overlayFile = 'node_modules/@angular/cdk/fesm2020/overlay.mjs';
let overlay = readFileSync(overlayFile, 'utf8');
overlay = overlay.replace(`ConnectedOverlayPositionChange = __decorate([
    __param(1, Optional()),
    __metadata("design:paramtypes", [ConnectionPositionPair,
        ScrollingVisibility])
], ConnectedOverlayPositionChange);
`, '');
writeFileSync(overlayFile, overlay);
