# please clone this url https://fe-ols@azp-ms-web-dev-ols.scm.azurewebsites.net:443/AZP-MS-WEB-DEV-OLS.git
# to a local directory within frontend. You need to set up a deployment credential for the AZP-MS-WEB-DEV-OLS
#/bin/bash
npm run build:prod

# get the current branch name and create a directory destination using it
dest_dir="$(git rev-parse --abbrev-ref HEAD)"

# make the destination directory
mkdir -p $dest_dir

# copy the web build
cp -R dist/ $dest_dir
