#!/bin/bash

echo What is your dokku password?
read -s PASSWORD
echo $PASSWORD |sudo ls
