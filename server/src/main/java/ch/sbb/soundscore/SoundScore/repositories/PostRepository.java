package ch.sbb.soundscore.SoundScore.repositories;

import ch.sbb.soundscore.SoundScore.entities.Artist;
import ch.sbb.soundscore.SoundScore.entities.Genre;
import ch.sbb.soundscore.SoundScore.entities.Post;
import ch.sbb.soundscore.SoundScore.entities.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("SELECT s FROM Song s JOIN Post p ON s.id = p.song.id ORDER BY (p.likes - p.dislikes) DESC")
    List<Song> getLeaderBoardSongs();

    @Query("SELECT g FROM Genre g JOIN Post p ON g.id = p.genre.id ORDER BY (p.likes - p.dislikes) DESC")
    List<Genre> getLeaderBoardGenres();

    @Query("SELECT a FROM Artist a JOIN Post p ON a.id = p.artist.id ORDER BY (p.likes - p.dislikes) DESC")
    List<Artist> getLeaderBoardArtists();

    @Query("SELECT p FROM Post p ORDER BY p.likes - p.dislikes DESC")
    List<Post> getPostRanking();
}
