"""Install Ajf source dependencies"""

load("@build_bazel_rules_nodejs//:defs.bzl", "yarn_install")

def ajf_setup_workspace():
  """
    This repository rule should be called from your WORKSPACE file.
    It creates some additional Bazel external repositories that are used internally
    to build Ajf
  """
  # Use Bazel managed node modules. See more below:
  # https://github.com/bazelbuild/rules_nodejs#bazel-managed-vs-self-managed-dependencies
  # Note: The repository_rule name is `@ajfdeps` so it does not conflict with the `@npm` repository
  # name downstream when building Ajf from source. In the future when Angular + Bazel
  # users can build using the @ajf npm bundles (depends on Ivy) this can be changed
  # to `@npm`.
  yarn_install(
    name = "ajfdeps",
    package_json = "@ajf//:package.json",
    # Ensure that the script is available when running `postinstall` in the Bazel sandbox.
    data = ["@ajf//:tools/npm/check-npm.js"],
    yarn_lock = "@ajf//:yarn.lock",
  )
