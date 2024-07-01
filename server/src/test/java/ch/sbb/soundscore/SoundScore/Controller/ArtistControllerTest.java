package ch.sbb.soundscore.SoundScore.Controller;

import ch.sbb.soundscore.SoundScore.entities.Artist;
import ch.sbb.soundscore.SoundScore.services.ArtistService;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ArtistControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ArtistService artistService;



    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldCreateNewSong() throws Exception {
        Artist artist = new Artist();
        artist.setId(1L);
        when(artistService.createArtist(any(Artist.class))).thenReturn(artist);
        mockMvc.perform(post("/api/artist/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(artist)))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldUpdateArtist() throws Exception {
        Artist artist = new Artist();
        artist.setId(1L);
        when(artistService.editArtist(any(Artist.class))).thenReturn(artist);
        mockMvc.perform(put("/api/artist/edit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(artist)))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldDeleteArtist() throws Exception {
        Artist artist = new Artist();
        artist.setId(1L);
        when(artistService.getArtistById(1L)).thenReturn(artist);
        mockMvc.perform(delete("/api/artist/delete/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldGetArtistById() throws Exception {
        Artist artist = new Artist();
        artist.setId(1L);
        when(artistService.getArtistById(1L)).thenReturn(artist);
        mockMvc.perform(get("/api/artist/get/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldGetAllArtists() throws Exception {
        Artist artist1 = new Artist();
        artist1.setId(1L);
        Artist artist2 = new Artist();
        artist2.setId(2L);
        List<Artist> artists = Arrays.asList(artist1, artist2);
        when(artistService.getAllArtists()).thenReturn(artists);
        mockMvc.perform(get("/api/artist/get/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[1].id").value(2));
    }

    @Test
    void shouldNotPerformArtistOperations() throws Exception {
        Artist artist = new Artist();
        artist.setId(1L);
        mockMvc.perform(post("/api/artist/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(artist)))
                .andExpect(status().isForbidden());

        mockMvc.perform(put("/api/artist/edit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(artist)))
                .andExpect(status().isForbidden());

        mockMvc.perform(delete("/api/artist/delete/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());

        mockMvc.perform(get("/api/artist/get/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());

        mockMvc.perform(get("/api/artist/get/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }
}
