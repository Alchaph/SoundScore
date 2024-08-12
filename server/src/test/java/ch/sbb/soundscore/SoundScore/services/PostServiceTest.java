package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.entities.LikeOrDislike;
import ch.sbb.soundscore.SoundScore.entities.Post;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.entities.UserNotifications;
import ch.sbb.soundscore.SoundScore.repositories.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class PostServiceTest {

    @Mock
    private PostRepository postRepository;

    @Mock
    private LikeOrDislikeRepository likeOrDislikeRepository;

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserNotificationsRepository userNotificationsRepository;

    @InjectMocks
    private PostService postService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAllPostsPositive() {
        Post post1 = new Post(new User("user1", "test", "test", null, false), null, null, null);
        post1.setId(1L);
        Post post2 = new Post(new User("user1", "test", "test", null, false), null, null, null);
        post2.setId(2L);

        when(postRepository.findAll()).thenReturn(Arrays.asList(post1, post2));
        when(likeOrDislikeRepository.likesByPostId(any(Long.class))).thenReturn(generateLikeOrDislikeList(5));
        when(likeOrDislikeRepository.dislikesByPostId(any(Long.class))).thenReturn(generateLikeOrDislikeList(2));

        List<Post> posts = postService.allPosts();

        assertEquals(2, posts.size());
        verify(postRepository, times(1)).findAll();
    }

    @Test
    void testAllPostsNegative() {
        when(postRepository.findAll()).thenReturn(Arrays.asList());

        List<Post> posts = postService.allPosts();

        assertEquals(0, posts.size());
        verify(postRepository, times(1)).findAll();
    }

    @Test
    void testNewPostPositive() {
        Post post = new Post();
        when(postRepository.save(any(Post.class))).thenReturn(post);

        Post savedPost = postService.newPost(post);

        assertEquals(post, savedPost);
        verify(postRepository, times(1)).save(post);
    }

    @Test
    void testNewPostNegative() {
        Post post = new Post();
        when(postRepository.save(any(Post.class))).thenReturn(null);

        Post savedPost = postService.newPost(post);

        assertNull(savedPost);
        verify(postRepository, times(1)).save(post);
    }

    @Test
    void testEditPostPositive() {
        Post post = new Post();
        when(postRepository.save(any(Post.class))).thenReturn(post);

        Post editedPost = postService.editPost(post);

        assertEquals(post, editedPost);
        verify(postRepository, times(1)).save(post);
    }

    @Test
    void testEditPostNegative() {
        Post post = new Post();
        when(postRepository.save(any(Post.class))).thenReturn(null);

        Post editedPost = postService.editPost(post);

        assertNull(editedPost);
        verify(postRepository, times(1)).save(post);
    }

    @Test
    void testDeletePostPositive() {
        Post post = new Post();
        when(postRepository.findById(any(Long.class))).thenReturn(Optional.of(post));

        Post deletedPost = postService.deletePost(1L);

        assertEquals(post, deletedPost);
        verify(commentRepository, times(1)).deleteAllByPost(post);
        verify(userNotificationsRepository, times(1)).deleteAllByPost(post);
        verify(postRepository, times(1)).deleteLikes(post);
        verify(postRepository, times(1)).delete(post);
    }

    @Test
    void testDeletePostNegative() {
        when(postRepository.findById(any(Long.class))).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> postService.deletePost(1L));
    }

    @Test
    void testGetPostPositive() {
        Post post = new Post(new User("user1", "test", "test", null, false), null, null, null);
        post.setId(1L);
        when(postRepository.findById(any(Long.class))).thenReturn(Optional.of(post));
        when(likeOrDislikeRepository.likesByPostId(any(Long.class))).thenReturn(generateLikeOrDislikeList(5));
        when(likeOrDislikeRepository.dislikesByPostId(any(Long.class))).thenReturn(generateLikeOrDislikeList(2));

        Post foundPost = postService.getPost(1L);

        assertEquals(post, foundPost);
        verify(postRepository, times(1)).findById(1L);
    }

    @Test
    void testGetPostNegative() {
        when(postRepository.findById(any(Long.class))).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> postService.getPost(1L));
    }

    @Test
    void testLikeOrDislikePostPositive() {
        Post post = new Post();
        User user = new User();
        UserDetails userDetails = mock(UserDetails.class);
        when(userDetails.getUsername()).thenReturn("testuser");
        when(postRepository.findById(any(Long.class))).thenReturn(Optional.of(post));
        when(userRepository.findByUsername(any(String.class))).thenReturn(Optional.of(user));
        when(likeOrDislikeRepository.save(any(LikeOrDislike.class))).thenReturn(new LikeOrDislike());

        boolean result = postService.likeOrDislikePost(1L, true, userDetails);

        assertTrue(result);
        verify(postRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).findByUsername("testuser");
    }

    @Test
    void testLikeOrDislikePostNegative() {
        UserDetails userDetails = mock(UserDetails.class);
        when(postRepository.findById(any(Long.class))).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> postService.likeOrDislikePost(1L, true, userDetails));
    }

    @Test
    void testHasLikedOrDislikedPositive() {
        Post post = new Post();
        User user = new User();
        when(postRepository.findById(any(Long.class))).thenReturn(Optional.of(post));
        when(likeOrDislikeRepository.existsLikeOrDislikeByPostAndUserAndLikeIsFalse(post, user)).thenReturn(true);

        String result = postService.hasLikedOrDisliked(1L, user);

        assertEquals("{\"alreadyLikedOrDisliked\":true,\"liked\":false}", result);
        verify(postRepository, times(1)).findById(1L);
    }

    @Test
    void testHasLikedOrDislikedNegative() {
        User user = new User();
        when(postRepository.findById(any(Long.class))).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> postService.hasLikedOrDisliked(1L, user));
    }

    private List<LikeOrDislike> generateLikeOrDislikeList(int count) {
        List<LikeOrDislike> list = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            list.add(new LikeOrDislike());
        }
        return list;
    }
}