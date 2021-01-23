#!/bin/bash

if [[ -z "$CI" ]]; then
    echo "You are not in a CI context. Quitting."
    exit 1
fi

echo "Assuming this is a local deployment"

yarn build
yarn push:misc
yarn push:site
