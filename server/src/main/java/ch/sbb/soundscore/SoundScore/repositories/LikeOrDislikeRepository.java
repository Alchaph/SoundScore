package ch.sbb.soundscore.SoundScore.repositories;

import ch.sbb.soundscore.SoundScore.entities.LikeOrDislike;
import ch.sbb.soundscore.SoundScore.entities.Post;
import ch.sbb.soundscore.SoundScore.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface LikeOrDislikeRepository extends JpaRepository<LikeOrDislike, Long> {

    @Query("select (count(l) > 0) from LikeOrDislike l where l.post = ?1 and l.user = ?2 and l.isLike = true")
    boolean existsLikeOrDislikeByPostAndUserAndLikeTrue(Post post, User user);

    @Transactional
    @Modifying
    @Query("delete from LikeOrDislike l where l.post = ?1 and l.user = ?2 and l.isLike = true")
    void deleteLikeOrDislikeByPostAndUserAndLikeIsTrue(Post post, User user);

    @Query("select (count(l) > 0) from LikeOrDislike l where l.post = ?1 and l.user = ?2 and l.isLike = false")
    boolean existsLikeOrDislikeByPostAndUserAndLikeIsFalse(Post post, User user);

    @Transactional
    @Modifying
    @Query("delete from LikeOrDislike l where l.post = ?1 and l.user = ?2 and l.isLike = false")
    void deleteLikeOrDislikeByPostAndUserAndLikeIsFalse(Post post, User user);

    @Query("SELECT l FROM LikeOrDislike l WHERE l.post.id = ?1 AND l.isLike = true")
    List<LikeOrDislike> likesByPostId(Long postId);

    @Query("SELECT l FROM LikeOrDislike l WHERE l.post.id = ?1 AND l.isLike = false")
    List<LikeOrDislike> dislikesByPostId(Long postId);

}
