import {existsSync, readdirSync, statSync} from 'fs';
import {join} from 'path';

export const scanDir = (dirPath) => {
  let content = [];
  if (!existsSync(dirPath) || !statSync(dirPath).isDirectory()) {
    return content;
  }
  const entries = readdirSync(dirPath);
  for (const entry of entries) {
    const entryPath = join(dirPath, entry);
    const entryStat = statSync(entryPath);
    if (entryStat.isDirectory()) {
      content = [...content, ...scanDir(entryPath)];
    } else if(entryStat.isFile()) {
      content.push(entryPath);
    }
  }
  return content;
};
