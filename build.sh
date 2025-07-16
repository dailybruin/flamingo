#!/bin/bash

yarn build
docker build --platform="linux/amd64" -t dailybruin/flamingo:latest .
docker push dailybruin/flamingo:latest