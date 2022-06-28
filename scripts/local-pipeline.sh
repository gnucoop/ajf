#!/bin/bash

set -e

echo "Setup"
yarn install --frozen-lockfile --non-interactive

echo "Lint"
yarn -s lint

echo "Build"
node ./scripts/build.mjs

echo "Unit tests"
node ./scripts/test-ci.mjs

echo "E2E tests"
node ./scripts/e2e-ci.mjs

echo "Build release"
node ./scripts/release.mjs

echo "Build docs"
node ./scripts/build-docs.mjs
