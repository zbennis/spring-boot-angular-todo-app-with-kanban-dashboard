package de.webapp.springboot.todos.project.phase.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT,reason = "Phase start sould not be bigger than end")
public class PhaseStartBiggerThanEndException extends RuntimeException {

    public PhaseStartBiggerThanEndException(){
        super("Phase start sould not be bigger than end");
    }

}
