package ch.sbb.soundscore.SoundScore.repositories;

import ch.sbb.soundscore.SoundScore.entities.Comment;
import ch.sbb.soundscore.SoundScore.entities.LikeOrDislike;
import ch.sbb.soundscore.SoundScore.entities.Post;
import ch.sbb.soundscore.SoundScore.entities.UserNotifications;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserNotificationsRepository extends JpaRepository<UserNotifications, Long> {
    @Query("select u from UserNotifications u where u.receiver.id = ?1")
    List<UserNotifications> getUserNotificationsByUserId(Long user_id);

    @Transactional
    @Modifying
    void deleteAllByComment(Comment comment);

    @Transactional
    @Modifying
    void deleteAllByPost(Post post);

    @Transactional
    @Modifying
    @Query("delete UserNotifications u where u.likeOrDislike = :likeOrDislike")
    void deleteAllByLikeOrDislike(LikeOrDislike likeOrDislike);
}
