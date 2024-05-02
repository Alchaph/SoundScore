package ch.sbb.soundscore.SoundScore.controllers;

import ch.sbb.soundscore.SoundScore.entities.Genre;
import ch.sbb.soundscore.SoundScore.services.GenreService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/genres")
@CrossOrigin(origins = "http://localhost:4200")
public class GenreController {

    private final GenreService genreService;

    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @GetMapping("/get/all")
    public List<Genre> allGenres() {
        return this.genreService.allGenres();
    }

    @PostMapping("/create")
    public Long newGenre(@RequestBody Genre name) {
        return genreService.newGenre(name);
    }

    @PutMapping("/edit/{id}")
    public void updateGenre(@RequestBody Genre genre, @PathVariable Long id) {
        genreService.updateGenre(genre, id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteGenre(@PathVariable int id) {
        genreService.deleteGenre(id);
    }
}