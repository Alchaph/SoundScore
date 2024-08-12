package ch.sbb.soundscore.SoundScore.repositories;

import ch.sbb.soundscore.SoundScore.entities.UserTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTagRepository extends JpaRepository<UserTag, Long> {

}
