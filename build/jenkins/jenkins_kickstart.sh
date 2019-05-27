#!/bin/bash

touch build/jenkins/enviornment.sh

#python build/jenkins/python_dependencies/nexus_build_manager.py $GIT_COMMIT $BUILD_ID $PROJECT_ID $NEXUS_URL

#nohup java -jar selenium\ server/selenium-server-standalone-2.42.2.jar &

git checkout ${WORK_LOG_BRANCH}
git pull
source ./build/jenkins/shell_dependencies/jenkins_enviornment.sh

echo "Running Production Copy Script ${COMMIT}"
git checkout ${COMMIT} -- ${DEVELOPMENT_DIRECTORY}

./build/jenkins/build_scripts/copy_production_resources.sh ${DEVELOPMENT_DIRECTORY}.

#echo "Running Selenium Scripts"
#./build/jenkins/build_scripts/run_selenium_scripts.sh

if [ $DEV -eq 1 ]
then
    echo "Starting Development Build"
	./build/jenkins/build_scripts/push_to_dev.sh

elif [ $QA -eq 1 ]
then
    echo "Starting QA Build"
	./build/jenkins/build_scripts/push_to_qa.sh

elif [ $STAGING -eq 1 ]
then
    echo "Starting Staging Build"
	./build/jenkins/build_scripts/push_to_staging.sh

elif [ $CLIENT -eq 1 ]
then
    echo "Starting Client Build"
	./build/jenkins/build_scripts/push_to_clients.sh

elif [ $PRODUCTION -eq 1 ]
then
    echo "Starting Production Build"
	./build/jenkins/build_scripts/push_to_production.sh

fi

git fetch origin
git reset --hard origin/master