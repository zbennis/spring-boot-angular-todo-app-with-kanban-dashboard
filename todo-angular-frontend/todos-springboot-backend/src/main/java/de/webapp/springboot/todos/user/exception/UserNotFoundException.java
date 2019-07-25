package de.webapp.springboot.todos.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(){
        super("The user you trying to get does not exist");
    }
}
