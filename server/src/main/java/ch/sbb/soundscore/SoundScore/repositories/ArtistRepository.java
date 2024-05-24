package ch.sbb.soundscore.SoundScore.repositories;


import ch.sbb.soundscore.SoundScore.entities.Artist;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> {
    @Transactional
    @Modifying
    @Query("UPDATE Artist a SET a.description = 'An deleted Artist' , a.name = 'Deleted Artist' , a.image = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' WHERE a = :a")
    @Override
    void delete(Artist a);
}
