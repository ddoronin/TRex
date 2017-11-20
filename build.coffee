require 'shelljs/global'
path = require 'path'

echo 'start ui build'
((cwd) ->
  exec 'npm install', cwd: cwd
  exec 'npm start', cwd: cwd, () ->
    echo '--> server is running...'
)(path.resolve './')


echo 'start web server'
((cwd) ->
  exec 'npm install', cwd: cwd
  exec 'npm start', cwd: cwd, () ->
    echo '--> server is running...'
)(path.resolve './web')
