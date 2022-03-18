import {readdirSync, statSync} from 'fs';
import {join} from 'path';

const excludedDirs = ['cypress', 'src'];

export const findSubpackages = (packages) => {
  const subPackages = {};
  for (const pkg of packages) {
    subPackages[pkg] = [];
    const pkgDir = join('projects', pkg);
    const content = readdirSync(pkgDir);
    for (const entry of content) {
      if (excludedDirs.indexOf(entry) > -1) {
        continue;
      }
      const entryPath = join(pkgDir, entry);
      if (statSync(entryPath).isDirectory()) {
        subPackages[pkg].push(entry);
      }
    }
  }
  return subPackages;
};
