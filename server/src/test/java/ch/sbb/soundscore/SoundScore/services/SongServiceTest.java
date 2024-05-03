package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.entities.Song;
import ch.sbb.soundscore.SoundScore.repositories.SongRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SongServiceTest {
    private SongRepository songRepository;
    private SongService songService;

    @BeforeEach
    void setUp() {
        songRepository = mock(SongRepository.class);
        songService = new SongService(songRepository);
    }

    @Test
    void allSongs() {
        Song song1 = new Song();
        Song song2 = new Song();
        when(songRepository.findAll()).thenReturn(Arrays.asList(song1, song2));

        List<Song> result = songService.getAllSongs();

        assertEquals(2, result.size());
        assertTrue(result.containsAll(Arrays.asList(song1, song2)));
    }

    @Test
    void newSong() {
        Song song = new Song();
        when(songRepository.save(song)).thenReturn(song);

        Song result = songService.createSong(song);

        verify(songRepository, times(1)).save(song);
        assertEquals(song, result);
    }

    @Test
    void editSong() {
        Song song = new Song();
        when(songRepository.save(song)).thenReturn(song);

        Song result = songService.editSong(song);

        verify(songRepository, times(1)).save(song);
        assertEquals(song, result);
    }

    @Test
    void deleteSong() {
        Song song = new Song();
        when(songRepository.findById(1L)).thenReturn(Optional.of(song));
        doNothing().when(songRepository).delete(song);

        Song result = songService.deleteSong(1L);

        verify(songRepository, times(1)).delete(song);
        assertEquals(song, result);
    }
}