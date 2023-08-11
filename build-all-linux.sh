#!/bin/bash

npm run build:proto

# Build all apps
for app in $(find ./apps -maxdepth 1 -type d -printf '%P\n'); do
  nest build "$app"
done

# Build all libraries
for lib in $(find ./libs -maxdepth 1 -type d -printf '%P\n'); do
  nest build "$lib"
done
