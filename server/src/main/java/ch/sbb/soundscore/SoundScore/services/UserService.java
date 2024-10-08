package ch.sbb.soundscore.SoundScore.services;


import ch.sbb.soundscore.SoundScore.entities.Artist;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.entities.UserFollower;
import ch.sbb.soundscore.SoundScore.repositories.UserFollowerRepository;
import ch.sbb.soundscore.SoundScore.repositories.UserNotificationsRepository;
import ch.sbb.soundscore.SoundScore.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserNotificationsRepository userNotificationsRepository;
    private final UserFollowerRepository userFollowerRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserNotificationsRepository userNotificationsRepository,
                       UserFollowerRepository userFollowerRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userNotificationsRepository = userNotificationsRepository;
        this.userFollowerRepository = userFollowerRepository;
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
        User user = userRepository.findById(id).orElseThrow();
        user.setNotifications(userNotificationsRepository.getUserNotificationsByUserId(user.getId()));
        user.setFollowers(userRepository.getFollowers(user.getId()));
        return user;
    }

    public User getUserByArtistId(int id) {
        return userRepository.getUserByArtistId(id);
    }

    public User deleteUser(UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();
        userRepository.createUser0IfNotExists();
        User user0 = userRepository.findById(0).orElseThrow();
        userRepository.UpdateUsersPosts(user, user0);
        userRepository.UpdateUsersLikes(user, user0);
        userRepository.UpdateUsersComments(user, user0);
        userRepository.UpdateUsersFollowersFollower(user, user0);
        userRepository.UpdateUsersFollowersUser(user, user0);
        userRepository.updateUsersNotificationsSender(user, user0);
        userRepository.updateUsersNotificationsReceiver(user, user0);
        userRepository.deleteUser(user);
        return user;
    }

    public User updatePremium(User user) {
        user.setPremium(true);
        return userRepository.save(user);
    }

    public List<User> getFollowers(Long id) {
        return userRepository.getFollowers(id);
    }
}
