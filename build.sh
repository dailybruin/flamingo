#!/bin/bash

yarn build
docker build --platform="linux/amd64" -t registry.digitalocean.com/dailybruin/flamingotestedamd64:latest .
docker push registry.digitalocean.com/dailybruin/flamingotestedamd64:latest