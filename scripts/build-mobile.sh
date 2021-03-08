#!/usr/bin/env bash

set -e 

# Prepare the bundle
NODE_ENV=production npm run build

# Rename index
mv "build/client/index.htm" "build/client/index.html"

# Generate android APK
npx cap copy android
(
  cd android/
  ./gradlew assembleRelease
)
cp "android/app/build/outputs/apk/release/app-release.apk" "build/app-release.apk"
echo "Android apk saved at: ./build/app-release.apk"

# Generate iOS IPA
# TODO ...
