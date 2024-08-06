package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.entities.Comment;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.entities.UserNotifications;
import ch.sbb.soundscore.SoundScore.repositories.CommentRepository;
import ch.sbb.soundscore.SoundScore.repositories.UserNotificationsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserNotificationsRepository userNotificationsRepository;
    public Long baseId;


    public CommentService(CommentRepository commentRepository, UserNotificationsRepository userNotificationsRepository) {
        this.commentRepository = commentRepository;
        this.userNotificationsRepository = userNotificationsRepository;
    }

    public Comment createComment(Comment comment, User currentUser) {
        Comment newComment = commentRepository.save(comment);
        if (comment.getParent() != null) {
            userNotificationsRepository.save(new UserNotifications(comment.getParent().getUser(), currentUser, null, newComment, null));
        } else {
            userNotificationsRepository.save(new UserNotifications(comment.getPost().getUser(), currentUser, comment.getPost(), newComment, null));
        }
        return newComment;
    }

    public Comment deleteComment(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow();
        userNotificationsRepository.deleteAllByComment(comment);
        this.commentRepository.deleteById(id);
        return comment;
    }

    public Comment editComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Comment getCommentById(Long id) {
        return commentRepository.findById(id).orElseThrow();
    }

    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findAllBypost(postId);
    }
}

