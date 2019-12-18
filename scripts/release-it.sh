#!/bin/bash

npm i
npm run lint
npm run test
npm run build:clean

if [ "$1" == "" ]; then
  ./node_modules/.bin/release-it
elif [ "$1" == "--beta" ]; then
  ./node_modules/.bin/release-it --preRelease=beta
else
  echo "$1 is not recognized"
  exit 1
fi
