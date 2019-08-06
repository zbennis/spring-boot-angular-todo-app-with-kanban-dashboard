package de.webapp.springboot.todos.project.general.domain;


import de.webapp.springboot.todos.project.phase.domain.ProjectPhase;
import de.webapp.springboot.todos.todo.domain.TodoEntry;
import de.webapp.springboot.todos.user.domain.User;
import lombok.*;
import lombok.experimental.Wither;

import javax.persistence.*;
import java.util.List;

@Table(name = "PROJECT")
@Data
@Wither
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Project {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;

    @OneToMany(mappedBy = "project")
    private List<ProjectPhase> projectPhases;

    @OneToMany(mappedBy = "project")
    private List<TodoEntry> tasks;

    @OneToMany(mappedBy = "parentProject", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Project> subProjects;

    @ManyToOne
    @JoinColumn(name = "parent_project_id")
    private Project parentProject;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

}
