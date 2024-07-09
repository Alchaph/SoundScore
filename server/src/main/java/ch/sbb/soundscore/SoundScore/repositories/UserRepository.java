package ch.sbb.soundscore.SoundScore.repositories;


import ch.sbb.soundscore.SoundScore.entities.Artist;
import ch.sbb.soundscore.SoundScore.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

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
}

