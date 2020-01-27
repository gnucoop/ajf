import {createPackageBuildTasks} from 'ajf-build-tools';
import {
  corePackage,
  matExamplesPackage,
  materialPackage,
  ionExamplesPackage,
  ionicPackage,
  calendarsPackage,
} from './packages';

createPackageBuildTasks(corePackage);
createPackageBuildTasks(materialPackage);
createPackageBuildTasks(matExamplesPackage, ['build-mat-examples-module']);
createPackageBuildTasks(ionicPackage);
createPackageBuildTasks(ionExamplesPackage, ['build-ion-examples-module']);
createPackageBuildTasks(calendarsPackage);

import './tasks/ajf-release';
import './tasks/aot-ion';
import './tasks/aot-mat';
import './tasks/breaking-changes';
import './tasks/ci';
import './tasks/clean';
import './tasks/default';
import './tasks/development-ion';
import './tasks/development-mat';
import './tasks/example-module-mat';
import './tasks/example-module-ion';
import './tasks/lint';
import './tasks/monaco';
import './tasks/unit-test';
