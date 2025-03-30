#!/bin/bash

echo "Step 1: Remove dist build folder if exists."
echo "Step 2: Create new build files through script"

DIST_DIR=./dist

if [ -d "$DIST_DIR" ]; then
  echo "Proceed to remove dist folder" 
  rm -r ./${DIST_DIR}
  echo "Removed dist folder"
fi

echo "proceed to create new build."

npm run build

echo "Build complete."

