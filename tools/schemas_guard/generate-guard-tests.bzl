"""JSON schema guard tests"""

load("//tools/schemas_guard:diff_test.bzl", "diff_test")

def generate_test_targets(schemas):
    """Macro to generate JSON schema guard tests.

    The test succeeds if the JSON schema has not changed with respect to the golden file stored in
    the repository. Otherwise schema version must incremented and golden file must be updated.
    Args:
        schemas: The JSON schemas to test
    """
    for schema in schemas:
        test_name = "%s_json_schema" % schema["name"]
        file1 = "//src/%s/schemas:%s" % (schema["package"], schema["name"])
        file2 = "//tools/schemas_guard:%s/%s.json" % (schema["package"], schema["name"])
        diff_test(test_name, file1, file2)
