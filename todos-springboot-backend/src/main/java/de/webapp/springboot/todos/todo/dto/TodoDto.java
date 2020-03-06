package de.webapp.springboot.todos.todo.dto;

import de.webapp.springboot.todos.project.general.domain.Project;
import de.webapp.springboot.todos.todo.domain.TodoEntryState;
import de.webapp.springboot.todos.user.domain.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class TodoDto {

    private long id;

    private String description;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private LocalDateTime dueDate;

    private TodoEntryState state;

    private boolean important;

    private User user;

    private Project project;
}
