package ch.sbb.soundscore.SoundScore.controllers;

import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.entities.UserFollower;
import ch.sbb.soundscore.SoundScore.repositories.UserFollowerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/followers")
@RestController
public class UserFollowerController {

    private final UserFollowerRepository userFollowerRepository;

    public UserFollowerController(UserFollowerRepository userFollowerRepository) {
        this.userFollowerRepository = userFollowerRepository;
    }

    @PostMapping("/follow")
    public ResponseEntity<UserFollower> follow(@RequestBody User user) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User follower = (User) authentication.getPrincipal();
        return ResponseEntity.ok(userFollowerRepository.follow(user.getId(), follower.getId()));
    }

    @DeleteMapping("/de-follow")
    public ResponseEntity<UserFollower> deFollow(@RequestBody User user) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User follower = (User) authentication.getPrincipal();
        return ResponseEntity.ok(userFollowerRepository.deFollow(user.getId(), follower.getId()));
    }
}
