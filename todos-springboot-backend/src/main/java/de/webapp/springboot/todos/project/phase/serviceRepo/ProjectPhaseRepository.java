package de.webapp.springboot.todos.project.phase.serviceRepo;

import de.webapp.springboot.todos.project.phase.domain.ProjectPhase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectPhaseRepository extends JpaRepository<ProjectPhase,Long> {
}
