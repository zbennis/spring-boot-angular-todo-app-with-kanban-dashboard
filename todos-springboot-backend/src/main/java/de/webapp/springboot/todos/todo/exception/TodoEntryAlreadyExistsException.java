package de.webapp.springboot.todos.todo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT)
public class TodoEntryAlreadyExistsException extends RuntimeException{
    
    private static final long serialVersionUID = 1L;

    public TodoEntryAlreadyExistsException() {
        super("A todo entry with the same id already exists");
    }
}
