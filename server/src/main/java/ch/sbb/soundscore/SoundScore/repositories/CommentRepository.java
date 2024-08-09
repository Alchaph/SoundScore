package ch.sbb.soundscore.SoundScore.repositories;


import ch.sbb.soundscore.SoundScore.entities.Comment;
import ch.sbb.soundscore.SoundScore.entities.Post;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("SELECT c FROM Comment c WHERE c.post.id = :post_id")
    List<Comment> findAllBypost(long post_id);

    @Transactional
    @Query("delete from Comment c where c.post = ?1")
    @Modifying
    void deleteAllByPost(Post post);

    @Transactional
    @Modifying
    @Query("DELETE FROM Comment c WHERE c.parent = :comment")
    void deleteChildren(Comment comment);


    @Query("select c from Comment c where c.parent.id = ?1")
    List<Comment> getCommentByComment(Long id);


}
