#!/bin/bash

echo What should the version be?
read VERSION
echo What is your dokku password?
read PASSWORD

docker build -t kittishane/muse:$VERSION .
docker push kittishane/muse:$VERSION     
# 139 => test-server
# 128 => production
ssh shane@128.199.205.119 "docker pull kittishane/muse:$VERSION && docker tag kittishane/muse:$VERSION dokku/server:$VERSION && echo $PASSWORD | sudo -S dokku tags:deploy server $VERSION"

# ssh shane@128.199.205.119 "echo $PASSWORD | sudo -S dokku tags:deploy server latest"
