#!/bin/bash

set -e

mkdir -p mock
cp ../backend/openapi.yaml ./mock/openapi.yaml

docker build . -f scripts/ci/Dockerfile.ci -t frontend
docker build mock -f scripts/ci/Dockerfile.backend.mock -t mock
docker compose -f scripts/ci/docker-compose.yaml up --exit-code-from frontend

if ! [[ "$?" == "0" ]]; then
    echo "FAIL: Check next build Failed"
    exit 1
else
    echo "PASS: Check next build Pass"
    exit 0
fi
