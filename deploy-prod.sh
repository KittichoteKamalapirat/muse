#!/bin/bash

echo What should the version be?
read VERSION
echo What is your dokku password?
read PASSWORD

docker build -t kittishane/jocky:$VERSION .
docker push kittishane/jocky:$VERSION     

ssh shane@128.199.205.119 "docker pull kittishane/jocky:$VERSION && docker tag kittishane/jocky:$VERSION dokku/api:$VERSION && echo $PASSWORD | sudo -S dokku tags:deploy api $VERSION"
