#!/bin/bash

set -e

echo "Setup"
yarn install --frozen-lockfile --non-interactive

echo "Lint"
yarn -s lint

echo "Build"
./scripts/build.mjs

echo "Unit tests"
yarn -s test:ci

echo "E2E tests"
./scripts/e2e-ci.mjs

echo "Build release"
./scripts/release.mjs

echo "Build docs"
./scripts/build-docs.mjs
