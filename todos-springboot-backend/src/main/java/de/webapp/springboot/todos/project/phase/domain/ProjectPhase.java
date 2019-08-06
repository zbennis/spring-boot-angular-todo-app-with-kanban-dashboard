package de.webapp.springboot.todos.project.phase.domain;

import de.webapp.springboot.todos.project.general.domain.Project;
import lombok.*;
import lombok.experimental.Wither;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name = "project_phase")
@Data
@Wither
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
public class ProjectPhase {

    @Id
    @GeneratedValue
    private Long id;
    @GeneratedValue
    private String phaseNumber;
    private String phaseName;
    private String phaseGoal;
    private LocalDateTime start;
    private LocalDateTime end;

    @ManyToOne
    @JoinColumn(name = "project")
    private Project project;

}
