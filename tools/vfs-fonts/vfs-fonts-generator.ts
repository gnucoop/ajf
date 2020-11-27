import {mkdirSync, readFileSync, writeFileSync} from 'fs';
import {basename, dirname} from 'path';

const args = process.argv.slice(2);

const [output, ...fonts] = args;

const dir = dirname(output);
mkdirSync(dir, {recursive: true});

let tsOut = 'export const vfsFonts = {\n';

fonts.forEach(font => {
  const buffer = readFileSync(font);
  tsOut += `  "${basename(font)}": "${buffer.toString('base64')}",\n`;
});

tsOut += '};\n';

writeFileSync(`${output}`, tsOut);
