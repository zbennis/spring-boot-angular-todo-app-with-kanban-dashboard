package de.webapp.springboot.todos.todo.serviceRepo;

import de.webapp.springboot.todos.todo.domain.TodoEntry;
import de.webapp.springboot.todos.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<TodoEntry,Long> {

    public List<TodoEntry> findTodoEntriesByUser(User user);

}
