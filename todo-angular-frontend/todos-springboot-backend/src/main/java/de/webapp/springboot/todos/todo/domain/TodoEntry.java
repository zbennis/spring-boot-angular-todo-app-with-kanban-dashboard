package de.webapp.springboot.todos.todo.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import de.webapp.springboot.todos.user.domain.User;
import lombok.*;
import lombok.experimental.Wither;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name = "TODO_ENTRY")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString(exclude = "user")
@Builder
@Wither
@Entity
public class TodoEntry {

    @Id
    @GeneratedValue
    @Column(name = "ID")
    private long id;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @Column(name = "UPDATED_AT")
    private LocalDateTime updatedAt;

    @Column(name = "DUE_DATE")
    private LocalDateTime dueDate;

    @Column(name = "STATE")
    @Enumerated
    private TodoEntryState state;

    @ManyToOne
    @JoinColumn(name = "user")
    private User user;

}
