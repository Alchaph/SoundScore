package ch.sbb.soundscore.SoundScore.services;


import ch.sbb.soundscore.SoundScore.entities.Artist;
import ch.sbb.soundscore.SoundScore.repositories.ArtistRepository;
import ch.sbb.soundscore.SoundScore.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArtistService {
    private final ArtistRepository artistRepository;
    private final UserRepository userRepository;

    public ArtistService(ArtistRepository artistRepository, UserRepository userRepository) {
        this.artistRepository = artistRepository;
        this.userRepository = userRepository;
    }

    public Artist createArtist(Artist artist) {
        return artistRepository.save(artist);
    }

    public Artist editArtist(Artist artist) {
        return artistRepository.save(artist);
    }

    public Artist deleteArtist(Long id) {
        Artist artist = artistRepository.findById(id).orElseThrow();
        userRepository.updateArtistByArtist(artist);
        artistRepository.delete(artist);
        return artist;
    }

    public Artist getArtistById(Long id) {
        return artistRepository.findById(id).orElseThrow(null);
    }

    public List<Artist> getAllArtists() {
        return artistRepository.findAll();
    }
}
