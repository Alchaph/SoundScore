package ch.sbb.soundscore.SoundScore.Controller;

import ch.sbb.soundscore.SoundScore.entities.LikeOrDislike;
import ch.sbb.soundscore.SoundScore.entities.Post;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.services.PostService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class PostControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PostService postService;

    @BeforeEach
    void setUp() {
        Post post1 = new Post();
        post1.setId(1L);
        Post post2 = new Post();
        post2.setId(2L);

        List<Post> posts = Arrays.asList(post1, post2);
        given(postService.allPosts()).willReturn(posts);
    }

    @Test
    @WithMockUser
    void shouldGetAllPosts() throws Exception {
        mockMvc.perform(get("/api/posts/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[1].id", is(2)));
    }

    @DirtiesContext
    @Transactional
    @Test
    @WithMockUser
    void shouldCreateNewPost() throws Exception {
        Post post = new Post();
        post.setId(1L);
        Post returnedPost = new Post();
        returnedPost.setId(1L);
        given(postService.newPost(ArgumentMatchers.any(Post.class))).willReturn(returnedPost);
        mockMvc.perform(post("/api/posts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(post)))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    @DirtiesContext
    @Transactional
    void shouldUpdatePost() throws Exception {
        Post post = new Post();
        post.setId(1L);

        mockMvc.perform(put("/api/posts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(post)))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    @DirtiesContext
    @Transactional
    void shouldDeletePost() throws Exception {
        mockMvc.perform(delete("/api/posts/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "testUser")
    void shouldLikePost() throws Exception {
        given(postService.likeOrDislikePost(ArgumentMatchers.anyLong(), ArgumentMatchers.anyBoolean(), ArgumentMatchers.any(UserDetails.class))).willReturn(true);
        mockMvc.perform(post("/api/posts/like/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(true)))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }

    @Test
    @WithMockUser(username = "testUser")
    void shouldDislikePost() throws Exception {
        given(postService.likeOrDislikePost(ArgumentMatchers.anyLong(), ArgumentMatchers.anyBoolean(), ArgumentMatchers.any(UserDetails.class))).willReturn(true);

        mockMvc.perform(post("/api/posts/like/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("false"))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }


    @Test
    void shouldNotPerformPostOperations() throws Exception {
        Post post = new Post();
        post.setId(1L);
        mockMvc.perform(get("/api/posts/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
        mockMvc.perform(post("/api/posts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(post)))
                .andExpect(status().isForbidden());

        mockMvc.perform(put("/api/posts")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(post)))
                .andExpect(status().isForbidden());

        mockMvc.perform(delete("/api/posts/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());

        mockMvc.perform(post("/api/posts/like/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("true"))
                .andExpect(status().isForbidden());
    }
}