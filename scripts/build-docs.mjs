#!/usr/bin/env node

import {default as esMain} from 'es-main';

import {packages} from './build-config.mjs';
import {buildDgeniDocs, buildExamples, buildOverviews, copyExamplesSource, highlightExamplesSource} from './docs/index.mjs';
import {versionReplacements} from './utils/version-replacements.mjs';

const buildDocs = async() => {
  await buildExamples(packages);
  versionReplacements(['ajf-examples']);
  await buildDgeniDocs(packages);
  await buildOverviews(packages);
  copyExamplesSource(packages);
  highlightExamplesSource(packages);
};

if (esMain(import.meta)) {
  buildDocs();
}
