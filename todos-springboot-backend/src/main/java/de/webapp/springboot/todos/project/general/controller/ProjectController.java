package de.webapp.springboot.todos.project.general.controller;

import de.webapp.springboot.todos.project.general.serviceRepo.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

}
