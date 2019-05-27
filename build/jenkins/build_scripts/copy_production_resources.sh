#!/bin/bash

#Load Enviormental Variables
source build/jenkins/shell_dependencies/jenkins_enviornment.sh

#Remove old files in staging directory
rm -r $SOURCE_FILES*

#Make any required directories and copy final files over
mkdir $SOURCE_FILES$SOURCE_FILES_CONTENT
cp -r $1 $SOURCE_FILES$SOURCE_FILES_CONTENT