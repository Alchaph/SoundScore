package ch.sbb.soundscore.SoundScore.Controller;

import ch.sbb.soundscore.SoundScore.entities.Song;
import ch.sbb.soundscore.SoundScore.services.SongService;
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
public class SongControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SongService songService;



    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldCreateNewSong() throws Exception {
        Song song = new Song();
        song.setId(1L);
        when(songService.createEditSong(any(Song.class))).thenReturn(song);
        mockMvc.perform(post("/api/songs/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(song)))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldUpdateSong() throws Exception {
        Song song = new Song();
        song.setId(1L);
        when(songService.editSong(any(Song.class))).thenReturn(song);
        mockMvc.perform(put("/api/songs/edit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(song)))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldDeleteSong() throws Exception {
        Song song = new Song();
        song.setId(1L);
        when(songService.getSongById(1L)).thenReturn(song);
        mockMvc.perform(delete("/api/songs/delete/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldGetSongById() throws Exception {
        Song song = new Song();
        song.setId(1L);
        when(songService.getSongById(1L)).thenReturn(song);
        mockMvc.perform(get("/api/songs/get/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldGetAllSongs() throws Exception {
        Song song1 = new Song();
        song1.setId(1L);
        Song song2 = new Song();
        song2.setId(2L);
        List<Song> songs = Arrays.asList(song1, song2);
        when(songService.getAllSongs()).thenReturn(songs);
        mockMvc.perform(get("/api/songs/get/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[1].id").value(2));
    }

    @Test

    void shouldNotPerformSongOperations() throws Exception {
        Song song = new Song();
        song.setId(1L);
        mockMvc.perform(post("/api/songs/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(song)))
                .andExpect(status().isForbidden());

        mockMvc.perform(put("/api/songs/edit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(song)))
                .andExpect(status().isForbidden());

        mockMvc.perform(delete("/api/songs/delete/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());

        mockMvc.perform(get("/api/songs/get/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());

        mockMvc.perform(get("/api/songs/get/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }
}
