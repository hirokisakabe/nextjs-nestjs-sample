# nextjs-nestjs-sample

```sh
# Generate API Client
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli:v6.4.0 generate \
    -i /local/backend/openapi.yaml \
    -g typescript-fetch \
    -o /local/frontend/src/api-client
```
