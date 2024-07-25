package ch.sbb.soundscore.SoundScore.Controller;

import ch.sbb.soundscore.SoundScore.controllers.SongController;
import ch.sbb.soundscore.SoundScore.entities.Song;
import ch.sbb.soundscore.SoundScore.services.SongService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class SongControllerTest {

    @Mock
    private SongService songService;

    @InjectMocks
    private SongController songController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(songController).build();
    }

    @Test
    public void testCreateEditSong_Positive() throws Exception {
        Song song = new Song();
        song.setId(1L);
        song.setTitle("Test Song");

        when(songService.createEditSong(any(Song.class))).thenReturn(song);

        mockMvc.perform(post("/api/songs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\": \"Test Song\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.title").value("Test Song"));
    }

    @Test
    public void testUpdateSong_Positive() throws Exception {
        Song song = new Song();
        song.setId(1L);
        song.setTitle("Updated Song");

        when(songService.editSong(any(Song.class))).thenReturn(song);

        mockMvc.perform(put("/api/songs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\": 1, \"title\": \"Updated Song\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.title").value("Updated Song"));
    }

    @Test
    public void testDeleteSong_Positive() throws Exception {
        Song song = new Song();
        song.setId(1L);
        song.setTitle("Deleted Song");

        when(songService.deleteSong(anyLong())).thenReturn(song);

        mockMvc.perform(delete("/api/songs/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.title").value("Deleted Song"));
    }

    @Test
    public void testGetSongById_Positive() throws Exception {
        Song song = new Song();
        song.setId(1L);
        song.setTitle("Test Song");

        when(songService.getSongById(anyLong())).thenReturn(song);

        mockMvc.perform(get("/api/songs/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.title").value("Test Song"));
    }

    @Test
    public void testGetAllSongs_Positive() throws Exception {
        Song song1 = new Song();
        song1.setId(1L);
        song1.setTitle("Test Song 1");

        Song song2 = new Song();
        song2.setId(2L);
        song2.setTitle("Test Song 2");

        List<Song> songs = Arrays.asList(song1, song2);

        when(songService.getAllSongs()).thenReturn(songs);

        mockMvc.perform(get("/api/songs/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].title").value("Test Song 1"))
                .andExpect(jsonPath("$[1].id").value(2L))
                .andExpect(jsonPath("$[1].title").value("Test Song 2"));
    }
}