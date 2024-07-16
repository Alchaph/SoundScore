package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.entities.Post;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.repositories.CommentRepository;
import ch.sbb.soundscore.SoundScore.repositories.LikeOrDislikeRepository;
import ch.sbb.soundscore.SoundScore.repositories.PostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PostServiceTest {
    private PostRepository postRepository;
    private CommentRepository commentRepository;
    private PostService postService;

    @BeforeEach
    void setUp() {
        postRepository = mock(PostRepository.class);
        LikeOrDislikeRepository likeOrDislikeRepository = mock(LikeOrDislikeRepository.class);
        postService = new PostService(postRepository, likeOrDislikeRepository, commentRepository);
    }

    @Test
    void allPosts() {
        Post post1 = new Post();
        Post post2 = new Post();
        when(postRepository.findAll()).thenReturn(Arrays.asList(post1, post2));

        List<Post> result = postService.allPosts();

        assertEquals(2, result.size());
        assertTrue(result.containsAll(Arrays.asList(post1, post2)));
    }

    @Test
    void newPost() {
        Post post = new Post();
        post.setId(1L); // Assuming the ID is set to 1
        when(postRepository.save(post)).thenReturn(post);

        Post result = postService.newPost(post);

        verify(postRepository, times(1)).save(post);
        assertEquals(post.getId(), result.getId()); // Compare the IDs
    }

    @Test
    void editPost() {
        Post post = new Post();
        when(postRepository.save(post)).thenReturn(post);

        Post result = postService.editPost(post);

        verify(postRepository, times(1)).save(post);
        assertEquals(post, result);
    }

    @Test
    void deletePost() {
Post post = new Post();
        when(postRepository.findById(1L)).thenReturn(Optional.of(post));
        doNothing().when(postRepository).delete(post);

        Post result = postService.deletePost(1L);

        verify(postRepository, times(1)).delete(post);
        assertEquals(post, result);
    }

    @Test
    void likeOrDislikePost() {
        Post post = new Post();
        when(postRepository.findById(1L)).thenReturn(Optional.of(post));
        when(postRepository.save(post)).thenReturn(post);

        User user = new User();
        postService.likeOrDislikePost(1L, true, user);

        verify(postRepository, times(1)).save(post);
        assertEquals(1, post.getLikes());
    }
}