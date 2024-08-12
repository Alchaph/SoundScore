package ch.sbb.soundscore.SoundScore.controllers;

import ch.sbb.soundscore.SoundScore.entities.UserTag;
import ch.sbb.soundscore.SoundScore.services.UserTagService;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/usertags")
@RestController
public class UserTagController {

    private final UserTagService userTagService;

    public UserTagController(UserTagService userTagService) {
        this.userTagService = userTagService;
    }

    @PostMapping("")
    public UserTag create(@RequestBody UserTag userTag) {
        return userTagService.create(userTag);
    }

    @DeleteMapping("")
    public void delete(@RequestBody Integer id) {
        userTagService.delete(id);
    }
}
