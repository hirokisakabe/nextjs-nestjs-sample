#!/bin/sh

mv openapi.yaml openapi.yaml_tmp

npm run openapi:export

diff openapi.yaml openapi.yaml_tmp

ret=$?
if [ ! $ret = 0 ]; then
    echo "openapi.yaml has not been updated."
    exit 1
fi
