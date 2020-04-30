def _interface_to_json_schema_impl(ctx):
    input_file = ctx.file.src
    tsconfig = ctx.file.tsconfig
    args = ctx.actions.args()

    args.add(tsconfig.path)
    args.add(input_file.path)
    args.add(ctx.attr.type)

    output_dir_path = "%s/%s" % (ctx.bin_dir.path, ctx.label.package)
    output_file = "%s.json" % ctx.label.name
    args.add("%s/%s" % (output_dir_path, output_file))

    args.add(ctx.label.name)
    args.add(ctx.attr.schema_base_url)
    args.add(ctx.attr.version)

    expected_outputs = [ctx.actions.declare_file(output_file)]

    ctx.actions.run(
        inputs = [input_file, tsconfig] + ctx.files.deps,
        executable = ctx.executable._generate_json_schema,
        outputs = expected_outputs,
        arguments = [args],
        progress_message = "InterfaceToJsonSchema",
    )

    return DefaultInfo(
        files = depset(expected_outputs),
    )

interface_to_json_schema = rule(
    implementation = _interface_to_json_schema_impl,
    attrs = {
        "tsconfig": attr.label(
            allow_single_file = True,
            default = Label("//tools/json-schema:tsconfig-generation.json"),
        ),
        "src": attr.label(
            allow_single_file = True,
            mandatory = True,
        ),
        "schema_base_url": attr.string(
            mandatory = True,
            default = "https://ajf.rocks/schemas/",
        ),
        "type": attr.string(
            mandatory = True,
        ),
        "version": attr.string(
            mandatory = True,
        ),
        "deps": attr.label_list(
            allow_files = True,
            mandatory = False,
        ),
        "_generate_json_schema": attr.label(
            default = Label("//tools/json-schema:generate-json-schema"),
            executable = True,
            cfg = "host",
        ),
    },
)
