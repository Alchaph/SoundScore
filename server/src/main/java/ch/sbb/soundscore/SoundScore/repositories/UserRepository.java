package ch.sbb.soundscore.SoundScore.repositories;


import ch.sbb.soundscore.SoundScore.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {


    @Query("select u from User u where u.email = ?1")
    Optional<User> findByUsername(String email);

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.email = 'An deleted Artist' , u.username = 'Deleted Artist' , u.password = 'deleted Password' WHERE u = :u")
    @Override
    void delete(User u);
}

