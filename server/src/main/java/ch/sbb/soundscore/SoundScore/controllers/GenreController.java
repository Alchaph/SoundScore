package ch.sbb.soundscore.SoundScore.controllers;

import ch.sbb.soundscore.SoundScore.entities.Genre;
import ch.sbb.soundscore.SoundScore.services.GenreService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/genres")
public class GenreController {

    private final GenreService genreService;

    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @GetMapping("/get/all")
    public List<Genre> getAllGenres() {
        return this.genreService.getAllGenres();
    }

    @PostMapping("/create")
    public Genre createGenre(@RequestBody Genre name) {
        return genreService.createGenre(name);
    }

    @PutMapping("/edit")
    public Genre editGenre(@RequestBody Genre genre) {
        return genreService.editGenre(genre);
    }

    @DeleteMapping("/delete/{id}")
    public Genre deleteGenre(@PathVariable Long id) {
        return genreService.deleteGenre(id);
    }

    @GetMapping("/get/{id}")
    public Genre getGenreById(@PathVariable Long id) {
        return genreService.getGenreById(id);
    }
}