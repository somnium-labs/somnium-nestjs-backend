#!/bin/bash

# Check if a folder should be excluded
should_exclude_folder() {
  local folder_name="$1"
  local excluded_folder="$2"
  [ "$folder_name" == "$excluded_folder" ] && return 0
  return 1
}

# Parse command-line parameters
while getopts ":e:" opt; do
  case $opt in
    e)
      excluded_folder="$OPTARG"
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done

npm run build:proto

# Build apps except excluded folder
for app in ./apps/*; do
  if [ -d "$app" ]; then
    app_name=$(basename "$app")
    if should_exclude_folder "$app_name" "$excluded_folder"; then
      echo "Skipping excluded folder: $app_name"
    else
      nest build "$app_name"
    fi
  fi
done

# Build libraries except excluded folder
for lib in ./libs/*; do
  if [ -d "$lib" ]; then
    lib_name=$(basename "$lib")
    if should_exclude_folder "$lib_name" "$excluded_folder"; then
      echo "Skipping excluded folder: $lib_name"
    else
      nest build "$lib_name"
    fi
  fi
done


for app in ./apps/*; do
  if [ -d "$app" ]; then
    app_name=$(basename "$app")
    if should_exclude_folder "$app_name" "$excluded_folder"; then
      echo "Skipping excluded folder: $app_name"
    else
      docker stop "$app_name"
      docker rmi "somniumlabs/$app_name:latest"
      docker build -t "somniumlabs/$app_name:latest" -f "apps/$app_name/Dockerfile" .
    fi
  fi
done