package ch.sbb.soundscore.SoundScore.controllers;


import ch.sbb.soundscore.SoundScore.entities.Artist;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.repositories.UserNotificationsRepository;
import ch.sbb.soundscore.SoundScore.services.ArtistService;
import ch.sbb.soundscore.SoundScore.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/users")
@RestController
public class UserController {
    private final UserService userService;
    private final ArtistService artistService;
    private final UserNotificationsRepository userNotificationsRepository;

    public UserController(UserService userService, ArtistService artistService, UserNotificationsRepository userNotificationsRepository) {
        this.userService = userService;
        this.artistService = artistService;
        this.userNotificationsRepository = userNotificationsRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<UserDetails> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try {
            User currentUser = (User) authentication.getPrincipal();
            currentUser.setNotifications(userNotificationsRepository.getUserNotificationsByUserId(currentUser.getId()));
            return ResponseEntity.ok(currentUser);
        } catch (ClassCastException e) {
            UserDetails currentUser = (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(currentUser);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> allUsers() {
        List<User> users = userService.allUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping("/getByArtistId/{id}")
    public ResponseEntity<User> getUserByArtistId(@PathVariable int id) {
        return ResponseEntity.ok(userService.getUserByArtistId(id));
    }

    @PutMapping("/register-artist")
    public ResponseEntity<User> registerArtist(@RequestBody Artist artist) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        artistService.createArtist(artist);
        try {
            User currentUser = (User) authentication.getPrincipal();
            return ResponseEntity.ok(userService.updateUser(artist, currentUser));
        } catch (ClassCastException e) {
            UserDetails currentUser = (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(userService.updateUser(artist, currentUser));
        }
    }

    @PutMapping("")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.updateUsers(user));
    }

    @DeleteMapping("")
    public ResponseEntity<User> deleteUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try {
            User currentUser = (User) authentication.getPrincipal();
            return ResponseEntity.ok(userService.deleteUser(currentUser));
        } catch (ClassCastException e) {
            UserDetails currentUser = (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok(userService.deleteUser(currentUser));
        }
    }

}
