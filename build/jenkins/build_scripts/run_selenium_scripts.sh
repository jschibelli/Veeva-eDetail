#Load Enviormental Variables
source ./build/jenkins/selenium_scripts/selenium_enviornment.sh
source ./build/jenkins/shell_dependencies/jenkins_enviornment.sh

echo "Running Tests"

#Make dir for screenshots
mkdir $SOURCE_FILES$SOURCE_FILES_SCREENSHOT

#Loop thru all files in test directory
for f in $(ls ./build/jenkins/selenium_scripts)
do
	#only execute files ending in .py
	if [ ${f: -3} == ".py" ]
	then
		for ((i = 0; i < ${#DESIRED_CAPABILITIES[@]}; i++))
		do
			if [ ${f:0:12} == "screenshoter" ]
	    	then
		    	echo "Running test for $f with capabilities ${DESIRED_CAPABILITIES[$i]}"
		    	FULL_CONTENT_URL=$CONTENT_URL$SOURCE_FILES$SOURCE_FILES_CONTENT$CONTENT_INDEX
	    		python build/jenkins/selenium_scripts/$f "${DESIRED_CAPABILITIES[$i]}" $FULL_CONTENT_URL $BROWSERSTACK_HUB_URL $SOURCE_FILES$SOURCE_FILES_SCREENSHOT

	    	else
		    	echo "Running test for $f with capabilities ${DESIRED_CAPABILITIES[$i]}"
		    	FULL_CONTENT_URL=$CONTENT_URL$SOURCE_FILES$SOURCE_FILES_CONTENT$CONTENT_INDEX
	    		python build/jenkins/selenium_scripts/$f "${DESIRED_CAPABILITIES[$i]}" $FULL_CONTENT_URL $BROWSERSTACK_HUB_URL
	    	fi
		done
	fi
done