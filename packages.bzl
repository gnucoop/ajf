# List of all components / subpackages.

CORE_PACKAGES = [
    "calendar",
    "chart",
    "checkbox-group",
    "common",
    "forms",
    "image",
    "map",
    "models",
    "node-icon",
    "page-break",
    "page-slider",
    "reports",
    "table",
    "text",
    "utils",
]

CORE_TARGETS = ["//src/core"] + ["//src/core/%s" % p for p in CORE_PACKAGES]

MATERIAL_PACKAGES = [
    "calendar",
    "checkbox-group",
    "form-builder",
    "forms",
    "image",
    "monaco-editor",
    "node-icon",
    "page-slider",
    "report-builder",
    "reports",
    "time",
]

MATERIAL_TARGETS = ["//src/material"] + ["//src/material/%s" % p for p in MATERIAL_PACKAGES]

IONIC_PACKAGES = [
    "calendar",
    "checkbox-group",
    "forms",
    "image",
    "node-icon",
    "page-slider",
    "reports",
]

IONIC_TARGETS = ["//src/ionic"] + ["//src/ionic/%s" % p for p in IONIC_PACKAGES]

# Each individual package uses a placeholder for the version of Angular to ensure they're
# all in-sync. This map is passed to each ng_package rule to stamp out the appropriate
# version for the placeholders.
ANGULAR_PACKAGE_VERSION = "^8.0.0"
ANGULAR_MATERIAL_PACKAGE_VERSION = "^8.0.0"
NGXT_PACKAGE_VERSION = "^11.0.0"
IONIC_PACKAGE_VERSION = "^4.7.0"
GIC_PACKAGE_VERSION = "^4.7.1"
VERSION_PLACEHOLDER_REPLACEMENTS = {
    "0.0.0-NGM": ANGULAR_MATERIAL_PACKAGE_VERSION,
    "0.0.0-NGXT": NGXT_PACKAGE_VERSION,
    "0.0.0-NG": ANGULAR_PACKAGE_VERSION,
    "0.0.0-GIC": GIC_PACKAGE_VERSION,
    "0.0.0-ION": IONIC_PACKAGE_VERSION,
}

# Base rollup globals for everything in the repo.
ROLLUP_GLOBALS = {
    "@gic/core": "gic.core",
    "@gic/angular": "gic.angular",
    "@ionic/core": "ionic.core",
    "@ionic/angular": "ionic.angular",
    "@ngx-translate/core": "ngxt.core",
    "@ngx-translate/http-loader": "ngxt.httpLoader",
    "chart.js": "chartJs",
    "chart.piecelabel.js": "chartPiecelabel",
    "date-fns": "date-fns",
    "debug": "debug",
    "esprima": "esprima",
    "leaflet": "leaflet",
    "numeral": "numeral",
    "tslib": "tslib",
    "url-parse": "url-parse",
    "@ajf/core": "ajf.core",
    "@ajf/ionic": "ajf.ionic",
    "@ajf/material": "ajf.material",
}

# Rollup globals for core subpackages in the form of, e.g., {"@ajf/core/auth": "ajf.core.auth"}
ROLLUP_GLOBALS.update({
    "@ajf/core/%s" % p: "ajf.core.%s" % p
    for p in CORE_PACKAGES
})

# Rollup globals for material subpackages, e.g., {"@ajf/material/auth": "ajf.material.auth"}
ROLLUP_GLOBALS.update({
    "@ajf/material/%s" % p: "ajf.material.%s" % p
    for p in MATERIAL_PACKAGES
})

# Rollup globals for ionic subpackages, e.g., {"@ajf/ionic/auth": "ajf.material.auth"}
ROLLUP_GLOBALS.update({
    "@ajf/ionic/%s" % p: "ajf.ionic.%s" % p
    for p in IONIC_PACKAGES
})

# UMD bundles for Angular packages and subpackges we depend on for development and testing.
ANGULAR_LIBRARY_UMDS = [
    "@npm//:node_modules/@angular/animations/bundles/animations-browser.umd.js",
    "@npm//:node_modules/@angular/animations/bundles/animations.umd.js",
    "@npm//:node_modules/@angular/common/bundles/common-http-testing.umd.js",
    "@npm//:node_modules/@angular/common/bundles/common-http.umd.js",
    "@npm//:node_modules/@angular/common/bundles/common-testing.umd.js",
    "@npm//:node_modules/@angular/common/bundles/common.umd.js",
    "@npm//:node_modules/@angular/compiler/bundles/compiler-testing.umd.js",
    "@npm//:node_modules/@angular/compiler/bundles/compiler.umd.js",
    "@npm//:node_modules/@angular/core/bundles/core-testing.umd.js",
    "@npm//:node_modules/@angular/core/bundles/core.umd.js",
    "@npm//:node_modules/@angular/elements/bundles/elements.umd.js",
    "@npm//:node_modules/@angular/forms/bundles/forms.umd.js",
    "@npm//:node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js",
    "@npm//:node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
    "@npm//:node_modules/@angular/platform-browser/bundles/platform-browser-animations.umd.js",
    "@npm//:node_modules/@angular/platform-browser/bundles/platform-browser-testing.umd.js",
    "@npm//:node_modules/@angular/platform-browser/bundles/platform-browser.umd.js",
    "@npm//:node_modules/@angular/router/bundles/router.umd.js",
]

LIBRARIES_UMDS = [
    "@npm//:node_modules/@gic/angular/angular.umd.js",
    "@npm//:node_modules/@gic/core/core.umd.js",
    "@npm//:node_modules/@gic/core/core-loader.umd.js",
    "@npm//:node_modules/@ionic/angular/angular.umd.js",
    "@npm//:node_modules/@ionic/core/core.umd.js",
    "@npm//:node_modules/@ionic/core/core-loader.umd.js",
    "@npm//:node_modules/chart.js/Chart.umd.js",
    "@npm//:node_modules/chart.piecelabel.js/build/Chart.PieceLabel.min.js",
    "@npm//:node_modules/css-element-queries/css-element-queries.umd.js",
    "@npm//:node_modules/date-fns/date-fns.umd.js",
    "@npm//:node_modules/debug/debug.umd.js",
    "@npm//:node_modules/esprima/esprima.umd.js",
    "@npm//:node_modules/leaflet/leaflet.umd.js",
    "@npm//:node_modules/numeral/numeral.umd.js",
]
