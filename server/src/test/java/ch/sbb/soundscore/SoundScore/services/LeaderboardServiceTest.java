package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.entities.Post;
import ch.sbb.soundscore.SoundScore.repositories.PostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LeaderboardServiceTest {
    private PostRepository postRepository;
    private LeaderboardService leaderboardService;

    @BeforeEach
    void setUp() {
        postRepository = mock(PostRepository.class);
        leaderboardService = new LeaderboardService(postRepository);
    }

    @Test
    void getSongRanking() {
        Post post1 = new Post();
        Post post2 = new Post();
        when(postRepository.getLeaderBoardSongs()).thenReturn(Arrays.asList(post1, post2));

        List<Post> result = leaderboardService.getSongRanking();

        assertEquals(2, result.size());
        assertTrue(result.containsAll(Arrays.asList(post1, post2)));
    }

    @Test
    void getGenreRanking() {
        Post post1 = new Post();
        Post post2 = new Post();
        when(postRepository.getLeaderBoardGenres()).thenReturn(Arrays.asList(post1, post2));

        List<Post> result = leaderboardService.getGenreRanking();

        assertEquals(2, result.size());
        assertTrue(result.containsAll(Arrays.asList(post1, post2)));
    }

    @Test
    void getArtistRanking() {
        Post post1 = new Post();
        Post post2 = new Post();
        when(postRepository.getLeaderBoardArtists()).thenReturn(Arrays.asList(post1, post2));

        List<Post> result = leaderboardService.getArtistRanking();

        assertEquals(2, result.size());
        assertTrue(result.containsAll(Arrays.asList(post1, post2)));
    }

    @Test
    void getPostRanking() {
        Post post1 = new Post();
        Post post2 = new Post();
        when(postRepository.getPostRanking()).thenReturn(Arrays.asList(post1, post2));

        List<Post> result = leaderboardService.getPostRanking();

        assertEquals(2, result.size());
        assertTrue(result.containsAll(Arrays.asList(post1, post2)));
    }
}