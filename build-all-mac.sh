#!/bin/bash

npm run build:proto

# Build all apps
for app in ./apps/*; do
  [ -d "$app" ] && app_name=$(basename "$app") && nest build "$app_name"
done

# Build all libraries
for lib in ./libs/*; do
  [ -d "$lib" ] && lib_name=$(basename "$lib") && nest build "$lib_name"
done
