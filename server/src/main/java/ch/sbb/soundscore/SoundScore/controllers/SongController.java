package ch.sbb.soundscore.SoundScore.controllers;

import ch.sbb.soundscore.SoundScore.entities.Song;
import ch.sbb.soundscore.SoundScore.services.SongService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/songs")
public class SongController {
    private final SongService songService;

    public SongController(SongService songService) {
        this.songService = songService;
    }

    @PostMapping("")
    public Song createSong(@RequestBody Song song) {
        return songService.createSong(song);
    }

    @PutMapping("")
    public Song updateSong(@RequestBody Song song) {
        return songService.editSong(song);
    }

    @DeleteMapping("/{id}")
    public Song deleteSong(@PathVariable Long id) {
        return songService.deleteSong(id);
    }

    @GetMapping("/{id}")
    public Song getSongById(@PathVariable Long id) {
        return songService.getSongById(id);
    }

    @GetMapping("/all")
    public List<Song> getAllSongs() {
        return songService.getAllSongs();
    }

}
