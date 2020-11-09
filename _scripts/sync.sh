#!/usr/bin/env bash

# Now sync the static assets
if [[ ! -e misc ]]; then
    echo "Could could find the misc assets folder."
    exit 1
fi

DATE=$(date "+%Y-%m-%dT%H.%M.%S")

# Make sure all misc assets are built and synced
pushd misc || exit
  yarn
  yarn build
  yarn push
popd || exit

# Then commit stuff to Github. This kicks off a CI/CD build.
echo "Pushing log to remote repo"
git pull origin master
git add .
git commit -m "${DATE}"
git push origin master
