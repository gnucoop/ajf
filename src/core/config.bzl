# List of all entry-points of the Ajf core package.
CORE_ENTRYPOINTS_WITHOUT_STYLES = [
    "vfs-fonts",
]

CORE_ENTRYPOINTS_WITH_STYLES = [
    "barcode",
    "calendar",
    "chart",
    "checkbox-group",
    "common",
    "file-input",
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
    "time",
    "transloco",
    "utils",
]

CORE_ENTRYPOINTS = CORE_ENTRYPOINTS_WITHOUT_STYLES + CORE_ENTRYPOINTS_WITH_STYLES

# List of all entry-point targets of the Ajf core package.
CORE_TARGETS = ["//src/core"] + ["//src/core/%s" % ep for ep in CORE_ENTRYPOINTS]

CORE_SCSS_LIBS = [
    "//src/core/%s:%s_scss_lib" % (p, p.replace("-", "_"))
    for p in CORE_ENTRYPOINTS_WITH_STYLES
]
