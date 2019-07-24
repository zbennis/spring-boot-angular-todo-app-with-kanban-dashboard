package de.webapp.springboot.todos.todo.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT)
public class TodoEntryNotFoundException extends RuntimeException{
}
