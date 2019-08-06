package de.webapp.springboot.todos.project.general.serviceRepo;

import de.webapp.springboot.todos.project.general.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project,Long> {
}
