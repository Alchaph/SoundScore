package ch.sbb.soundscore.SoundScore.repositories;


import ch.sbb.soundscore.SoundScore.entities.Artist;
import ch.sbb.soundscore.SoundScore.entities.Genre;
import ch.sbb.soundscore.SoundScore.entities.Post;
import ch.sbb.soundscore.SoundScore.entities.Song;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("""
            SELECT s FROM Song s \
            JOIN Post p ON s.id = p.song.id \
            JOIN LikeOrDislike l ON l.post.id = p.id \
            GROUP BY s.id ORDER BY (SUM(CASE WHEN l.isLike = true THEN 1 ELSE 0 END) - SUM(CASE WHEN l.isLike = false THEN 1 ELSE 0 END)) DESC""")
    List<Song> getLeaderBoardSongs();


    @Query("SELECT g FROM Genre g " +
            "JOIN Post p ON g.id = p.genre.id " +
            "JOIN LikeOrDislike l ON l.post.id = p.id " +
            "GROUP BY g.id ORDER BY (SUM(CASE WHEN l.isLike = true THEN 1 ELSE 0 END) - SUM(CASE WHEN l.isLike = false THEN 1 ELSE 0 END)) DESC")
    List<Genre> getLeaderBoardGenres();


    @Query("SELECT a FROM Artist a " +
            "JOIN Post p ON a.id = p.artist.id " +
            "JOIN LikeOrDislike l ON l.post.id = p.id " +
            "GROUP BY a.id ORDER BY (SUM(CASE WHEN l.isLike = true THEN 1 ELSE 0 END) - SUM(CASE WHEN l.isLike = false THEN 1 ELSE 0 END)) DESC")
    List<Artist> getLeaderBoardArtists();


    @Query("SELECT p FROM Post p " +
            "JOIN LikeOrDislike l ON l.post.id = p.id " +
            "GROUP BY p.id ORDER BY (SUM(CASE WHEN l.isLike = true THEN 1 ELSE 0 END) - SUM(CASE WHEN l.isLike = false THEN 1 ELSE 0 END)) DESC")
    List<Post> getPostRanking();


    @Transactional
    @Modifying
    @Query("DELETE FROM LikeOrDislike l WHERE l.post = :post")
    void deleteLikes(Post post);

}
