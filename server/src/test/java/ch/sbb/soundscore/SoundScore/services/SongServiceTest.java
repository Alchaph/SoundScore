package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.entities.Song;
import ch.sbb.soundscore.SoundScore.repositories.SongRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class SongServiceTest {

    @InjectMocks
    private SongService songService;

    @Mock
    private SongRepository songRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createEditSong_Positive() {
        Song song = new Song();
        when(songRepository.save(any(Song.class))).thenReturn(song);

        Song result = songService.createEditSong(song);

        assertNotNull(result);
        verify(songRepository, times(1)).save(song);
    }

    @Test
    void deleteSong_Positive() {
        Song song = new Song();
        when(songRepository.findById(anyLong())).thenReturn(Optional.of(song));

        Song result = songService.deleteSong(1L);

        assertNotNull(result);
        verify(songRepository, times(1)).findById(1L);
        verify(songRepository, times(1)).delete(song);
    }

    @Test
    void editSong_Positive() {
        Song song = new Song();
        when(songRepository.save(any(Song.class))).thenReturn(song);

        Song result = songService.editSong(song);

        assertNotNull(result);
        verify(songRepository, times(1)).save(song);
    }

    @Test
    void getSongById_Positive() {
        Song song = new Song();
        when(songRepository.findById(anyLong())).thenReturn(Optional.of(song));

        Song result = songService.getSongById(1L);

        assertNotNull(result);
        verify(songRepository, times(1)).findById(1L);
    }

    @Test
    void getAllSongs_Positive() {
        List<Song> songs = Arrays.asList(new Song(), new Song());
        when(songRepository.findAll()).thenReturn(songs);

        List<Song> result = songService.getAllSongs();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(songRepository, times(1)).findAll();
    }
}