package de.webapp.springboot.todos.user.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import de.webapp.springboot.todos.todo.domain.TodoEntry;
import lombok.*;
import lombok.experimental.Wither;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Table(name = "User")
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
