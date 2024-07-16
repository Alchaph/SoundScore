package ch.sbb.soundscore.SoundScore.Controller;

import ch.sbb.soundscore.SoundScore.entities.Comment;
import ch.sbb.soundscore.SoundScore.services.CommentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class CommentControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CommentService commentService;


    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldCreateNewComment() throws Exception {
        Comment comment = new Comment();
        comment.setId(1L);
        when(commentService.createComment(any(Comment.class))).thenReturn(comment);
        mockMvc.perform(post("/api/comments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(comment)))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldUpdateComment() throws Exception {
        Comment comment = new Comment();
        comment.setId(1L);
        when(commentService.editComment(any(Comment.class))).thenReturn(comment);
        mockMvc.perform(put("/api/comments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(comment)))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldDeleteComment() throws Exception {
        Comment comment = new Comment();
        comment.setId(1L);
        when(commentService.getCommentById(1L)).thenReturn(comment);
        mockMvc.perform(delete("/api/comments/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldGetCommentById() throws Exception {
        List<Comment> comments = new ArrayList<>();
        when(commentService.getCommentsByPostId(1L)).thenReturn(comments);
        mockMvc.perform(get("/api/comments/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void shouldGetAllCommentsByPostId() throws Exception {
        List<Comment> comments = new ArrayList<>();
        when(commentService.getCommentsByPostId(1L)).thenReturn(comments);
        mockMvc.perform(get("/api/comments/commentsByPostId/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }


    @Test
    void shouldNotPerformCommentOperations() throws Exception {
        Comment comment = new Comment();
        comment.setId(1L);
        mockMvc.perform(post("/api/comments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(comment)))
                .andExpect(status().isForbidden());

        mockMvc.perform(put("/api/comments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(comment)))
                .andExpect(status().isForbidden());

        mockMvc.perform(delete("/api/comments/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());

        mockMvc.perform(get("/api/comments/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());

        mockMvc.perform(get("/api/comments/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }
}
