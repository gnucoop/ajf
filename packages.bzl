# List of all components / subpackages.

CORE_PACKAGES = [
  'calendar',
  'chart',
  'checkbox-group',
  'common',
  'forms',
  'image',
  'map',
  'models',
  'node-icon',
  'page-break',
  'page-slider',
  'reports',
  'table',
  'text',
  'utils',
]

CORE_TARGETS = ["//src/core"] + ["//src/core/%s" % p for p in CORE_PACKAGES]

MATERIAL_PACKAGES = [
  'calendar',
  'checkbox-group',
  'form-builder',
  'forms',
  'image',
  'monaco-editor',
  'node-icon',
  'page-slider',
  'report-builder',
  'reports',
  'time',
]

MATERIAL_TARGETS = ["//src/material"] + ["//src/material/%s" % p for p in MATERIAL_PACKAGES]

IONIC_PACKAGES = [
  'calendar',
  'checkbox-group',
  'forms',
  'image',
  'node-icon',
  'page-slider',
  'reports',
]

IONIC_TARGETS = ["//src/ionic"] + ["//src/ionic/%s" % p for p in IONIC_PACKAGES]

# Each individual package uses a placeholder for the version of Angular to ensure they're
# all in-sync. This map is passed to each ng_package rule to stamp out the appropriate
# version for the placeholders.
ANGULAR_PACKAGE_VERSION = ">=7.0.0"
ANGULAR_MATERIAL_PACKAGE_VERSION = ">=7.1.0"
NGXT_PACKAGE_VERSION = ">=11.0.0"
IONIC_PACKAGE_VERSION = ">=4.0.0-beta.17"
VERSION_PLACEHOLDER_REPLACEMENTS = {
  "0.0.0-NGM": ANGULAR_MATERIAL_PACKAGE_VERSION,
  "0.0.0-NGXT": NGXT_PACKAGE_VERSION,
  "0.0.0-NG": ANGULAR_PACKAGE_VERSION,
  "0.0.0-ION": IONIC_PACKAGE_VERSION,
}

# Base rollup globals for everything in the repo.
ROLLUP_GLOBALS = {
  '@ionic/angular': 'ionic.angular',
  '@ngx-translate/core': 'ngxt.core',
  '@ngx-translate/http-loader': 'ngxt.httpLoader',
  'chart.js': 'chartJs',
  'chart.piecelabel.js': 'chartPiecelabel',
  'date-fns': 'date-fns',
  'debug': 'debug',
  'esprima': 'esprima',
  'ionic-selectable': 'ionicSelectable',
  'leaflet': 'leaflet',
  'ngx-dnd': 'ngxDnd',
  'numeral': 'numeral',
  'tslib': 'tslib',
  'url-parse': 'url-parse',
  '@ajf/core': 'ajf.core',
  '@ajf/ionic': 'ajf.ionic',
  '@ajf/material': 'ajf.material',
}

# Rollup globals for core subpackages in the form of, e.g., {"@ajf/core/auth": "ajf.core.auth"}
ROLLUP_GLOBALS.update({
  "@ajf/core/%s" % p: "ajf.core.%s" % p for p in CORE_PACKAGES
})

# Rollup globals for material subpackages, e.g., {"@ajf/material/auth": "ajf.material.auth"}
ROLLUP_GLOBALS.update({
  "@ajf/material/%s" % p: "ajf.material.%s" % p for p in MATERIAL_PACKAGES
})

# Rollup globals for ionic subpackages, e.g., {"@ajf/ionic/auth": "ajf.material.auth"}
ROLLUP_GLOBALS.update({
  "@ajf/ionic/%s" % p: "ajf.ionic.%s" % p for p in IONIC_PACKAGES
})
