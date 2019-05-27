BASE_PATH="${CLIENT_DIR}/${UPLOAD_DIR}/"
ssh -i ${PRODUCTION_SHELL_LOCATION} sites@172.31.26.119 mkdir -p ${BASE_PATH}
rsync -a -e "ssh -i ${PRODUCTION_SHELL_LOCATION}" ${SOURCE_FILES} sites@172.31.26.119:${CLIENT_DIR}/${UPLOAD_DIR}/${BUILD_ID}/

curl -X POST http://nexus.mtlg-ds.com/rest/project/${PROJECT_ID}/register_build_with_commit_number_id/${COMMIT}/${BUILD_ID}/${BUILD_NUMBER}/
