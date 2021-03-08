#!/usr/bin/env bash

set -e 

# Prepare the bundle
npm run build

# Rename index
mv "build/client/index.htm" "build/client/index.html"

# Generate android APK
npx cap copy android
(
  cd android/
  ./gradlew assembleDebug
)
cp "android/app/build/outputs/apk/debug/app-debug.apk" "build/app-debug.apk"
echo "Android apk saved at: ./build/app-debug.apk"

# Generate iOS IPA
# TODO ...
