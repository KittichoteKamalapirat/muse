#!/bin/bash

echo What should the version be?
read VERSION
echo What is your dokku password?
read PASSWORD

docker build -t kittishane/muse-test:$VERSION .
docker push kittishane/muse-test:$VERSION     
# 139 => test-server
# 128 => production
ssh root@139.59.110.114 "docker pull kittishane/muse-test:$VERSION && docker tag kittishane/muse-test:$VERSION dokku/test-api:$VERSION && echo $PASSWORD | sudo -S dokku tags:deploy test-api $VERSION"

# ssh shane@128.199.205.119 "echo $PASSWORD | sudo -S dokku tags:deploy server latest"
