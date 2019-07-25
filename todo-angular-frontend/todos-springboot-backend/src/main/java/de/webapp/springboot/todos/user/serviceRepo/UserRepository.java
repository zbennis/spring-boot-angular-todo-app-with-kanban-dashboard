package de.webapp.springboot.todos.user.serviceRepo;

import de.webapp.springboot.todos.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    public Optional<User> findUserByPseudoOrEmail(String pseudo,String email);
    public Optional<User> findUserByPseudo(String pseudo);
    public Optional<User> findUserByEmail(String email);

}
