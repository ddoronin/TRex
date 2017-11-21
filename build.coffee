require 'shelljs/global'
path = require 'path'

echo 'start ui build'
((cwd) ->
  exec 'yarn install', cwd: cwd
  exec 'yarn start', cwd: cwd, () ->
    echo '--> server is running...'
)(path.resolve './')


echo 'start web server'
((cwd) ->
  exec 'yarn install', cwd: cwd
  exec 'yarn start', cwd: cwd, () ->
    echo '--> server is running...'
)(path.resolve './web')
