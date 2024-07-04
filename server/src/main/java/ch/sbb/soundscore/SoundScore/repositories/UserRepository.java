package ch.sbb.soundscore.SoundScore.repositories;


import ch.sbb.soundscore.SoundScore.entities.Artist;
import ch.sbb.soundscore.SoundScore.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
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
    @Query("UPDATE User u SET u.email = :name , u.username = :name, u.password = 'Deleted'  WHERE u = :u")
    void deletes(User u, String name);
}

