"""Public API surface is re-exported here.
This API is exported for users building Ajf from source in
downstream projects.
"""

load("//tools:ajf_setup_workspace.bzl",
    _ajf_setup_workspace = "ajf_setup_workspace")

ajf_setup_workspace = _ajf_setup_workspace