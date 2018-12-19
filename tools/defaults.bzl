# Re-export of Bazel rules with repository-wide defaults

load("@angular//:index.bzl", _ng_module = "ng_module", _ng_package = "ng_package")
load("@build_bazel_rules_nodejs//:defs.bzl", _jasmine_node_test = "jasmine_node_test")
load("@build_bazel_rules_typescript//:defs.bzl", _ts_library = "ts_library",
  _ts_web_test_suite = "ts_web_test_suite")
load("//tools/markdown-to-html:index.bzl", _markdown_to_html = "markdown_to_html")
load("//:packages.bzl", "VERSION_PLACEHOLDER_REPLACEMENTS")
load("//tools/build_files/ionic:defs.bzl", "IONIC_FILES", "IONIC_ENTRIES", "IONIC_CORE_FILES")

_DEFAULT_TSCONFIG_BUILD = "//src:bazel-tsconfig-build.json"
_DEFAULT_TSCONFIG_TEST = "//src:bazel-tsconfig-test.json"
_DEFAULT_TS_TYPINGS = "@ajfdeps//typescript:typescript__typings"

# Re-exports to simplify build file load statements
markdown_to_html = _markdown_to_html

def _getDefaultTsConfig(testonly):
  if testonly:
    return _DEFAULT_TSCONFIG_TEST
  else:
    return _DEFAULT_TSCONFIG_BUILD

def ts_library(tsconfig = None, deps = [], testonly = False, **kwargs):
  # Add tslib because we use import helpers for all public packages.
  local_deps = ["@ajfdeps//tslib"] + deps

  if not tsconfig:
    tsconfig = _getDefaultTsConfig(testonly)

  _ts_library(
    tsconfig = tsconfig,
    testonly = testonly,
    deps = local_deps,
    node_modules = _DEFAULT_TS_TYPINGS,
    **kwargs
  )

def ng_module(deps = [], tsconfig = None, testonly = False, **kwargs):
  if not tsconfig:
    tsconfig = _getDefaultTsConfig(testonly)

  local_deps = [
    # Add tslib because we use import helpers for all public packages.
    "@ajfdeps//tslib",

    # Depend on the module typings for each `ng_module`. Since all components within the project
    # need to use `module.id` when creating components, this is always a dependency.
    "//src:module-typings"
  ] + deps

  _ng_module(
    deps = local_deps,
    tsconfig = tsconfig,
    testonly = testonly,
    node_modules = _DEFAULT_TS_TYPINGS,
    **kwargs
  )

def ng_package(name, readme_md = None, **kwargs):
  # If no readme file has been specified explicitly, use the default readme for
  # release packages from "src/README.md".
  if not readme_md:
    readme_md = "//src:README.md"
  _ng_package(
    name = name,
    readme_md = readme_md,
    replacements = VERSION_PLACEHOLDER_REPLACEMENTS,
    **kwargs
  )

def jasmine_node_test(deps = [], **kwargs):
  local_deps = [
    # Workaround for: https://github.com/bazelbuild/rules_nodejs/issues/344
    "@ajfdeps//jasmine",
    "@ajfdeps//source-map-support",
  ] + deps

  _jasmine_node_test(
    deps = local_deps,
    **kwargs
  )

def ng_test_library(deps = [], static_files = [], tsconfig = None, **kwargs):
  local_deps = [
    # We declare "@angular/core" and "@angular/core/testing" as default dependencies because
    # all Angular component unit tests use the `TestBed` and `Component` exports.
    "@angular//packages/core",
    "@angular//packages/core/testing",
    "@ajfdeps//@types/jasmine",
    "@ajfdeps//debug",
    "@ajfdeps//esprima",
    "@ajfdeps//numeral",
  ] + deps;

  ts_library(
    testonly = 1,
    deps = local_deps,
    **kwargs
  )

def ts_web_test_suite(srcs = [], **kwargs):
  _ts_web_test_suite(
    # Required for running the compiled ng modules that use TypeScript import helpers.
    srcs = ["@ajfdeps//node_modules/tslib:tslib.js"] + srcs,
    **kwargs
  )

def ng_web_test_suite(deps = [], static_files = [], static_css = [], bootstrap = [], **kwargs):
  # Workaround for https://github.com/bazelbuild/rules_typescript/issues/301
  # Since some of our tests depend on CSS files which are not part of the `ng_module` rule,
  # we need to somehow load static CSS files within Karma (e.g. overlay prebuilt). Those styles
  # are required for successful test runs. Since the `ts_web_test_suite` rule currently only
  # allows JS files to be included and served within Karma, we need to create a JS file that
  # loads the given CSS file.
  for css_label in static_css:
    css_id = "static-css-file-%s" % (css_label.replace("/", "_").replace(":", "-"))
    deps += [":%s" % css_id]

    native.genrule(
      name = css_id,
      srcs = [css_label],
      outs = ["%s.js" % css_id],
      output_to_bindir = True,
      cmd = """
        files=($(locations %s))
        css_content=$$(cat $${files[0]})
        js_template="var cssElement = document.createElement('style'); \
                    cssElement.type = 'text/css'; \
                    cssElement.innerHTML = '$$css_content'; \
                    document.head.appendChild(cssElement);"

         echo $$js_template > $@
      """ % css_label
    )

  ts_web_test_suite(
    # Depend on our custom test initialization script. This needs to be the first dependency.
    deps = ["//test:requirejs_init", "//test:angular_test_init"] + deps,
    bootstrap = [
      "@ajfdeps//node_modules/zone.js:dist/zone-testing-bundle.js",
      "@ajfdeps//node_modules/reflect-metadata:Reflect.js",
      "@ajfdeps//node_modules/hammerjs:hammer.js",
    ] + bootstrap,
    static_files = [
      "@ajfdeps//node_modules/esprima:esprima.js",
      "@ajfdeps//node_modules/numeral:min/numeral.min.js",
      "@ajfdeps//node_modules/@ngx-translate/core:bundles/ngx-translate-core.umd.js",
      "//test:debug_bundle.umd.js",
      "//test:date_fns_bundle.umd.js",
    ] + static_files,
    **kwargs
  )

def ion_web_test_suite(deps = [], static_files = [], static_css = [], bootstrap = [], **kwargs):
  # Workaround for https://github.com/bazelbuild/rules_typescript/issues/301
  # Since some of our tests depend on CSS files which are not part of the `ng_module` rule,
  # we need to somehow load static CSS files within Karma (e.g. overlay prebuilt). Those styles
  # are required for successful test runs. Since the `ts_web_test_suite` rule currently only
  # allows JS files to be included and served within Karma, we need to create a JS file that
  # loads the given CSS file.
  for css_label in static_css:
    css_id = "static-css-file-%s" % (css_label.replace("/", "_").replace(":", "-"))
    deps += [":%s" % css_id]

    native.genrule(
      name = css_id,
      srcs = [css_label],
      outs = ["%s.js" % css_id],
      output_to_bindir = True,
      cmd = """
        files=($(locations %s))
        css_content=$$(cat $${files[0]})
        js_template="var cssElement = document.createElement('style'); \
                    cssElement.type = 'text/css'; \
                    cssElement.innerHTML = '$$css_content'; \
                    document.head.appendChild(cssElement);"

         echo $$js_template > $@
      """ % css_label
    )
  
  ionic_files = ["//test:build/%s.js" % f for f in IONIC_FILES]
  ionic_entries = ["//test:build/%s.entry.js" % f for f in IONIC_ENTRIES]
  ionic_core_files = ["//test:ionic/%s.es5.js" % f for f in IONIC_FILES]
  ionic_core_entries = ["//test:ionic/%s.es5.entry.js" % f for f in IONIC_ENTRIES]
  ionic_core_main_files = ["//test:ionic/ionic.r9tjmy9m.js"] # % f for f in IONIC_CORE_FILES]

  ts_web_test_suite(
    # Depend on our custom test initialization script. This needs to be the first dependency.
    deps = ["//test:requirejs_init", "//test:angular_test_init"] + deps,
    bootstrap = [
      "@ajfdeps//node_modules/zone.js:dist/zone-testing-bundle.js",
      "@ajfdeps//node_modules/reflect-metadata:Reflect.js",
      "@ajfdeps//node_modules/hammerjs:hammer.js",
      "//tools/build_files/ionic:init-resources-url.js",
      "@ajfdeps//node_modules/@ionic/core:dist/ionic.js",
    ] + bootstrap,
    static_files = [
      "@ajfdeps//node_modules/esprima:esprima.js",
      "@ajfdeps//node_modules/numeral:min/numeral.min.js",
      "@ajfdeps//node_modules/@ionic/core:loader/index.js",
      "@ajfdeps//node_modules/@ionic/core:dist/ionic/svg/index.js",
      "@ajfdeps//node_modules/@ionic-native/keyboard:ngx/index.js",
      "@ajfdeps//node_modules/@ngx-translate/core:bundles/ngx-translate-core.umd.js",
      "//test:debug_bundle.umd.js",
      "//test:date_fns_bundle.umd.js",
      "//test:ionic_core_loader_bundle.umd.js",
      "//test:ionic_core_bundle.umd.js",
      "//test:ionic_native_keyboard_bundle.umd.js",
      "//test:ionicons_bundle.umd.js",
      "//test:ionicons_icons_bundle.umd.js",
    ] + ionic_files + ionic_entries
    + ionic_core_files + ionic_core_entries + ionic_core_main_files
    + static_files,
    **kwargs
  )
