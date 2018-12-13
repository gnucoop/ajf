import {task} from 'gulp';
import {sequenceTask} from 'ajf-build-tools';

const allPackages = ['core', 'ionic', 'material'];

task('ajf:clean-build', sequenceTask('clean', ...allPackages.map(p => `${p}:build-no-deps`)));
