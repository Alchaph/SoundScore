package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.entities.UserNotifications;
import ch.sbb.soundscore.SoundScore.entities.UserTag;
import ch.sbb.soundscore.SoundScore.repositories.UserNotificationsRepository;
import ch.sbb.soundscore.SoundScore.repositories.UserTagRepository;
import org.springframework.stereotype.Service;

@Service
public class UserTagService {

    private final UserTagRepository userTagRepository;
    private final UserNotificationsRepository userNotificationsRepository;

    public UserTagService(UserTagRepository userTagRepository, UserNotificationsRepository userNotificationsRepository) {
        this.userTagRepository = userTagRepository;
        this.userNotificationsRepository = userNotificationsRepository;
    }

    public UserTag create(UserTag userTag) {
        UserTag savedUserTag = userTagRepository.save(userTag);
        userNotificationsRepository.save(new UserNotifications(savedUserTag.getTaggedUser(), savedUserTag.getUser(), null, null, null, null, savedUserTag));
        return savedUserTag;
    }

    public void delete(Integer id) {
        userNotificationsRepository.deleteAllUserTagNotifications(id);
        userTagRepository.deleteById(Long.valueOf(id));
    }
}
