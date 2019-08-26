#!/bin/bash

# The script should immediately exit if any command in the script fails.
set -e

yarn gulp clean

yarn gulp stage-deploy:devapp-mat

scp tar cfj - -C dist/packages/dev-app-mat . | ssh gnucoopdevmat@dev-mat.ajf.rocks:../../web

yarn gulp stage-deploy:devapp-ion

scp tar cfj - -C dist/packages/dev-app-ion . | ssh gnucoopdevion@dev-ion.ajf.rocks:../../web
