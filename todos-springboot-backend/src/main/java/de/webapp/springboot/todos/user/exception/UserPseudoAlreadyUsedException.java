package de.webapp.springboot.todos.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "User pseudo already used")
public class UserPseudoAlreadyUsedException extends RuntimeException {
}
