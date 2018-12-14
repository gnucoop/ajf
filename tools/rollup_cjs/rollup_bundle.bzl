load("@build_bazel_rules_nodejs//internal/common:collect_es6_sources.bzl", "collect_es6_sources")
load("@build_bazel_rules_nodejs//internal/common:module_mappings.bzl", "get_module_mappings")
load("@build_bazel_rules_nodejs//internal/common:node_module_info.bzl", "NodeModuleInfo", "collect_node_modules_aspect")
load("@build_bazel_rules_nodejs//internal/rollup:rollup_bundle.bzl", "rollup_module_mappings_aspect",
  "run_rollup", "run_sourcemapexplorer",
  "run_uglify", "write_rollup_config")

def _run_tsc(ctx, input, output):
  args = ctx.actions.args()
  args.add_all(["--target", "es5"])
  args.add("--allowJS")
  args.add(input.path)
  args.add_all(["--outFile", output.path])

  ctx.actions.run(
    executable = ctx.executable._tsc,
    inputs = [input],
    outputs = [output],
    arguments = [args],
  )

def _rollup_bundle(ctx):
  rollup_config = write_rollup_config(ctx)
  run_rollup(ctx, collect_es6_sources(ctx), rollup_config, ctx.outputs.build_es6)
  _run_tsc(ctx, ctx.outputs.build_es6, ctx.outputs.build_es5)
  source_map = run_uglify(ctx, ctx.outputs.build_es5, ctx.outputs.build_es5_min)
  run_uglify(ctx, ctx.outputs.build_es5, ctx.outputs.build_es5_min_debug, debug = True)
  cjs_rollup_config = write_rollup_config(ctx, filename = "_%s_cjs.rollup.conf.js", output_format = "cjs")
  run_rollup(ctx, collect_es6_sources(ctx), cjs_rollup_config, ctx.outputs.build_cjs)
  umd_rollup_config = write_rollup_config(ctx, filename = "_%s_umd.rollup.conf.js", output_format = "umd")
  run_rollup(ctx, collect_es6_sources(ctx), umd_rollup_config, ctx.outputs.build_umd)
  run_sourcemapexplorer(ctx, ctx.outputs.build_es5_min, source_map, ctx.outputs.explore_html)
  files = [ctx.outputs.build_es5_min, source_map]
  return DefaultInfo(files = depset(files), runfiles = ctx.runfiles(files))

ROLLUP_DEPS_ASPECTS = [rollup_module_mappings_aspect, collect_node_modules_aspect]

ROLLUP_ATTRS = {
  "entry_point": attr.string(
    doc = """The starting point of the application, passed as the `--input` flag to rollup.
    This should be a path relative to the workspace root.
    """,
    mandatory = True,
  ),
  "srcs": attr.label_list(
    doc = """JavaScript source files from the workspace.
    These can use ES2015 syntax and ES Modules (import/export)""",
    allow_files = [".js"],
  ),
  "deps": attr.label_list(
    doc = """Other rules that produce JavaScript outputs, such as `ts_library`.""",
    aspects = ROLLUP_DEPS_ASPECTS,
  ),
  "node_modules": attr.label(
    doc = """Dependencies from npm that provide some modules that must be
    resolved by rollup.
    This attribute is DEPRECATED. As of version 0.13.0 the recommended approach
    to npm dependencies is to use fine grained npm dependencies which are setup
    with the `yarn_install` or `npm_install` rules. For example, in a rollup_bundle
    target that used the `node_modules` attribute,
    ```
    rollup_bundle(
      name = "bundle",
      ...
      node_modules = "//:node_modules",
    )
    ```
    which specifies all files within the `//:node_modules` filegroup
    to be inputs to the `bundle`. Using fine grained npm dependencies,
    `bundle` is defined with only the npm dependencies that are
    needed:
    ```
    rollup_bundle(
      name = "bundle",
      ...
      deps = [
          "@npm//foo",
          "@npm//bar",
          ...
      ],
    )
    ```
    In this case, only the `foo` and `bar` npm packages and their
    transitive deps are includes as inputs to the `bundle` target
    which reduces the time required to setup the runfiles for this
    target (see https://github.com/bazelbuild/bazel/issues/5153).
    The @npm external repository and the fine grained npm package
    targets are setup using the `yarn_install` or `npm_install` rule
    in your WORKSPACE file:
    yarn_install(
      name = "npm",
      package_json = "//:package.json",
      yarn_lock = "//:yarn.lock",
    )
    """,
    default = Label("//:node_modules_none"),
  ),
  "license_banner": attr.label(
    doc = """A .txt file passed to the `banner` config option of rollup.
    The contents of the file will be copied to the top of the resulting bundles.
    Note that you can replace a version placeholder in the license file, by using
    the special version `0.0.0-PLACEHOLDER`. See the section on stamping in the README.""",
    allow_single_file = [".txt"],
  ),
  "globals": attr.string_dict(
    doc = """A dict of symbols that reference external scripts.
    The keys are variable names that appear in the program,
    and the values are the symbol to reference at runtime in a global context (UMD bundles).
    For example, a program referencing @angular/core should use ng.core
    as the global reference, so Angular users should include the mapping
    `"@angular/core":"ng.core"` in the globals.""",
    default = {},
  ),
  "global_name": attr.string(
    doc = """A name given to this package when referenced as a global variable.
    This name appears in the bundle module incantation at the beginning of the file,
    and governs the global symbol added to the global context (e.g. `window`) as a side-
    effect of loading the UMD/IIFE JS bundle.
    Rollup doc: "The variable name, representing your iife/umd bundle, by which other scripts on the same page can access it."
    This is passed to the `output.name` setting in Rollup.""",
  ),
  "_rollup": attr.label(
    executable = True,
    cfg = "host",
    default = Label("//tools/rollup_cjs:rollup"),
  ),
  "_tsc": attr.label(
    executable = True,
    cfg = "host",
    default = Label("@build_bazel_rules_nodejs//internal/rollup:tsc"),
  ),
  "_tsc_directory": attr.label(
    executable = True,
    cfg = "host",
    default = Label("@build_bazel_rules_nodejs//internal/rollup:tsc-directory"),
  ),
  "_uglify_wrapped": attr.label(
    executable = True,
    cfg = "host",
    default = Label("@build_bazel_rules_nodejs//internal/rollup:uglify-wrapped"),
  ),
  "_source_map_explorer": attr.label(
    executable = True,
    cfg = "host",
    default = Label("@build_bazel_rules_nodejs//internal/rollup:source-map-explorer"),
  ),
  "_no_explore_html": attr.label(
    default = Label("@build_bazel_rules_nodejs//internal/rollup:no_explore.html"),
    allow_single_file = True,
  ),
  "_rollup_config_tmpl": attr.label(
    default = Label("//tools/rollup_cjs:rollup.config.js"),
    allow_single_file = True,
  ),
  "_system_config_tmpl": attr.label(
    default = Label("@build_bazel_rules_nodejs//internal/rollup:system.config.js"),
    allow_single_file = True,
  ),
}

ROLLUP_OUTPUTS = {
  "build_es6": "%{name}.es6.js",
  "build_es5": "%{name}.js",
  "build_es5_min": "%{name}.min.js",
  "build_es5_min_debug": "%{name}.min_debug.js",
  "build_umd": "%{name}.umd.js",
  "build_cjs": "%{name}.cjs.js",
  "explore_html": "%{name}.explore.html",
}

rollup_bundle = rule(
  implementation = _rollup_bundle,
  attrs = ROLLUP_ATTRS,
  outputs = ROLLUP_OUTPUTS,
)
