package ch.sbb.soundscore.SoundScore.services;


import ch.sbb.soundscore.SoundScore.entities.Artist;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.repositories.UserNotificationsRepository;
import ch.sbb.soundscore.SoundScore.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserNotificationsRepository userNotificationsRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserNotificationsRepository userNotificationsRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userNotificationsRepository = userNotificationsRepository;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().stream().filter(user -> user.getId() != 0).forEach(user -> {
            user.setNotifications(userNotificationsRepository.getUserNotificationsByUserId(user.getId()));
            users.add(user);
        });
        return users;
    }

    public User updateUser(Artist artist, UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
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
        User user = userRepository.findById(id).orElseThrow();
        user.setNotifications(userNotificationsRepository.getUserNotificationsByUserId(user.getId()));
        return user;
    }

    public User getUserByArtistId(int id) {
        return userRepository.getUserByArtistId(id);
    }

//    public User deleteUser(User user) {
//        String name = "An deleted User" + user.getId();
//        userRepository.deletes(user, name);
//        return user;
//    }

    public User deleteUser(UserDetails userDetails) {
        System.out.println("UserDetails: " + userDetails.getUsername());
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        userRepository.createUser0IfNotExists();
        User user0 = userRepository.findById(0).orElseThrow();
        userRepository.UpdateUsersPosts(user, user0);
        userRepository.UpdateUsersLikes(user, user0);
        userRepository.UpdateUsersComments(user, user0);
        userRepository.deleteUser(user);
        return user;
    }
}
