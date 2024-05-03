package ch.sbb.soundscore.SoundScore.Controller;

import ch.sbb.soundscore.SoundScore.entities.Artist;
import ch.sbb.soundscore.SoundScore.entities.Genre;
import ch.sbb.soundscore.SoundScore.services.ArtistService;
import ch.sbb.soundscore.SoundScore.services.GenreService;
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

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class GenreControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GenreService genreService;


    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldCreateNewGenre() throws Exception {
        Genre genre = new Genre();
        genre.setId(1L);
        when(genreService.createGenre(any(Genre.class))).thenReturn(genre);
        mockMvc.perform(post("/api/genres/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(genre)))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldUpdateGenre() throws Exception {
        Genre genre = new Genre();
        genre.setId(1L);
        when(genreService.editGenre(any(Genre.class))).thenReturn(genre);
        mockMvc.perform(put("/api/genres/edit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(genre)))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldDeleteGenre() throws Exception {
        Genre genre = new Genre();
        genre.setId(1L);
        when(genreService.getGenreById(1L)).thenReturn(genre);
        mockMvc.perform(delete("/api/genres/delete/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldGetGenreById() throws Exception {
        Genre genre = new Genre();
        genre.setId(1L);
        when(genreService.getGenreById(1L)).thenReturn(genre);
        mockMvc.perform(get("/api/genres/get/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldGetAllGenres() throws Exception {
        Genre genre1 = new Genre();
        genre1.setId(1L);
        Genre genre2 = new Genre();
        genre2.setId(2L);
        List<Genre> genres = Arrays.asList(genre1, genre2);
        when(genreService.getAllGenres()).thenReturn(genres);
        mockMvc.perform(get("/api/genres/get/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[1].id").value(2));
    }

    @Test
    void shouldNotPerformGenreOperations() throws Exception {
        Genre genre = new Genre();
        genre.setId(1L);
        mockMvc.perform(post("/api/genres/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(genre)))
                .andExpect(status().isForbidden());

        mockMvc.perform(put("/api/genres/edit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(genre)))
                .andExpect(status().isForbidden());

        mockMvc.perform(delete("/api/genres/delete/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());

        mockMvc.perform(get("/api/genres/get/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());

        mockMvc.perform(get("/api/genres/get/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }
}
