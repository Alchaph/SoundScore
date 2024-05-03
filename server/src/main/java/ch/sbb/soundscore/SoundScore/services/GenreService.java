package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.entities.Genre;
import ch.sbb.soundscore.SoundScore.repositories.GenreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreService {

    private final GenreRepository genreRepository;

    public GenreService(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    public List<Genre> allGenres() {
        return genreRepository.findAll();
    }

    public Long newGenre(Genre genre) {
        genreRepository.save(genre);
        return genre.getId();
    }

    public Genre editGenre(Genre genre) {
        return genreRepository.save(genre);
    }

    public Genre deleteGenre(Long id) {
        Genre genre = genreRepository.findById(id).orElse(null);
        if (genre != null) {
            genreRepository.delete(genre);
        }
        return genre;
    }
}