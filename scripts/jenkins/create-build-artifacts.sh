#!/bin/bash

set -e

PACKAGES=(calendars core ionic material)
CWD=`pwd`

for ((i = 0; i < ${#PACKAGES[@]}; i++)); do
  packageName=${PACKAGES[${i}]}
  packageDir="${CWD}/dist/releases/${packageName}"

  cd "${packageDir}"
  yarn pack
done
