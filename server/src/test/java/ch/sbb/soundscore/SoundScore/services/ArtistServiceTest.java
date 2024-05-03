package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.entities.Artist;
import ch.sbb.soundscore.SoundScore.repositories.ArtistRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ArtistServiceTest {
    private ArtistRepository artistRepository;
    private ArtistService artistService;

    @BeforeEach
    void setUp() {
        artistRepository = mock(ArtistRepository.class);
        artistService = new ArtistService(artistRepository);
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

        Artist result = artistService.updateArtist(artist);

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
        when(artistRepository.findAll()).thenReturn(Arrays.asList(artist1, artist2));

        List<Artist> result = artistService.getAllArtists();

        assertEquals(2, result.size());
        assertTrue(result.containsAll(Arrays.asList(artist1, artist2)));
    }
}