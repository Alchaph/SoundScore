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


    public Genre createGenre(Genre genre) {
        return genreRepository.save(genre);
    }

    public Genre editGenre(Genre genre) {
        return genreRepository.save(genre);
    }

    public Genre deleteGenre(Long id) {
        Genre genre = genreRepository.findById(id).orElseThrow();
        genreRepository.delete(genre);
        return genre;
    }

    public Genre getGenreById(Long id) {
        return genreRepository.findById(id).orElseThrow();
    }

    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }

}