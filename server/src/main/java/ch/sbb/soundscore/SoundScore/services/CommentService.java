package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.entities.Comment;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.entities.UserNotifications;
import ch.sbb.soundscore.SoundScore.repositories.CommentRepository;
import ch.sbb.soundscore.SoundScore.repositories.UserNotificationsRepository;
import ch.sbb.soundscore.SoundScore.repositories.UserRepository;
import ch.sbb.soundscore.SoundScore.repositories.UserTagRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserNotificationsRepository userNotificationsRepository;
    private final UserRepository userRepository;
    private final UserTagRepository userTagRepository;
    public Long baseId;


    public CommentService(CommentRepository commentRepository, UserNotificationsRepository userNotificationsRepository, UserRepository userRepository, UserTagRepository userTagRepository) {
        this.commentRepository = commentRepository;
        this.userNotificationsRepository = userNotificationsRepository;
        this.userRepository = userRepository;
        this.userTagRepository = userTagRepository;
    }

    public Comment createComment(Comment comment, User currentUser) {
        Comment newComment = commentRepository.save(comment);
        if (comment.getParent() != null) {
            userNotificationsRepository.save(new UserNotifications(comment.getParent().getUser(), currentUser, null, newComment, null, null, null));
        } else {
            userNotificationsRepository.save(new UserNotifications(comment.getPost().getUser(), currentUser, comment.getPost(), newComment, null, null, null));
        }
        return newComment;
    }

    public Comment deleteComment(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow();
        userNotificationsRepository.deleteAllByUserTagOfComment(comment);
        userNotificationsRepository.deleteAllByComment(comment);
        userTagRepository.deleteAllByComment(comment);
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

