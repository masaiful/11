#!/usr/bin/env bash

MISC_ASSET_PATH=$(grep "const MISC_PATH" _scripts/eleventy/config.js | cut -d\" -f2)

# Now sync the static assets
if [[ ! -e "$MISC_ASSET_PATH" ]]; then
    echo "Could could find the misc assets folder."
    exit 1
fi

DATE=$(date "+%Y-%m-%dT%H.%M.%S")

# Only pushing misc assets. Site is deployed by CircleCI.
yarn build
yarn push:misc

# Then commit stuff to Github. This kicks off a CI/CD build.
echo "Pushing log to remote repo"
git pull origin master
git add .
git commit -m "${DATE}"
git push origin master
