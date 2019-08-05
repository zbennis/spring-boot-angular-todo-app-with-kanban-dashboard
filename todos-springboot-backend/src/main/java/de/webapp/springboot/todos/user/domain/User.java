package de.webapp.springboot.todos.user.domain;

import lombok.*;
import lombok.experimental.Wither;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Table(name = "TASK_CREATOR")
@Data
@Builder
@Wither
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString(exclude = "password")
@Entity
public class User {

    @Id
    @GeneratedValue
    @Column(name = "ID")
    private long id;

    //------------------ PSEUDO is firstName+lastName by default
    @Column(name = "FIRST_NAME")
    @NotNull
    private String firstName;

    @Column(name = "LAST_NAME")
    @NotNull
    private String lastName;

    @Column(name = "PSEUDO")
    @NotNull
    private String pseudo;
    //----------------------------------------------------------

//    @NotNull
//    @Enumerated(EnumType.ORDINAL)
//    private Role role;

    @Column(name = "EMAIl")
    private String email;

    @Column(name = "PASSWORD")
    @NotNull
    private String password;

}
