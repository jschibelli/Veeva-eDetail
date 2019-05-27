#!/bin/bash

timestamp() {
	date +"%Y-%m-%d_%H-%M-%S"
}

TIMESTAMP=$(timestamp)

git add .
git commit -m 'Prepare Build '$TIMESTAMP

git tag -a "dev_$TIMESTAMP" -m 'Building'
git push --follow-tags

