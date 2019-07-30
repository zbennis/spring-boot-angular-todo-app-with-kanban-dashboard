# Task web App with a Kanban-Dashboard  [![Build Status](https://travis-ci.com/zbennis/spring-boot-angular-todo-app-with-kanban-dashboard.svg?token=zHqcVD8zUzTqHSqfzYUB&branch=master)](https://travis-ci.com/zbennis/spring-boot-angular-todo-app-with-kanban-dashboard)
A todo app made with spring boot(2.1.6), angular(8.1.1) as main technologies as well as other technologies...

### Demo as gif
![](/gifs/todo-app.gif)

# Frontend 

Used package manager is yarn:
To serve the frontend angular app navigate to the frontend directory and run the following commands:
1. yarn install
2. yarn start
3. Open this url (http://localhost:4200) in your favorite browser.  

# Backend

You can run the backend either with Intellij(Or your favorite IDE ;) ) App runner or
cd to backend directory and run one of the following commands -> ./gradlew run or ./gradlew bootRun.
Default (hardcoded) user is -> (pseudo:test , pw:test )for both backend and frontend.

### TODOS 
1. Allow users to signUp (maybe with activation mail)
2. Integrate a reasonable security, since we are using a basic hardcoded version for now
3. Add Unit and Integration tests


