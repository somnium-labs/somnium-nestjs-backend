#!/bin/bash

# package.json의 version 읽기
current_version=$(jq -r .version package.json)
echo "Current Version: $current_version"

# version에서 major, minor, revision 값을 분리
major=$(echo $current_version | cut -d. -f1)
minor=$(echo $current_version | cut -d. -f2)
revision=$(echo $current_version | cut -d. -f3)

# revision 값을 증가
((revision++))

# 새로운 version 값 생성
version="$major.$minor.$revision"
echo "New Version: $version"

# package.json에서 version 업데이트
jq --arg v "$version" '.version = $v' package.json > package_temp.json && mv package_temp.json package.json

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
      # helm chart의 appVersion 업데이트
      yq eval ".image.tag = \"$version\"" k8s-configs/helm/$app_name/values.local.yaml -i
      
      echo "Building docker image for $app_name"
      # docker stop "$app_name"
      
      docker build -t "somniumlabs/$app_name:$version" -f "apps/$app_name/Dockerfile" .
      
      docker tag somniumlabs/$app_name:$version 192.168.0.67:5000/$app_name:$version
      docker push 192.168.0.67:5000/$app_name:$version
      # docker tag somniumlabs/$app_name:latest public.ecr.aws/b5d3j6b0/$app_name:latest
      # docker push public.ecr.aws/b5d3j6b0/$app_name:latest

      # 기존 버전의 이미지 삭제
      docker rmi "somniumlabs/$app_name:$current_version"
    fi
  fi
done

# Remove dangling images (tag: <none>)
# docker rmi $(docker images -f "dangling=true" -q)
