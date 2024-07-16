package ch.sbb.soundscore.SoundScore.controllers;

import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.entities.UserNotifications;
import ch.sbb.soundscore.SoundScore.repositories.UserNotificationsRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/api/notifications")
@RestController
public class UserNotificationController {

    private final UserNotificationsRepository userNotificationsRepository;

    public UserNotificationController(UserNotificationsRepository userNotificationsRepository) {
        this.userNotificationsRepository = userNotificationsRepository;
    }

    @PutMapping("/markAsRead/{id}")
    public UserNotifications markAsRead(@PathVariable Long id){
        UserNotifications userNotifications = userNotificationsRepository.findById(id).orElseThrow();
        userNotifications.setRead(true);
        return userNotificationsRepository.save(userNotifications);
    }


    @PutMapping("/markAllAsRead")
    public List<UserNotifications> markAllAsRead(@RequestBody User user){
        userNotificationsRepository.findAll().stream().filter(userNotifications -> user.getId().equals( userNotifications.getUser().getId())).forEach(
                userNotifications -> {
                    userNotifications.setRead(true);
                    userNotificationsRepository.save(userNotifications);
                }
        );
        return userNotificationsRepository.findAll().stream().filter(userNotifications -> user.getId().equals( userNotifications.getUser().getId())).collect(Collectors.toList());
    }
}
