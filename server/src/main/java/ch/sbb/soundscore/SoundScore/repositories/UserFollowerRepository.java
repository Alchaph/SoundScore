package ch.sbb.soundscore.SoundScore.repositories;

import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.entities.UserFollower;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UserFollowerRepository extends JpaRepository<UserFollower, Long> {

    @Transactional
    @Query(value = "DELETE FROM user_follower WHERE user_id = ?1 AND follower_id = ?2 RETURNING *", nativeQuery = true)
    UserFollower deFollow(int userId, Long followerId);

    @Transactional
    UserFollower getUserFollowerByFollower(User follower);
}
