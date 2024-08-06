package ch.sbb.soundscore.SoundScore.repositories;


import ch.sbb.soundscore.SoundScore.entities.Artist;
import ch.sbb.soundscore.SoundScore.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Transactional
    @Modifying
    @Query("update User u set u.artist = null  where u.artist = ?1")
    void updateArtistByArtist(Artist artist);

    @Transactional
    @Query("select u from User u where u.username = ?1")
    Optional<User> findByUsername(String username);

    @Transactional
    @Modifying
    @Query("Update Comment c set c.user = :deletedUser where c.user = :user")
    void UpdateUsersComments(@Param("user") User user, @Param("deletedUser") User deletedUser);

    @Transactional
    @Modifying
    @Query("Update UserNotifications n set n.sender = :deletedUser where n.sender = :user")
    void updateUsersNotifications(@Param("user") User user, @Param("deletedUser") User deletedUser);

    @Transactional
    @Modifying
    @Query("Update LikeOrDislike l set l.user = :deletedUser where l.user = :user")
    void UpdateUsersLikes(@Param("user") User user, @Param("deletedUser") User deletedUser);

    @Transactional
    @Modifying
    @Query("Update Post p set p.user = :deletedUser where p.user = :user")
    void UpdateUsersPosts(@Param("user") User user, @Param("deletedUser") User deletedUser);

    @Transactional
    @Modifying
    @Query("Delete from User u where u = :user")
    void deleteUser(@Param("user") User user);


    @Transactional
    @Query("select u from User u where u.email = ?1")
    Optional<User> findByEmail(String email);

    @Query("select u from User u where u.artist.id = ?1")
    User getUserByArtistId(int id);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO users (id, created_at, email, password, updated_at, username, artist_id) " +
            "SELECT 0, '2024-07-24 12:38:49.086000', 'Deleted', 'Deleted', '2024-08-24 12:38:49.086000', 'Deleted User', NULL " +
            "WHERE NOT EXISTS (" +
            "    SELECT 1 FROM users WHERE id = 0" +
            ");", nativeQuery = true)
    void createUser0IfNotExists();
}

