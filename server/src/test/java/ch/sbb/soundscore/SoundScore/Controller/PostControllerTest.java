package ch.sbb.soundscore.SoundScore.Controller;

import ch.sbb.soundscore.SoundScore.controllers.PostController;
import ch.sbb.soundscore.SoundScore.entities.Post;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.services.PostService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class PostControllerTest {

    @InjectMocks
    private PostController postController;

    @Mock
    private PostService postService;

    @Mock
    private Authentication authentication;

    @Mock
    private SecurityContext securityContext;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(postController).build();
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    public void testAllPosts() throws Exception {
        Post post = new Post();
        when(postService.allPosts()).thenReturn(Collections.singletonList(post));

        mockMvc.perform(get("/api/posts/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0]").exists());
    }

    @Test
    public void testGetPost() throws Exception {
        Post post = new Post();
        when(postService.getPost(1L)).thenReturn(post);

        mockMvc.perform(get("/api/posts/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(post.getId()));
    }

    @Test
    public void testNewPost() throws Exception {
        Post post = new Post();
        when(postService.newPost(any(Post.class))).thenReturn(post);

        mockMvc.perform(post("/api/posts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Test Post\",\"content\":\"This is a test post.\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(post.getId()));
    }

    @Test
    public void testEditPost() throws Exception {
        Post post = new Post();
        when(postService.editPost(any(Post.class))).thenReturn(post);

        mockMvc.perform(put("/api/posts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\":1,\"title\":\"Updated Post\",\"content\":\"This is an updated post.\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(post.getId()));
    }

    @Test
    public void testDeletePost() throws Exception {
        Post post = new Post();
        when(postService.deletePost(1L)).thenReturn(post);

        mockMvc.perform(delete("/api/posts/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(post.getId()));
    }

    @Test
    public void testLikeOrDislikePost() throws Exception {
        UserDetails currentUser = org.mockito.Mockito.mock(UserDetails.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(currentUser);
        when(postService.likeOrDislikePost(1L, true, currentUser)).thenReturn(true);

        mockMvc.perform(post("/api/posts/like/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("true"))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }

    @Test
    public void testHasLikedOrDisliked() throws Exception {
        User currentUser = org.mockito.Mockito.mock(User.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(currentUser);
        when(postService.hasLikedOrDisliked(1L, currentUser)).thenReturn("liked");

        mockMvc.perform(get("/api/posts/likes/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("liked"));
    }
}