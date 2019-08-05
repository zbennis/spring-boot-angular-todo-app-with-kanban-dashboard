#!/usr/bin/env bash

set -e

commandNumber=100
FRONTEND=false
BACKEND=false

displayMenu() {
  echo 'Welcome to the task app docker-compose helper, please choose between the following functionalities:'
  echo '1 - Run docker-compose up'
  echo '2 - Run docker-compose down'
  echo '3 - Remove all stopped container and dangling images etc...'
  echo '4 - Remove all stopped container and dangling/unused images etc...'
  echo '5 - Display docker images'
  echo '6 - Display running containers'
  echo '0 - do nothing... :('
  echo 'Please choose a command between(1 and 6):'
  read commandNumber
}

withBuild(){
  echo 'Do we need a new backend build(y/n)?'
  read BACKEND  
  echo 'Do we need a new frontend build(y/n)?'
  read FRONTEND
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
        ./gradlew build
        cd ..
    fi
    if [ "$FRONTEND" = "y" ]; then
        cd ./todo-angular-frontend/
        echo 'removing old frontend build'
        rm -rf ./dist
        echo 'Running new frontend build'
        yarn build --prod
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

runDockerComposeDown() {
    echo 'Running docker-compose down'
    docker-compose down
}

happyMan() {
    echo '        *******         '
    echo '        | . . |         '
    echo '        |  ^  |         '
    echo '        | __/ |         '
    echo '!!! --- \_____/ --- !!!'
}

sadMan(){
    echo '        *******         '
    echo '        | . . |         '
    echo '        |  ^  |         '
    echo '        |  \  |         '
    echo '!!! --- \_____/ --- !!!'
}

confusedMan(){
    echo '        *******         '
    echo '     \''| . . |         '
    echo '        |  ^  |         '
    echo '        |  ~  |         '
    echo '!!! --- \_____/ --- !!!'
}

pruneDockerSystem() {
    echo 'Pruning docker system...'
    echo 'Mr.Docker is not happy'
    sadMan
    echo 'Are you sure Mr.Developer?'
    docker system prune
}

pruneDockerSystemWithUnusedImages() {
    echo 'Pruning docker system including unused images...'
    echo 'Mr.Docker is not happy'
    sadMan
    echo 'Are you sure Mr.Developer?'
    docker system prune -a
}

displayExistingImages() {
  echo 'Displaying existing images:'
  docker images -q
}

displayRunningContainers() {
 echo 'Displaying running containers:'
 docker container ps
}


checkWhichCommandToRun() {

    case ${commandNumber} in
       1)
          runCustomizedDockerComposeUp
          happyMan
          ;;
       2)
          runDockerComposeDown
          happyMan
          ;;
       3)
          pruneDockerSystem
          ;;
       4)
          pruneDockerSystemWithUnusedImages
          ;;
       5)
          displayExistingImages
          ;;
       6)
          displayRunningContainers
          ;;
       0)
          echo 'Doing nothing hae....'
          sadMan
          exit
          ;;
       *)
          echo 'Wrong command you should give a number between 0 and 5'
          exit
          ;;
    esac
}

checkRoot
while [ ! $commandNumber -eq 0 ]
do
    displayMenu
    checkWhichCommandToRun
done


