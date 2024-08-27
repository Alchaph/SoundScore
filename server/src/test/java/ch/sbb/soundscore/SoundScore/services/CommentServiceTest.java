package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.entities.Comment;
import ch.sbb.soundscore.SoundScore.entities.Post;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.repositories.CommentRepository;
import ch.sbb.soundscore.SoundScore.repositories.UserNotificationsRepository;
import ch.sbb.soundscore.SoundScore.repositories.UserRepository;
import ch.sbb.soundscore.SoundScore.repositories.UserTagRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class CommentServiceTest {
    private CommentRepository commentRepository;
    private CommentService commentService;
    private UserNotificationsRepository userNotificationsRepository;
    private UserRepository userRepository;
    private UserTagRepository userTagRepository;

    @BeforeEach
    void setUp() {
        commentRepository = mock(CommentRepository.class);
        userNotificationsRepository = mock(UserNotificationsRepository.class);
        commentService = new CommentService(commentRepository, userNotificationsRepository, userRepository, userTagRepository);
    }

    @Test
    void createComment() {
        Comment comment = new Comment("Test Comment", new User(), new Post(), null);
        when(commentRepository.save(comment)).thenReturn(comment);
        Comment result = commentService.createComment(comment, new User());
        verify(commentRepository, times(1)).save(comment);
        assertEquals("Test Comment", result.getMessage());
    }

    @Test
    void deleteComment() {
        Comment comment = new Comment("Test Comment", null, null, null);
        when(commentRepository.findById(1L)).thenReturn(Optional.of(comment));

        Comment result = commentService.deleteComment(1L);

        verify(commentRepository, times(1)).deleteById(1L);
        assertEquals("Test Comment", result.getMessage());
    }

    @Test
    void updateComment() {
        Comment comment = new Comment("Test Comment", null, null, null);
        when(commentRepository.save(comment)).thenReturn(comment);

        Comment result = commentService.editComment(comment);

        verify(commentRepository, times(1)).save(comment);
        assertEquals("Test Comment", result.getMessage());
    }

    @Test
    void getComment() {
        Comment comment = new Comment("Test Comment", null, null, null);
        when(commentRepository.save(comment)).thenReturn(comment);
        Comment result = commentService.editComment(comment);

        assertEquals(comment, result);
    }

    @Test
    void getCommentsByPostId() {
        User user = new User("test", "test", "test", null, false);
        user.setId(1L);

        Post post = new Post();
        post.setId(2L);

        Comment comment1 = new Comment("Test Comment", user, post, null);
        Comment comment2 = new Comment("Test Comment", user, post, null);
        List<Comment> comments = Arrays.asList(comment1, comment2);
        when(commentRepository.findAllBypost(1L)).thenReturn(comments);

        List<Comment> result = commentService.getCommentsByPostId(1L);

        assertEquals(comments, result);
    }
}