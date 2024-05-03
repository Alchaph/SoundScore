package ch.sbb.soundscore.SoundScore.repositories;

import ch.sbb.soundscore.SoundScore.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("SELECT c FROM Comment c WHERE c.fk_post.id = :post_id")
    List<Comment> findAllByFk_post(long post_id);
}
