package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.entities.Post;
import ch.sbb.soundscore.SoundScore.repositories.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaderboardService {

    private final PostRepository postRepository;

    public LeaderboardService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> getSongRanking() {
        return postRepository.getLeaderBoardSongs();
    }

    public List<Post> getGenreRanking() {
        return postRepository.getLeaderBoardGenres();
    }

    public List<Post> getArtistRanking() {
        return postRepository.getLeaderBoardArtists();
    }

    public List<Post> getPostRanking() {
        return postRepository.getPostRanking();
    }
}
