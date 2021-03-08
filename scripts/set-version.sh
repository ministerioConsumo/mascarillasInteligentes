#!/usr/bin/env bash

# Script to update the Android/iOS versioning info.
# Called automatically by yarn on version updates.


# Check usage
if [ $# -ne 1 ]; then
  echo "Usage: $0 x.y.z"
  exit 1
fi

# Update Android
gawk -i inplace '/ *versionCode/{print "       ", $1, $2+1; next};{print}' ./android/app/build.gradle
gawk -i inplace '/ *versionName/{print "       ", $1, "\"'$1'\""; next};{print}' ./android/app/build.gradle

# Update iOS
gawk -i inplace '/ *MARKETING_VERSION/{print "                              ", $1, "= '$1';"; next};{print}' "./ios/App/App.xcodeproj/project.pbxproj"

# Finally add updated files in git, so they get picked by Yarn
git add ./android/app/build.gradle
git add "./ios/App/App.xcodeproj/project.pbxproj"
