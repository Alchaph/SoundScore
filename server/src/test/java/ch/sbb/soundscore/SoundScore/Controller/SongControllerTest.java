package ch.sbb.soundscore.SoundScore.Controller;

import ch.sbb.soundscore.SoundScore.entities.Song;
import ch.sbb.soundscore.SoundScore.services.SongService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
@AutoConfigureMockMvc
public class SongControllerTest {

    Song song1 = new Song("title", "picture", "audio", null, null);
    Song song2 = new Song("title", "picture", "audio", null, null);
    @Autowired
    private MockMvc mockMvc;
    @Mock
    private SongService songService;

    @BeforeEach
    void setUp() {
        song1 = songService.createEditSong(song1);
        song2 = songService.createEditSong(song2);
    }


    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldCreateNewSong() throws Exception {
        Song song = new Song();
        song.setId(1L);
        when(songService.createEditSong(any(Song.class))).thenReturn(song);
        mockMvc.perform(post("/api/songs").contentType(MediaType.APPLICATION_JSON).content(new ObjectMapper().writeValueAsString(song))).andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldUpdateSong() throws Exception {
        Song song = song1;
        song.setTitle("new title");
        mockMvc.perform(put("/api/songs").contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(song)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("new title"));
    }

    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldDeleteSong() throws Exception {
        mockMvc.perform(delete("/api/songs/1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(jsonPath("$.id").value(song1.getId()));
    }

    @Test
    @WithMockUser
    void shouldGetSongById() throws Exception {
        mockMvc.perform(get("/api/songs/" + song1.getId()).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(jsonPath("$.id").value(song1.getId()));
    }

    @Test
    @WithMockUser
    void shouldGetAllSongs() throws Exception {
        List<Song> songs = List.of(song1, song2);
        mockMvc.perform(get("/api/songs/all").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(songs.size()))).andExpect(jsonPath("$[0].id").value(songs.get(0).getId())).andExpect(jsonPath("$[1].id").value(songs.get(1).getId())).andReturn();
    }

    @Test
    void shouldNotPerformSongOperations() throws Exception {
        Song song = new Song();
        song.setId(1L);
        mockMvc.perform(post("/api/songs/create").contentType(MediaType.APPLICATION_JSON).content(new ObjectMapper().writeValueAsString(song))).andExpect(status().isForbidden());

        mockMvc.perform(put("/api/songs/edit").contentType(MediaType.APPLICATION_JSON).content(new ObjectMapper().writeValueAsString(song))).andExpect(status().isForbidden());

        mockMvc.perform(delete("/api/songs/delete/1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isForbidden());

        mockMvc.perform(get("/api/songs/get/1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isForbidden());

        mockMvc.perform(get("/api/songs/get/all").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isForbidden());
    }
}
