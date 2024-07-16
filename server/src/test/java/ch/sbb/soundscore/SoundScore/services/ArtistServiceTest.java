package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.entities.Artist;
import ch.sbb.soundscore.SoundScore.repositories.ArtistRepository;
import ch.sbb.soundscore.SoundScore.repositories.PostRepository;
import ch.sbb.soundscore.SoundScore.repositories.SongRepository;
import ch.sbb.soundscore.SoundScore.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

class ArtistServiceTest {
    private ArtistRepository artistRepository;
    private UserRepository userRepository;
    private PostRepository postRepository;
    private SongRepository songRepository;
    private ArtistService artistService;

    @BeforeEach
    void setUp() {
        artistRepository = mock(ArtistRepository.class);
        UserRepository userRepository = mock(UserRepository.class);
        PostRepository postRepository = mock(PostRepository.class);
        SongRepository songRepository = mock(SongRepository.class);
        artistService = new ArtistService(artistRepository, userRepository, postRepository, songRepository);
    }

    @Test
    void createArtist() {
        Artist artist = new Artist();
        when(artistRepository.save(artist)).thenReturn(artist);

        Artist result = artistService.createArtist(artist);

        verify(artistRepository, times(1)).save(artist);
        assertEquals(artist, result);
    }

    @Test
    void updateArtist() {
        Artist artist = new Artist();
        when(artistRepository.save(artist)).thenReturn(artist);

        Artist result = artistService.createArtist(artist);
        verify(artistRepository, times(1)).save(artist);
        assertEquals(artist, result);
    }

    @Test
    void deleteArtist() {
        Artist artist = new Artist();
        when(artistRepository.findById(1L)).thenReturn(Optional.of(artist));

        Artist result = artistService.deleteArtist(1L);

        verify(artistRepository, times(1)).delete(artist);
        assertEquals(artist, result);
    }

    @Test
    void getArtistById() {
        Artist artist = new Artist();
        when(artistRepository.findById(1L)).thenReturn(Optional.of(artist));

        Artist result = artistService.getArtistById(1L);

        assertEquals(artist, result);
    }

    @Test
    void getAllArtists() {
        Artist artist1 = new Artist();
        Artist artist2 = new Artist();
        artist1.setId(1L);
        artist2.setId(2L);
        when(artistRepository.findAll()).thenReturn(Arrays.asList(artist1, artist2));

        List<Artist> result = artistService.getAllArtists();

        assertEquals(2, result.size());
        assertTrue(result.containsAll(Arrays.asList(artist1, artist2)));
    }
}