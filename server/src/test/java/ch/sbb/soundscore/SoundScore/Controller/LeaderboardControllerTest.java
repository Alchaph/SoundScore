package ch.sbb.soundscore.SoundScore.Controller;

import ch.sbb.soundscore.SoundScore.services.LeaderboardService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
public class LeaderboardControllerTest {
    @Autowired
    MockMvc mockMvc;


    @MockBean
    private LeaderboardService leaderboardService;

    @Test
    @WithMockUser
    void testGetSongRanking() throws Exception {
        mockMvc.perform(get("/api/leaderboard/song")).andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void testGetGenreRanking() throws Exception {
        mockMvc.perform(get("/api/leaderboard/genre")).andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void testGetArtistRanking() throws Exception {
        mockMvc.perform(get("/api/leaderboard/artist")).andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void testGetPostRanking() throws Exception {
        mockMvc.perform(get("/api/leaderboard/all")).andExpect(status().isOk());
    }
}
