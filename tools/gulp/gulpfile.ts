import {createPackageBuildTasks} from '../package-tools';
import {
  corePackage,
  ionicPackage,
  materialPackage,
  calendarsPackage,
} from './packages';

createPackageBuildTasks(corePackage);
createPackageBuildTasks(ionicPackage);
createPackageBuildTasks(materialPackage);
createPackageBuildTasks(calendarsPackage);

import './tasks/clean';
import './tasks/unit-test';
import './tasks/ci';
