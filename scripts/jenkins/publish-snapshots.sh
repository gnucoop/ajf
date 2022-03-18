#!/bin/bash

# This script should fail if one of the individual publish scripts fails.
set -e

# Go to project directory.
cd $(dirname ${0})/../..

# Deploy build artifacts to the GitHub build repositories. The release output is already
# fetched from the Jenkins workspace storage.
./scripts/jenkins/publish-build-artifacts.sh

# Deploy the docs content to the Github repository. We don't want to build the examples
# package here again because it's already fetched from the Jenkins workspace storage.
./scripts/jenkins/publish-docs-content.sh
