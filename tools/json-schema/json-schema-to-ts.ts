import {readFileSync, writeFileSync} from 'fs';
import {basename, extname, join} from 'path';

const [bazelBinPath, outputPackage, inputPath] = process.argv.slice(2);

const jsonContent = readFileSync(inputPath, 'utf8');

const fileExtension = extname(inputPath).substring(1);
const outputFile = basename(inputPath).replace(`.${fileExtension}`, `.ts`);
const outputPath = join(bazelBinPath, outputPackage, outputFile);
writeFileSync(outputPath, `export const schema = ${jsonContent};`);
