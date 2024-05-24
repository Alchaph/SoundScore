package ch.sbb.soundscore.SoundScore.services;


import ch.sbb.soundscore.SoundScore.entities.Artist;
import ch.sbb.soundscore.SoundScore.repositories.ArtistRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArtistService {
    private final ArtistRepository artistRepository;

    public ArtistService(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    public Artist createArtist(Artist artist) {
        return artistRepository.save(artist);
    }

    public Artist editArtist(Artist artist) {
        return artistRepository.save(artist);
    }

    public Artist deleteArtist(Long id) {
        Artist artist = artistRepository.findById(id).orElse(null);
        if (artist != null) {
            artistRepository.delete(artist);
        }
        return artist;
    }

    public Artist getArtistById(Long id) {
        return artistRepository.findById(id).orElse(null);
    }

    public List<Artist> getAllArtists() {
        return artistRepository.findAll();
    }
}
