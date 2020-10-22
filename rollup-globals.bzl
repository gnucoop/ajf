load("//src/calendars:config.bzl", "CALENDARS_ENTRYPOINTS", "CALENDARS_TESTING_ENTRYPOINTS")
load("//src/core:config.bzl", "CORE_ENTRYPOINTS")
load("//src/ionic:config.bzl", "IONIC_ENTRYPOINTS", "IONIC_TESTING_ENTRYPOINTS")
load("//src/material:config.bzl", "MATERIAL_ENTRYPOINTS", "MATERIAL_TESTING_ENTRYPOINTS")

# Base rollup globals for everything in the repo. Note that we want to disable
# sorting of the globals as we manually group dict entries.
# buildifier: disable=unsorted-dict-items
ROLLUP_GLOBALS = {
    # Framework packages.
    "@angular/animations": "ng.animations",
    "@angular/common": "ng.common",
    "@angular/common/http": "ng.common.http",
    "@angular/common/http/testing": "ng.common.http.testing",
    "@angular/common/testing": "ng.common.testing",
    "@angular/core": "ng.core",
    "@angular/core/testing": "ng.core.testing",
    "@angular/forms": "ng.forms",
    "@angular/platform-browser": "ng.platformBrowser",
    "@angular/platform-browser-dynamic": "ng.platformBrowserDynamic",
    "@angular/platform-browser-dynamic/testing": "ng.platformBrowserDynamic.testing",
    "@angular/platform-browser/animations": "ng.platformBrowser.animations",
    "@angular/platform-server": "ng.platformServer",
    "@angular/router": "ng.router",

    # Angular Components packages
    "@angular/cdk/coercion": "ng.cdk.coercion",
    "@angular/cdk/collections": "ng.cdk.collections",
    "@angular/cdk/drag-drop": "ng.cdk.dragDrop",
    "@angular/cdk/keycodes": "ng.cdk.keycodes",
    "@angular/cdk/text-field": "ng.cdk.textField",
    "@angular/material/autocomplete": "ng.material.autocomplete",
    "@angular/material/button": "ng.material.button",
    "@angular/material/button-toggle": "ng.material.buttonToggle",
    "@angular/material/card": "ng.material.card",
    "@angular/material/checkbox": "ng.material.checkbox",
    "@angular/material/chips": "ng.material.chips",
    "@angular/material/core": "ng.material.core",
    "@angular/material/dialog": "ng.material.dialog",
    "@angular/material/form-field": "ng.material.formField",
    "@angular/material/grid-list": "ng.material.gridList",
    "@angular/material/icon": "ng.material.icon",
    "@angular/material/input": "ng.material.input",
    "@angular/material/list": "ng.material.list",
    "@angular/material/menu": "ng.material.menu",
    "@angular/material/radio": "ng.material.radio",
    "@angular/material/select": "ng.material.select",
    "@angular/material/sidenav": "ng.material.sidenav",
    "@angular/material/slider": "ng.material.slider",
    "@angular/material/slide-toggle": "ng.material.slideToggle",
    "@angular/material/table": "ng.material.table",
    "@angular/material/tabs": "ng.material.tabs",
    "@angular/material/toolbar": "ng.material.toolbar",
    "@angular/material/tooltip": "ng.material.tooltip",

    # Primary entry-points in the project.
    "@ajf/core": "ajf.core",
    "@ajf/ionic": "ajf.ionic",
    "@ajf/material": "ajf.material",

    # Third-party libraries.
    "@gic/angular": "gic.angular",
    "@ionic/angular": "ionic.angular",
    "@ionic/core": "ionic.core",
    "@zxing/library": "zxing",
    "@ngx-translate/core": "ngxTranslate.core",
    "chart.js": "Chart",
    "css-element-queries": "cssElementQueries",
    "date-fns": "dateFns",
    "esprima": "esprima",
    "file-saver": "file-saver",
    "leaflet": "leaflet",
    "moment": "moment",
    "ngx-color-picker": "ngxColorPicker",
    "numbro": "numbro",
    "protractor": "protractor",
    "quill": "quill",
    "rxjs": "rxjs",
    "rxjs/operators": "rxjs.operators",
    "xlsx": "xlsx",
}

# Converts a string from dash-case to lower camel case.
def to_camel_case(input):
    segments = input.split("-")
    return segments[0] + "".join([x.title() for x in segments[1:]])

# Converts an entry-point name to a UMD module name.
# e.g. "snack-bar/testing" will become "snackBar.testing".
def to_umd_name(name):
    segments = name.split("/")
    return ".".join([to_camel_case(x) for x in segments])

# Creates globals for a given package and its entry-points.
def create_globals(packageName, entryPoints):
    ROLLUP_GLOBALS.update({
        "@ajf/%s/%s" % (packageName, ep): "ng.%s.%s" % (to_umd_name(packageName), to_umd_name(ep))
        for ep in entryPoints
    })

create_globals("core", CORE_ENTRYPOINTS)
create_globals("ionic", IONIC_ENTRYPOINTS + IONIC_TESTING_ENTRYPOINTS)
create_globals("material", MATERIAL_ENTRYPOINTS + MATERIAL_TESTING_ENTRYPOINTS)
create_globals("calendars", CALENDARS_ENTRYPOINTS + CALENDARS_TESTING_ENTRYPOINTS)

# Rollup globals the examples package. Since individual examples are
# grouped by package and component, the primary entry-point imports
# from entry-points which should be treated as external imports.
create_globals("ajf-examples/ionic", ["calendar"])
create_globals("ajf-examples/material", ["calendar"])
