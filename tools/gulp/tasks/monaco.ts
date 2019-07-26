import {dest, task, src} from 'gulp';
import {join} from 'path';
import {buildConfig} from 'ajf-build-tools';
import {readFileSync, writeFileSync} from 'fs';
import {copyTask} from '../util/task-helpers';
import {escapeText} from '../util/text';

const tsb = require('gulp-typescript');
const merge = require('merge2');
const rjs = require('gulp-requirejs');
const gulpUglify = require('gulp-uglify');

const {packagesDir, outputDir} = buildConfig;


task('monaco:rebuild-lib', (done: Function) => {
  const srcDir = join(packagesDir, 'monaco', 'lib');
  let name1 = 'lib.d.ts';
  let name2 = 'lib-es6.d.ts';
  let libMod = readFileSync(join(srcDir, 'lib.d.ts')).toString();
  let libDestJs1 = join(srcDir, 'lib-ts.js');
  let libDestJs2 = join(srcDir, 'lib-es6-ts.js');
  let libDestDec1 = join(srcDir, 'lib-ts.d.ts');
  let libDestDec2 = join(srcDir, 'lib-es6-ts.d.ts');
  let js1Cont =
`/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// This is a generated file from ${name1}

define([], function() { return { contents: "${escapeText(libMod)}"}; });

`;
  let js2Cont =
`/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// This is a generated file from ${name2}

define([], function() { return { contents: "${escapeText(libMod)}"}; });

`;
  let decCont =
`/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export declare var contents: string;
`;

  writeFileSync(libDestJs1, js1Cont);
  writeFileSync(libDestJs2, js2Cont);
  writeFileSync(libDestDec1, decCont);
  writeFileSync(libDestDec2, decCont);

  const tsLibDir = join(packagesDir, '..', 'node_modules', 'typescript', 'lib');
  writeFileSync(
    join(srcDir, 'typescriptServices.js'),
    readFileSync(join(tsLibDir, 'typescriptServices.js').toString())
  );
  writeFileSync(
    join(srcDir, 'typescriptServices.d.ts'),
    readFileSync(join(tsLibDir, 'typescriptServices.d.ts').toString()) + `
// MONACOCHANGE
export = ts;
// END MONACOCHANGE
`
  );

  done();
});

task('monaco:build-lib', ['monaco:copy-lib'], () => {
  const srcDir = join(packagesDir, 'monaco');
  const outDir = join(outputDir, 'packages', 'monaco', 'out', 'src');
  return src([
      join(packagesDir, '..', 'node_modules', 'monaco-editor', 'monaco.d.ts'),
      join(srcDir, 'lib', 'lib-ts.d.ts'),
      join(srcDir, 'lib', 'lib-es6-ts.d.ts'),
      join(srcDir, 'lib', 'typescriptServices.d.ts'),
      join(srcDir, 'src', 'worker.ts')
    ])
    .pipe(tsb({
      module: 'amd',
      outDir: join(outputDir, 'packages', 'monaco', 'out'),
      lib: ['es2015', 'dom'],
      skipLibCheck: true,
      target: 'es5'
    }))
    .pipe(dest(outDir));
});

task('monaco:copy-lib', () => {
  const srcDir = join(packagesDir, 'monaco');
  const baseMonacoDir = join(packagesDir, '..', 'node_modules', 'monaco-editor');
  const relDir = join(outputDir, 'releases', 'monaco');
  const outDir = join(outputDir, 'packages', 'monaco', 'out', 'lib');
  return merge(
    copyTask([
      join(srcDir, 'package.json'),
      join(baseMonacoDir, 'monaco.d.ts')
    ], relDir)(),
    copyTask(join(srcDir, 'lib', 'lib-*'), outDir)(),
    copyTask(join(srcDir, 'lib', 'typescriptServices.*'), outDir)(),
    copyTask(join(baseMonacoDir, 'dev'), join(relDir, 'dev'))(),
    copyTask(join(baseMonacoDir, 'min'), join(relDir, 'min'))(),
    copyTask(join(baseMonacoDir, 'min-maps'), join(relDir, 'min-maps'))()
  );
});
task('monaco:build', ['monaco:build-lib'], () => {
  const relDir = join(outputDir, 'releases', 'monaco');
  return rjs({
        baseUrl: '/dist/packages/monaco/out/',
        name: 'vs/language/typescript/src/worker',
        out: 'src/worker.js',
        exclude: ['vs/language/typescript/lib/typescriptServices'],
        paths: {
          'vs/language/typescript': join(outputDir, 'packages', 'monaco', 'out')
        }
      })
      .pipe(gulpUglify({
        output: {
          comments: 'some'
        }
      }))
      .pipe(dest(join(relDir, 'dev', 'vs', 'language', 'typescript')))
      .pipe(dest(join(relDir, 'min', 'vs', 'language', 'typescript')));
});

task('monaco:build-release', ['monaco:build']);
