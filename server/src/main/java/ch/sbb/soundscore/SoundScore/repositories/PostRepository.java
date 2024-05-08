package ch.sbb.soundscore.SoundScore.repositories;

import ch.sbb.soundscore.SoundScore.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("SELECT p FROM Post p WHERE p.song IS NOT NULL ORDER BY p.likes - p.dislikes ASC")
    List<Post> getLeaderBoardSongs();

    @Query("SELECT p FROM Post p WHERE p.genre IS NOT NULL ORDER BY p.likes - p.dislikes ASC")
    List<Post> getLeaderBoardGenres();

    @Query("SELECT p FROM Post p WHERE p.artist IS NOT NULL ORDER BY p.likes - p.dislikes ASC")
    List<Post> getLeaderBoardArtists();

    @Query("SELECT p FROM Post p ORDER BY p.likes - p.dislikes ASC")
    List<Post> getPostRanking();

}
