#!/usr/bin/env bash

set -e

commandNumber=0
FRONTEND=false
BACKEND=false

displayMenu() {
  echo 'Welcome to the task app docker-compose helper, please choose between the following functionalities:'
  echo '1 - Run docker-compose up'
  echo '2 - feature 2 -> coming soon...'
  echo '3 - feature 3 -> coming soon...'
  echo '0 - do nothing... :('
  echo 'Please choose a command between(0 and 3):'
  read commandNumber
}

withBuild(){
  echo 'Do we need a new frontend build(y/n)?'
  read FRONTEND
  echo 'Do we need a new backend build(y/n)?'
  read BACKEND
}

checkRoot(){
    if [[ $EUID -ne 0 ]]; then
        echo $0' script should be run as root'
        echo 'exit...'
        exit
    fi
}


runCustomizedDockerComposeUp(){
    withBuild
    echo 'Running customized docker compose up'
    if [ "$BACKEND" = "y" ]; then
        cd ./todos-springboot-backend/
        echo 'removing old backend build...'
        rm -rf ./build
        echo 'Running new backend build...'
        ./gradlew build &
        cd ..
    fi
    if [ "$FRONTEND" = "y" ]; then
        cd ./todo-angular-frontend/
        echo 'removing old frontend build'
        rm -rf ./dist
        echo 'Running new frontend build'
        yarn build --prod &
        cd ..
    fi
    echo 'Do you want to run docker in detached mode(y/n)?'
    read detached
    if [ "$detached" = "y" ]; then
    echo 'Running docker-compose up in detached mode....'
    docker-compose up -d
    else
    echo 'Running docker-compose up....'
    docker-compose up
    fi
}


checkWhichCommandToRun() {

    case ${commandNumber} in
       1)
          runCustomizedDockerComposeUp
          ;;
       0)
          echo 'Doing nothing hae....'
          exit
          ;;
       *)
          echo 'Wrong command you should give a number between 0 and 3'
          exit
          ;;
    esac
}

checkRoot
displayMenu
checkWhichCommandToRun

