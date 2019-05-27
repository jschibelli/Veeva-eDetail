BASE_PATH="${QA_DIR}/${UPLOAD_DIR}/"
ssh -i ${STAGING_SHELL_LOCATION} site-upload@172.31.8.115 mkdir -p ${BASE_PATH}
rsync -av -e "ssh -i ${STAGING_SHELL_LOCATION}" ${SOURCE_FILES} site-upload@172.31.8.115:${QA_DIR}/${UPLOAD_DIR}/${BUILD_ID}/

curl -X POST http://nexus.mtlg-ds.com/rest/project/${PROJECT_ID}/register_build_with_commit_number_id/${COMMIT}/${BUILD_ID}/${BUILD_NUMBER}/
