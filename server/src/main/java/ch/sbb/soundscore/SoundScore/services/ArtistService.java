package ch.sbb.soundscore.SoundScore.services;


import ch.sbb.soundscore.SoundScore.entities.Artist;
import ch.sbb.soundscore.SoundScore.repositories.ArtistRepository;
import ch.sbb.soundscore.SoundScore.repositories.PostRepository;
import ch.sbb.soundscore.SoundScore.repositories.SongRepository;
import ch.sbb.soundscore.SoundScore.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArtistService {
    private final ArtistRepository artistRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final SongRepository songRepository;

    public ArtistService(ArtistRepository artistRepository, UserRepository userRepository, PostRepository postRepository, SongRepository songRepository) {
        this.artistRepository = artistRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.songRepository = songRepository;
    }

    public Artist createArtist(Artist artist) {
        return artistRepository.save(artist);
    }

    public Artist editArtist(Artist artist) {
        return artistRepository.save(artist);
    }

    public Artist deleteArtist(Long id) {
        Artist artist = artistRepository.findById(id).orElseThrow();
        artistRepository.createArtist0IfNotExists();
        userRepository.updateArtistByArtist(artist);
        postRepository.updateArtistByArtist(artist);
        songRepository.updateArtistByArtist(artist);
        artistRepository.delete(artist);
        return artist;
    }

    public Artist getArtistById(Long id) {
        if (id != 0) {
            return artistRepository.findById(id).orElseThrow();
        }
        throw new IllegalArgumentException("Id must not be 0");
    }

    public List<Artist> getAllArtists() {
        return artistRepository.findAll().stream().filter(artist -> artist.getId() != 0).toList();
    }

}
