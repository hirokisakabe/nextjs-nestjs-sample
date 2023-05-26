#!/bin/sh

mv openapi.yaml openapi.yaml_tmp

npm run openapi:export

# Check diffs without content attribute
open_api_yaml_without_content_attribute=$(docker run -i --rm mikefarah/yq 'del(.. | select(has("content")).content)' <openapi.yaml_tmp)
echo "$open_api_yaml_without_content_attribute" >openapi.yaml_tmp_without_content_attribute

diff openapi.yaml openapi.yaml_tmp_without_content_attribute

clean_up() {
    rm -rf openapi.yaml
    rm -rf openapi.yaml_tmp_without_content
    mv openapi.yaml_tmp openapi.yaml
}

ret=$?
if [ ! $ret = 0 ]; then
    echo "openapi.yaml has not been updated."
    clean_up
    exit 1
fi

clean_up
