package de.webapp.springboot.todos.todo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class RequestIncompleteOrWrongException extends RuntimeException {
    
    private static final long serialVersionUID = 1L;

    public RequestIncompleteOrWrongException() {
        super("Request is wrong or incomplete -> error happened while adding/editing a new todoEntry");
    }
}
