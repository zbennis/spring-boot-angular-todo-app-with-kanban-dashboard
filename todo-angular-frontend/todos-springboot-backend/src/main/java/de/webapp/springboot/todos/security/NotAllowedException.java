package de.webapp.springboot.todos.security;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.FORBIDDEN)
public class NotAllowedException extends RuntimeException{

    public NotAllowedException(){
        super("User is not allowed to connect");
    }

}
