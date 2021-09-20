import {join} from 'path';
import {task, series} from 'gulp';
import {buildConfig} from '../../package-tools';

// There are no type definitions available for these imports.
const shelljs = require('shelljs');

/**
 * Tasks that builds the SystemJS configuration which is needed for the Karma
 * legacy unit tests.
 */
task(':test:build-system-config', done => {
  const configOutputPath = join(buildConfig.outputDir, 'karma-system-config.js');
  shelljs.cd(buildConfig.projectDir);
  const bazelGenfilesDir = shelljs.exec('yarn -s bazel info bazel-genfiles').stdout.trim();
  shelljs.exec('yarn -s bazel build //test:system-config.js');
  shelljs.cp(join(bazelGenfilesDir, 'test/system-config.js'), configOutputPath);
  shelljs.chmod('u+w', configOutputPath);
  done();
});

/** Compiles the esm bundles from date-fns to AMD so that we can load them in Karma. */
task(':test:third-party-libs', done => {
  shelljs.cd(buildConfig.projectDir);
  const bazelGenfilesDir = shelljs.exec('yarn -s bazel info bazel-genfiles').stdout.trim();

  const libs = [
    'amd_chart_js',
    'amd_date_fns',
    'amd_date_fns_locales',
    'amd_esprima',
    'amd_flat',
    'amd_gic_core',
    'amd_gic_core_loader',
    'amd_ionic_core',
    'amd_ionic_core_loader',
    'amd_leaflet',
    'amd_numbro',
    'amd_pdfmake',
    'amd_xlsx',
    'amd_zxing_browser',
    'amd_zxing_library',
  ];
  libs.forEach(target => {
    const outputPath = join(buildConfig.outputDir, `${target}.js`);
    const bundlePath = join(bazelGenfilesDir, `tools/third-party-libs/${target}_bundle.js`);
    shelljs.exec(`yarn -s bazel build //tools/third-party-libs:${target}`);
    shelljs.cp(bundlePath, outputPath);
    shelljs.chmod('u+w', outputPath);
  });

  done();
});

/** Builds everything that is necessary for karma. */
task(':test:build', series(
  'clean',
  'core:build-no-bundles',
  'ionic:build-no-bundles',
  'material:build-no-bundles',
  ':test:third-party-libs',
  ':test:build-system-config'
));

/**
 * Runs the unit tests. Does not watch for changes.
 * This task should be used when running tests on the CI server.
 */
task('test:single-run', series(':test:build', done => {
  // Load karma not outside. Karma pollutes Promise with a different implementation.
  const karma = require('karma');

  new karma.Server({
    configFile: join(buildConfig.projectDir, 'test/karma.conf.js'),
    autoWatch: false,
    singleRun: true
  }, (exitCode: number) => {
    if (exitCode === 0) {
      done();
    } else {
      // Immediately exit the process if Karma reported errors, because due to
      // potential still running tunnel-browsers gulp won't exit properly.
      done(new Error(`Karma exited with code ${exitCode}.`));
      process.exit(exitCode);
    }
  }).start();
}));
