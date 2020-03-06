package de.webapp.springboot.todos.todo.mapper;

import de.webapp.springboot.todos.todo.domain.TodoEntry;
import de.webapp.springboot.todos.todo.dto.TodoDto;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TodoMapper {
    @InheritInverseConfiguration
    TodoDto pojoToDto(TodoEntry todoEntry);
    TodoEntry dtoToPojo(TodoDto dto);
}
