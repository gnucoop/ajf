import {default as esMain} from 'es-main';
import {mkdirSync, readFileSync, writeFileSync} from 'fs';
import {basename, dirname} from 'path';

export const generateVfsFontsLib = () => {
  const output = 'projects/core/pdfmake/src/vfs-fonts-lib.ts';
  const fonts = [
    'node_modules/@fontsource/roboto/files/roboto-all-400-italic.woff',
    'node_modules/@fontsource/roboto/files/roboto-all-400-normal.woff',
    'node_modules/@fontsource/roboto/files/roboto-all-500-italic.woff',
    'node_modules/@fontsource/roboto/files/roboto-all-500-normal.woff',
  ];

  const dir = dirname(output);
  mkdirSync(dir, {recursive: true});

  let tsOut = 'export const vfsFonts: {[key: string]: string} = {\n';

  fonts.forEach(font => {
    const buffer = readFileSync(font);
    tsOut += `  "${basename(font)}": "${buffer.toString('base64')}",\n`;
  });

  tsOut += '};\n';

  writeFileSync(`${output}`, tsOut);
};

if (esMain(import.meta)) {
  generateVfsFontsLib();
}
