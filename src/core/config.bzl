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

# Within the core, only a few targets have sass libraries which need to be
# part of the release package. This list declares all CDK targets with sass
# libraries that need to be included and re-exported at the package root.
CORE_ENTRYPOINTS_WITH_STYLES = [
    "chart",
    "forms",
    "map",
    "page-break",
    "page-slider",
    "table",
    "text",
]

# List of all entry-point targets of the Ajf core package.
CORE_TARGETS = ["//src/core"] + ["//src/core/%s" % ep for ep in CORE_ENTRYPOINTS]

CORE_SCSS_LIBS = [
    "//src/core/%s:%s_scss_lib" % (p, p.replace("-", "_"))
    for p in CORE_ENTRYPOINTS_WITH_STYLES
]

CORE_SCHEMAS = [
    "ajf-form-strict-schema",
    "ajf-form-schema",
    "ajf-report-strict-schema",
    "ajf-report-schema",
]

CORE_ASSETS = [
    "//src/core/schemas:%s" % s
    for s in CORE_SCHEMAS
]
