source ./build/jenkins/shell_dependencies/jenkins_enviornment.sh

timestamp() {
	date +"%Y-%m-%d_%H-%M-%S"
}

git tag -a "dev_$(timestamp)" -m 'Building'
git push
git push --tags

BRANCH_NAME="$(git rev-parse --abbrev-ref HEAD)"
COMMIT_ID="$(git rev-parse HEAD)"

curl -i -H "Accept: application/json" -X POST -d "firstName=james" "http://nexus.mtlg-ds.com/rest/project/$PROJECT_ID/$COMMIT_ID/$BRANCH_NAME/build/"
