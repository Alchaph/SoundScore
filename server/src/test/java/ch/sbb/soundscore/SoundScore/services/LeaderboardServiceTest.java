package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.entities.Artist;
import ch.sbb.soundscore.SoundScore.entities.Genre;
import ch.sbb.soundscore.SoundScore.entities.Post;
import ch.sbb.soundscore.SoundScore.entities.Song;
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
        Song song1 = new Song();
        Song song2 = new Song();
        when(postRepository.getLeaderBoardSongs()).thenReturn(Arrays.asList(song1, song2));

        List<Song> result = leaderboardService.getSongRanking();

        assertEquals(2, result.size());
        assertTrue(result.containsAll(Arrays.asList(song1, song2)));
    }

    @Test
    void getGenreRanking() {
        Genre genre1 = new Genre();
        Genre genre2 = new Genre();
        when(postRepository.getLeaderBoardGenres()).thenReturn(Arrays.asList(genre1, genre2));

        List<Genre> result = leaderboardService.getGenreRanking();

        assertEquals(2, result.size());
        assertTrue(result.containsAll(Arrays.asList(genre1, genre2)));
    }

    @Test
    void getArtistRanking() {
        Artist artist1 = new Artist();
        Artist artist2 = new Artist();
        when(postRepository.getLeaderBoardArtists()).thenReturn(Arrays.asList(artist1, artist2));

        List<Artist> result = leaderboardService.getArtistRanking();

        assertEquals(2, result.size());
        assertTrue(result.containsAll(Arrays.asList(artist1, artist2)));
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