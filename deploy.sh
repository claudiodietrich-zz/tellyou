#!/usr/bin/env sh

# abort on errors
set -e

# change to branch mastes
git checkout master

# create a heroku branch based on master
git checkout -b heroku

# copy server files to root folder
cd server/
cp -R * ../

#back to root folder
cd ../

# build vue and mv dist to root folder
cd client/
npm i
npm run build
mv dist/ ../src/public

#back to root folder
cd ../

# remove server and client folders
rm -rf server/ client/

# does the deploy
git add --all
git commit -m 'deploy'
git push --force heroku heroku:master

# back to branch develop
git checkout develop

# remove heroku local branch
git branch -D heroku
rm -rf node_modues/