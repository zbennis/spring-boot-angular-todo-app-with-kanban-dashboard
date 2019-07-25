package de.webapp.springboot.todos.welcome;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WelcomeToTheTodoAppApi {

    @GetMapping
    public String hello(){
        return "Welcome to the todo app! Rest API! , let's rock it...";
    }

}
