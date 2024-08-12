package ch.sbb.soundscore.SoundScore.controllers;

import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.entities.UserFollower;
import ch.sbb.soundscore.SoundScore.entities.UserNotifications;
import ch.sbb.soundscore.SoundScore.repositories.UserFollowerRepository;
import ch.sbb.soundscore.SoundScore.repositories.UserNotificationsRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/followers")
@RestController
public class UserFollowerController {

    private final UserFollowerRepository userFollowerRepository;

    private final UserNotificationsRepository userNotificationsRepository;

    public UserFollowerController(UserFollowerRepository userFollowerRepository, UserNotificationsRepository userNotificationsRepository) {
        this.userFollowerRepository = userFollowerRepository;
        this.userNotificationsRepository = userNotificationsRepository;
    }

    @PostMapping("/follow")
    public ResponseEntity<UserFollower> follow(@RequestBody User user) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User follower = (User) authentication.getPrincipal();
        UserFollower userFollower = new UserFollower(user, follower);
        UserFollower savedUserFollower = userFollowerRepository.save(userFollower);
        userNotificationsRepository.save(new UserNotifications(user, follower, null, null, null, userFollower, null));
        return ResponseEntity.ok(savedUserFollower);
    }

    @DeleteMapping("/unfollow/{id}")
    public ResponseEntity<UserFollower> deFollow(@PathVariable Integer id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User follower = (User) authentication.getPrincipal();
        userNotificationsRepository.deleteAllByUserFollower(userFollowerRepository.getUserFollowerByFollower(follower));
        return ResponseEntity.ok(userFollowerRepository.deFollow(id, follower.getId()));
    }
}
