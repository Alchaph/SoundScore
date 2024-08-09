package ch.sbb.soundscore.SoundScore.repositories;

import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.entities.UserFollower;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UserFollowerRepository extends JpaRepository<UserFollower, Long> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO UserFollower (user, follower) VALUES (?1, ?2) RETURNING *", nativeQuery = true)
    UserFollower follow(Long userId, Long followerId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM UserFollower WHERE user = ?1 AND follower = ?2 RETURNING *", nativeQuery = true)
    UserFollower deFollow(Long userId, Long followerId);
}
