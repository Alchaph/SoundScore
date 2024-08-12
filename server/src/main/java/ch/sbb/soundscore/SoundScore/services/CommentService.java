package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.entities.Comment;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.entities.UserNotifications;
import ch.sbb.soundscore.SoundScore.repositories.CommentRepository;
import ch.sbb.soundscore.SoundScore.repositories.UserNotificationsRepository;
import ch.sbb.soundscore.SoundScore.repositories.UserRepository;
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
    public Long baseId;


    public CommentService(CommentRepository commentRepository, UserNotificationsRepository userNotificationsRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.userNotificationsRepository = userNotificationsRepository;
        this.userRepository = userRepository;
    }

    public Comment createComment(Comment comment, User currentUser) {
//        System.out.println("can print");
        Comment newComment = commentRepository.save(comment);

        Set<String> matchUser = Arrays.stream(comment.getMessage().split(" "))
                .filter(word -> word.startsWith("@") && word.indexOf("@") == 0)
                .collect(Collectors.toSet())
                .stream().map(word -> word.substring(1))
                .collect(Collectors.toSet());

//        System.out.println(matchUser);

        for (String username : matchUser) {
//            System.out.println(username);


            userRepository.findByUsername(username).ifPresent(user -> {
//                System.out.println(user.getId());
                userNotificationsRepository.save(new UserNotifications(user, comment.getUser(), null, newComment, null));
            });
        }

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

