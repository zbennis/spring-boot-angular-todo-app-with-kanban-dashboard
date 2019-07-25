package de.webapp.springboot.todos.user.serviceRepo;

import de.webapp.springboot.todos.user.domain.Role;
import de.webapp.springboot.todos.user.domain.User;
import de.webapp.springboot.todos.user.exception.UserAlreadyExistsException;
import de.webapp.springboot.todos.user.exception.UserEmailAlreadyUserException;
import de.webapp.springboot.todos.user.exception.UserNotFoundException;
import de.webapp.springboot.todos.user.exception.UserPseudoAlreadyUsedException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    //private final PasswordEncoder passwordEncoder;

    public User addNewUser(User user) {
        if(userRepository.findUserByEmail(user.getEmail()).isPresent()){
            throw new UserEmailAlreadyUserException();
        } else if(userRepository.findUserByPseudo(user.getPseudo()).isPresent()){
            throw new UserPseudoAlreadyUsedException();
        }
        //encode password before saving the user
        //user.setPassword(passwordEncoder.encode(user.getPassword()));
        //user.setRole(Role.ROLE_USER);
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        findUserById(user.getId());
        return userRepository.save(user);
    }

    public User deleteUser(User user) {
        findUserById(user.getId());
        return userRepository.save(user);
    }

    public User findUserById(long id) {
        return userRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    public User findUserByPseudoOrEmail(String userIdentifier) {
        Optional<User> user = userRepository.findUserByPseudoOrEmail(userIdentifier, userIdentifier);
        if (!user.isPresent()) {
            throw new UserNotFoundException();
        }
        return user.get();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

}
