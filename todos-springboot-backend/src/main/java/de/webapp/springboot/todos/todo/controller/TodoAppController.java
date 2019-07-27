package de.webapp.springboot.todos.todo.controller;


import de.webapp.springboot.todos.todo.domain.TodoEntry;
import de.webapp.springboot.todos.todo.domain.TodoEntryState;
import de.webapp.springboot.todos.todo.exception.RequestIncompleteOrWrongException;
import de.webapp.springboot.todos.todo.serviceRepo.TodoService;
import de.webapp.springboot.todos.user.domain.User;
import de.webapp.springboot.todos.user.serviceRepo.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

@RestController
@RequestMapping("/todos")
@RequiredArgsConstructor
@Slf4j
public class TodoAppController {

    private final UserService userService;
    private final TodoService todoService;

    @GetMapping("/{userIdentifier}")
    public List<TodoEntry> getTasksByUserIdentifier(@PathVariable("userIdentifier") String userIdentifier){
        //first try to get the user by the pseudo
        User user = userService.findUserByPseudoOrEmail(userIdentifier);
       return todoService.getAllUserTodoEntries(user);
    }

    @DeleteMapping("/{userIdentifier}/{todoId}")
    public void deleteTodoEntry(@PathVariable("userIdentifier")String userIdentifier,@PathVariable("todoId") long todoId){
        this.todoService.deleteTodoEntry(todoId);
    }

    @GetMapping("/edit/{todoId}")
    public TodoEntry findTodoEntryById(@PathVariable("todoId")long todoId){
        return this.todoService.findTodoEntry(todoId);
    }

    @PutMapping("/{userIdentifier}/edit/{method}")
    public TodoEntry createOrUpdateTodoEntry(@PathVariable("userIdentifier")String userIdentifier,@PathVariable("method")int method,@RequestBody TodoEntry todoEntry){
        if(method == 1){
            User creator = userService.findUserByPseudoOrEmail(userIdentifier);
            todoEntry.setUser(creator);
            return this.todoService.addNewEntry(todoEntry);
        } else if(method == 0){
            log.info("Editing todo -> "+todoEntry.toString());
            return this.todoService.updateEntry(todoEntry);
        }
        throw new RequestIncompleteOrWrongException();
    }

    @GetMapping("/types")
    public List<TodoEntryState> getTodoEntryStatesAsStringList(){
        return Stream.of(TodoEntryState.values()).collect(Collectors.toList());
    }

    //----------------------------- CREATE Fake Test Data to render something at the beginning
    @PostConstruct
    public void createTestData(){

        List<String> todoDescriptions = new ArrayList<>();
        todoDescriptions.add("Learn Spring boot");
        todoDescriptions.add("Learn Microservices");
        todoDescriptions.add("Learn Kafka");
        todoDescriptions.add("Learn HBase");
        todoDescriptions.add("Learn Docker");
        todoDescriptions.add("Learn Angular");
        todoDescriptions.add("Fix build");
        todoDescriptions.add("Implement Backend");
        todoDescriptions.add("Integrate ci");
        todoDescriptions.add("Implement frontend");
        todoDescriptions.add("Learn Kubernetes");
        todoDescriptions.add("Learn something! don't be lazy");
        todoDescriptions.add("Order Pizza");
        todoDescriptions.add("Order Soda");


        // TODO Implement security
        //Passwords are here in plain text only for test purposes, new registred users's passwords are going to  be encrypted
        List<User> users = new ArrayList<>();
        users.add(userService.addNewUser(User.builder().firstName("test").lastName("test").email("test").password("test").pseudo("test").build()));
        users.add(userService.addNewUser(User.builder().firstName("Simon").lastName("Onmis").email("simon.onmis@email.com").password("sionm").pseudo("Simon.").build()));
        users.add(userService.addNewUser(User.builder().firstName("John").lastName("Doe").email("john.doe@email.com").password("jodoe").pseudo("John.Doe").build()));
        users.add(userService.addNewUser(User.builder().firstName("Max").lastName("Mustermann").email("max.mustermann@email.com").password("mamus").pseudo("Max.Mustermann").build()));
        users.add(userService.addNewUser(User.builder().firstName("Lisa").lastName("Mueller").email("lisa.mueller@email.com").password("limue").pseudo("Lisa.Mueller").build()));
        users.add(userService.addNewUser(User.builder().firstName("Kevin").lastName("Mevin").email("kevin.alteschule@email.com").password("kealt").pseudo("kevin.mevin").build()));
        users.add(userService.addNewUser(User.builder().firstName("Anna").lastName("Anna").email("anna.anna@email.com").password("macap").pseudo("Marvin.Captain").build()));

        users.forEach(user -> {
            double randomEntriesCount = Math.floor(Math.random() * 30 ) + 10;
            double minus = Math.floor(Math.random() * 5 ) + 1;
            double plus = Math.floor(Math.random() * 10 ) + 6;

            IntStream.range(0,(int)randomEntriesCount-1).forEach( i -> {
                Collections.shuffle(todoDescriptions);
                List<TodoEntryState> todoStatuses = Stream.of(TodoEntryState.values()).collect(Collectors.toList());
                Collections.shuffle(todoStatuses);
                TodoEntry entry = todoService.addNewEntry(TodoEntry.builder().description(todoDescriptions.get(0)).createdAt(LocalDateTime.now().minusDays((int)minus))//
                        .dueDate(LocalDateTime.now().plusDays((int)plus)).user(user).updatedAt(null).state(todoStatuses.get(0))
                        .important(new Random().nextBoolean()).build());
            });
        });
    }

}
