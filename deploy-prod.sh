#!/bin/bash

# run with ./deploy-prod.sh
# dokku password is chain123

echo What should the version be?
read VERSION
echo What is your dokku password?
read PASSWORD

docker build -t kittishane/jocky:$VERSION .
docker push kittishane/jocky:$VERSION     

ssh root@68.183.179.134 "docker pull kittishane/jocky:$VERSION && docker tag kittishane/jocky:$VERSION dokku/api:$VERSION && echo $PASSWORD | sudo -S dokku tags:deploy api $VERSION"
# ssh root@139.59.110.114 "docker pull kittishane/jocky:$VERSION && docker tag kittishane/jocky:$VERSION dokku/test-api:$VERSION && echo $PASSWORD | sudo -S dokku tags:deploy test-api $VERSION"





