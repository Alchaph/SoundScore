package ch.sbb.soundscore.SoundScore.controllers;

import ch.sbb.soundscore.SoundScore.entities.Artist;
import ch.sbb.soundscore.SoundScore.services.ArtistService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/artist")
public class ArtistController {
    private final ArtistService artistService;

    public ArtistController(ArtistService artistService) {
        this.artistService = artistService;
    }

    @PostMapping("/create")
    public Artist createArtist(@RequestBody Artist artist) {
        return artistService.createArtist(artist);
    }

    @PutMapping("/edit")
    public Artist editArtist(@RequestBody Artist artist) {
        return artistService.editArtist(artist);
    }
    @DeleteMapping("/delete/{id}")
    public Artist deleteArtist(@PathVariable Long id) {
        return artistService.deleteArtist(id);
    }

    @GetMapping("/get/{id}")
    public Artist getArtistById(@PathVariable Long id) {
        return artistService.getArtistById(id);
    }

    @GetMapping("/get/all")
    public List<Artist> getAllArtists() {
        return artistService.getAllArtists();
    }
}
