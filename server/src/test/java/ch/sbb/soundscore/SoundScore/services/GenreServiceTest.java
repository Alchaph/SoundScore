package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.entities.Genre;
import ch.sbb.soundscore.SoundScore.repositories.GenreRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class GenreServiceTest {
    private GenreRepository genreRepository;
    private GenreService genreService;

    @BeforeEach
    void setUp() {
        genreRepository = mock(GenreRepository.class);
        genreService = new GenreService(genreRepository);
    }

    @Test
    void allGenres() {
        Genre genre1 = new Genre();
        Genre genre2 = new Genre();
        when(genreRepository.findAll()).thenReturn(Arrays.asList(genre1, genre2));

        List<Genre> result = genreService.getAllGenres();

        assertEquals(2, result.size());
        assertTrue(result.containsAll(Arrays.asList(genre1, genre2)));
    }

    @Test
    void newGenre() {
        Genre genre = new Genre();
        when(genreRepository.save(genre)).thenReturn(genre);

        Genre result = genreService.createGenre(genre);

        verify(genreRepository, times(1)).save(genre);
        assertEquals(genre, result);
    }

    @Test
    void editGenre() {
        Genre genre = new Genre();
        when(genreRepository.save(genre)).thenReturn(genre);

        Genre result = genreService.editGenre(genre);

        verify(genreRepository, times(1)).save(genre);
        assertEquals(genre, result);
    }

    @Test
    void deleteGenre() {
        Genre genre = new Genre();
        when(genreRepository.findById(1L)).thenReturn(Optional.of(genre));

        Genre result = genreService.deleteGenre(1L);

        verify(genreRepository, times(1)).delete(genre);
        assertEquals(genre, result);
    }
}