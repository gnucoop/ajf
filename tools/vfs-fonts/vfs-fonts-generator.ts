const {mkdirSync, readFileSync, writeFileSync} = require('fs');
const {basename, dirname} = require('path');

const args = process.argv.slice(2);

const [output, ...fonts] = args;

const dir = dirname(output);
mkdirSync(dir, {recursive: true});

let tsOut = 'export const vfsFonts: {[key: string]: string} = {\n';

fonts.forEach(font => {
  const buffer = readFileSync(font);
  tsOut += `  "${basename(font)}": "${buffer.toString('base64')}",\n`;
});

tsOut += '};\n';

writeFileSync(`${output}`, tsOut);
