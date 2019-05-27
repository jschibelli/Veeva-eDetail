import requests
import sys

print 'Number of arguments:', len(sys.argv), 'arguments.'
print 'Argument List:', str(sys.argv)

commit_id = sys.argv[1]
build_id = sys.argv[2]
project_number = sys.argv[3]
nexus_url = str(sys.argv[4]).replace("\'","")

full_url = u'%s/rest/%s/register_build/%i/%s/%s/'%(nexus_url, project_number, 0, build_id, commit_id)

print 'Full Query URL:'
print full_url

request = requests.get(full_url)
