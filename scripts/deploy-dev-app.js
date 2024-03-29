#!/usr/bin/env node

/**
 * Script that builds the dev-app as a static web package that will be
 * deployed to the currently configured Firebase project.
 */

const {exec, set, cd, cp, rm, chmod} = require('shelljs');
const {join} = require('path');

// ShellJS should throw if any command fails.
set('-e');

/** Path to the project directory. */
const projectDirPath = join(__dirname, '../');

// Go to project directory.
cd(projectDirPath);

const distPath = 'dist/dev-app';

// Build web package output.
exec(`yarn -s ng build dev-app --configuration production`);

exec(`tar cfj - -C ${distPath} . | ssh gnucoopajfdev@dev-app.ajf.rocks "tar xfj - -C /web"`);
