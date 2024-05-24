package ch.sbb.soundscore.SoundScore.controllers;

import ch.sbb.soundscore.SoundScore.entities.Post;
import ch.sbb.soundscore.SoundScore.services.LeaderboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    @GetMapping("/song")
    public List<Post> getSongRanking() {
        return leaderboardService.getSongRanking();
    }

    @GetMapping("/genre")
    public List<Post> getGenreRanking() {
        return leaderboardService.getGenreRanking();
    }

    @GetMapping("/artist")
    public List<Post> getArtistRanking() {
        return leaderboardService.getArtistRanking();
    }

    @GetMapping("/all")
    public List<Post> getPostRanking() {
        return leaderboardService.getPostRanking();
    }
}
