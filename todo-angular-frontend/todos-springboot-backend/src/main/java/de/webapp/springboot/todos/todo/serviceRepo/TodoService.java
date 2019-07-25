package de.webapp.springboot.todos.todo.serviceRepo;

import de.webapp.springboot.todos.todo.domain.TodoEntry;
import de.webapp.springboot.todos.todo.exception.TodoEntryAlreadyExistsException;
import de.webapp.springboot.todos.todo.exception.TodoEntryNotFoundException;
import de.webapp.springboot.todos.user.domain.User;
import de.webapp.springboot.todos.user.serviceRepo.UserRepository;
import de.webapp.springboot.todos.user.serviceRepo.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TodoService {

    private final TodoRepository todoRepository;
    private final UserService userService;


    public TodoEntry addNewEntry(TodoEntry entry){
        if(entry.getId() > 0){ // entry has already an id otherwise we assume it is a new one
            if(todoRepository.findById(entry.getId()).isPresent()){
                throw new TodoEntryAlreadyExistsException();
            }
        }
        return todoRepository.save(entry);
    }

    public TodoEntry updateEntry(TodoEntry entry){
        TodoEntry internEntry = findTodoEntry(entry.getId());
        internEntry.withDescription(entry.getDescription()).withDueDate(entry.getDueDate()).withUpdatedAt(LocalDateTime.now());
        return todoRepository.save(entry);
    }

    public void deleteTodoEntry(long id){
        this.todoRepository.deleteById(id);
        this.todoRepository.flush();
        log.info("TodoEntry ->"+id+" was deleted successfully...");
    }

    public List<TodoEntry> getAllUserTodoEntries(User user){
        return todoRepository.findTodoEntriesByUser(user);
    }

    public TodoEntry findTodoEntry(long id){
        return todoRepository.findById(id).orElseThrow(TodoEntryNotFoundException::new);
    }

    public boolean exists(long id){
        return this.todoRepository.findById(id).isPresent();
    }

    public List<TodoEntry> getAllTodoEntries(){
        return todoRepository.findAll();
    }

}
