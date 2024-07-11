package ch.sbb.soundscore.SoundScore.services;


import ch.sbb.soundscore.SoundScore.entities.Artist;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().stream().filter(user -> user.getId() != 0).forEach(users::add);

        return users;
    }

    public User updateUser(Artist artist, User user) {
        user.setArtist(artist);
        return userRepository.save(user);
    }

    public User updateUsers(User currentuser) {
        currentuser.setPassword(passwordEncoder.encode(currentuser.getPassword()));
        return userRepository.save(currentuser);
    }

    public User getUserById(int id) {
        if (id == 0) {
            throw new IllegalArgumentException("Id must not be 0");
        }
        return userRepository.findById(id).orElseThrow();
    }

    public User getUserByArtistId(int id) {
        return userRepository.getUserByArtistId(id);
    }

    //    public User deleteUser(User user) {
//        String name = "An deleted User" + user.getId();
//        userRepository.deletes(user, name);
//        return user;
//    }
    public User deleteUser(User user) {
        User user0 = userRepository.findById(0).orElseThrow();
        userRepository.UpdateUsersPosts(user, user0);
        userRepository.UpdateUsersLikes(user, user0);
        userRepository.UpdateUsersComments(user, user0);
        userRepository.deleteUser(user);
        return user;
    }
}
