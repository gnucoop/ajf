# Each placer holder is used to stamp versions during the build process, replacing the key with it's
# value pair. These replacements occur during building of `npm_package` and `ng_package` stamping in
# the peer dependencies and versions, primarily in `package.json`s.
AJF_ICONS_PACKAGE_VERSION = "^1.0.0"
ANGULAR_PACKAGE_VERSION = "^13.0.0-0 || ^14.0.0-0"
ANGULAR_MATERIAL_PACKAGE_VERSION = "^13.0.0-0 || ^14.0.0-0"
CHARTJS_PACKAGE_VERSION = "^2.9.3"
DATEFNS_PACKAGE_VERSION = "^2.14.0"
ESPRIMA_PACKAGE_VERSION = "^4.0.1"
FILE_SAVER_PACKAGE_VERSION = "^2.0.2"
FLAG_ICON_CSS_PACKAGE_VERSION = "^3.5.0"
GIC_PACKAGE_VERSION = "^5.0.0"
IONIC_PACKAGE_VERSION = "^5.0.0"
LEAFLET_PACKAGE_VERSION = "^1.6.0"
NGX_COLOR_PICKER_PACKAGE_VERSION = "^12.0.0"
TRNLC_PACKAGE_VERSION = "^3.0.0"
NUMBRO_PACKAGE_VERSION = "^2.3.1"
PDFMAKE_PACKAGE_VERSION = "^0.1.68"
QUILL_PACKAGE_VERSION = "^1.3.7"
RESIZE_OBSERVER_TYPES_PACKAGE_VERSION = "^0.1.5"
RXJS_PACKAGE_VERSION = "^6.5.3 || ^7.0.0"
TSLIB_PACKAGE_VERSION = "^2.2.0"
XLSX_PACKAGE_VERSION = "^0.17.0"
ZXINGB_PACKAGE_VERSION = "^0.0.9"
ZXINGL_PACKAGE_VERSION = "^0.18.6"

# Each placeholder is used to stamp versions during the build process, replacing the key with it's
# value pair. These replacements occur during building of `npm_package` and `ng_package` stamping in
# the peer dependencies and versions, primarily in `package.json`s.
NPM_PACKAGE_SUBSTITUTIONS = {
    "0.0.0-AJFI": AJF_ICONS_PACKAGE_VERSION,
    "0.0.0-ANGM": ANGULAR_MATERIAL_PACKAGE_VERSION,
    "0.0.0-ANGXCP": NGX_COLOR_PICKER_PACKAGE_VERSION,
    "0.0.0-CHART": CHARTJS_PACKAGE_VERSION,
    "0.0.0-DATEFNS": DATEFNS_PACKAGE_VERSION,
    "0.0.0-ESPRIMA": ESPRIMA_PACKAGE_VERSION,
    "0.0.0-FIC": FLAG_ICON_CSS_PACKAGE_VERSION,
    "0.0.0-FILESAVER": FILE_SAVER_PACKAGE_VERSION,
    "0.0.0-GIC": GIC_PACKAGE_VERSION,
    "0.0.0-ION": IONIC_PACKAGE_VERSION,
    "0.0.0-LEAFLET": LEAFLET_PACKAGE_VERSION,
    "0.0.0-NG": ANGULAR_PACKAGE_VERSION,
    "0.0.0-NUMBRO": NUMBRO_PACKAGE_VERSION,
    "0.0.0-PDFMAKE": PDFMAKE_PACKAGE_VERSION,
    "0.0.0-QUILL": QUILL_PACKAGE_VERSION,
    "0.0.0-ROT": RESIZE_OBSERVER_TYPES_PACKAGE_VERSION,
    "0.0.0-RXJS": RXJS_PACKAGE_VERSION,
    "0.0.0-TRNLC": TRNLC_PACKAGE_VERSION,
    "0.0.0-TSLIB": TSLIB_PACKAGE_VERSION,
    "0.0.0-ZXINGB": ZXINGB_PACKAGE_VERSION,
    "0.0.0-ZXINGL": ZXINGL_PACKAGE_VERSION,
    "0.0.0-XLSX": XLSX_PACKAGE_VERSION,
    # Version of the local package being built, generated via the `--workspace_status_command` flag.
    "0.0.0-PLACEHOLDER": "{BUILD_SCM_VERSION}",
}

NO_STAMP_NPM_PACKAGE_SUBSTITUTIONS = dict(NPM_PACKAGE_SUBSTITUTIONS, **{
    # When building NPM packages for tests (where stamping is disabled),
    # we use `0.0.0` for the version placeholder.
    "0.0.0-PLACEHOLDER": "0.0.0",
})

ANGULAR_PACKAGES_CONFIG = [
    ("@angular/animations", struct(entry_points = ["browser"])),
    ("@angular/cdk", struct(entry_points = ["a11y", "accordion", "bidi", "coercion", "collections", "drag-drop", "keycodes", "layout", "observers", "overlay", "platform", "portal", "scrolling", "table", "text-field"])),
    ("@angular/common", struct(entry_points = ["http/testing", "http", "testing"])),
    ("@angular/compiler", struct(entry_points = ["testing"])),
    ("@angular/core", struct(entry_points = ["testing"])),
    ("@angular/forms", struct(entry_points = [])),
    ("@angular/material", struct(entry_points = ["autocomplete", "button", "button-toggle", "card", "checkbox", "chips", "core", "dialog", "divider", "expansion", "form-field", "grid-list", "icon", "input", "list", "menu", "radio", "select", "sidenav", "slide-toggle", "slider", "table", "tabs", "toolbar", "tooltip"])),
    ("@angular/platform-browser", struct(entry_points = ["testing", "animations"])),
    ("@angular/platform-server", struct(entry_points = [], platform = "node")),
    ("@angular/platform-browser-dynamic", struct(entry_points = ["testing"])),
    ("@angular/router", struct(entry_points = [])),
]

THIRD_PARTY_PACKAGES_CONFIG = [
    ("@gic/angular", "gic-angular", struct(entry_points = [])),
    ("@ionic/angular", "ionic-angular", struct(entry_points = [])),
    ("@ngneat/transloco", "ngneat-transloco", struct(entry_points = [])),
    ("@gnucoop/ngx-color-picker", "gnucoop-ngx-color-picker", struct(entry_points = [])),
]

ANGULAR_PACKAGES = [
    struct(
        name = name[len("@angular/"):],
        entry_points = config.entry_points,
        platform = config.platform if hasattr(config, "platform") else "browser",
        module_name = name,
    )
    for name, config in ANGULAR_PACKAGES_CONFIG
]

THIRD_PARTY_PACKAGES = [
    struct(
        name = name,
        main_entry_point = ep,
        entry_points = config.entry_points,
        platform = "browser",
        module_name = name,
    )
    for name, ep, config in THIRD_PARTY_PACKAGES_CONFIG
]
