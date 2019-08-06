package de.webapp.springboot.todos.project.phase.serviceRepo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectPhaseService {

    private final ProjectPhaseRepository projectPhaseRepository;

}
