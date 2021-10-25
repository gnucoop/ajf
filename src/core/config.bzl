# List of all entry-points of the Ajf core package.
CORE_ENTRYPOINTS_WITHOUT_STYLES = [
    "barcode",
    "calendar",
    "checkbox-group",
    "common",
    "image",
    "models",
    "node-icon",
    "pdfmake",
    "range",
    "time",
    "transloco",
    "utils",
]

CORE_ENTRYPOINTS_WITH_STYLES = [
    "chart",
    "file-input",
    "forms",
    "map",
    "page-break",
    "page-slider",
    "reports",
    "table",
    "text",
]

CORE_ENTRYPOINTS = CORE_ENTRYPOINTS_WITHOUT_STYLES + CORE_ENTRYPOINTS_WITH_STYLES

# List of all entry-point targets of the Ajf core package.
CORE_TARGETS = ["//src/core"] + ["//src/core/%s" % ep for ep in CORE_ENTRYPOINTS]

CORE_SCSS_LIBS = [
    "//src/core/%s:%s_scss_lib" % (p, p.replace("-", "_"))
    for p in CORE_ENTRYPOINTS_WITH_STYLES
]
