"""
  Implementation of the "generate_vfs_fonts" rule. The implementation runs the
  vfs fonts generator executable in order to build a virtual file system
  containing the fonts needed for pdfmake.
"""

def _generate_vfs_fonts(ctx):
    input_files = ctx.files.srcs
    args = ctx.actions.args()
    out_file = ctx.outputs.output
    expected_outputs = [out_file]

    if not input_files:
        return None

    args.add(out_file.path)

    for input_file in input_files:
        args.add(input_file.path)

    ctx.actions.run(
        inputs = ctx.files.srcs,
        executable = ctx.executable._vfs_fonts_generator,
        outputs = expected_outputs,
        arguments = [args],
        progress_message = "GenerateVfsFonts",
    )

    return DefaultInfo(files = depset(expected_outputs))

"""
  Rule definition for the "generate_vfs_fonts" rule that can accept arbritary source files
  that will be grouped into specified sections. This is being used to package the docs
  content into a desired folder structure that can be shared with the docs application.
"""
generate_vfs_fonts = rule(
    implementation = _generate_vfs_fonts,
    attrs = {
        "srcs": attr.label_list(mandatory = True, allow_files = [".woff", ".woff2"]),
        "output": attr.output(mandatory = True),

        # Executable for this rule that is responsible for packaging the specified
        # targets into the associated sections.
        "_vfs_fonts_generator": attr.label(
            default = Label("//tools/vfs-fonts"),
            executable = True,
            cfg = "host",
        ),
    },
)
