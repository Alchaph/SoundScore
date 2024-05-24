package ch.sbb.soundscore.SoundScore.repositories;


import ch.sbb.soundscore.SoundScore.entities.Genre;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {

    @Transactional
    @Modifying
    @Query("UPDATE Genre g SET g.description = 'An deleted Genre' , g.name = 'Deleted Genre'  WHERE g = :g")
    @Override
    void delete(Genre g);
}
