import {task} from 'gulp';
import {sequenceTask} from 'ajf-build-tools';

task('build-aot:release-packages', sequenceTask(
  'ajf:build-release',
  [
    'ionic-examples:build-release',
    'material-examples:build-release',
  ],
));
