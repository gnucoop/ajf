# List of all entry-points of the Ajf core package.
CORE_ENTRYPOINTS = [
    "barcode",
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
    "time",
    "utils",
]

# List of all entry-point targets of the Ajf core package.
CORE_TARGETS = ["//src/core"] + ["//src/core/%s" % ep for ep in CORE_ENTRYPOINTS]

CORE_SCSS_LIBS = [
    "//src/core/%s:%s_scss_lib" % (p, p.replace("-", "_"))
    for p in CORE_ENTRYPOINTS
]
