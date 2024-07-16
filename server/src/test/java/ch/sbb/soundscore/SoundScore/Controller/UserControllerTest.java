package ch.sbb.soundscore.SoundScore.Controller;

import ch.sbb.soundscore.SoundScore.entities.Artist;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @BeforeEach
    void setUp() {
        User user1 = new User("test", "test", "test", null);
        user1.setUsername("user1");
        User user2 = new User("test", "test", "test", null);
        user2.setUsername("user2");
        List<User> users = Arrays.asList(user1, user2);
        given(userService.allUsers()).willReturn(users);
    }

    @Test
    @WithMockUser
    @Transactional
    @DirtiesContext
    void shouldGetAllUsers() throws Exception {
        mockMvc.perform(get("/api/users/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].username", Matchers.is("user1")))
                .andExpect(jsonPath("$[1].username", Matchers.is("user2")));
    }

    @Test
    void shouldNotGetAllUsers() throws Exception {
        mockMvc.perform(get("/api/users/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "user1")
    void shouldGetUserById() throws Exception {
        given(userService.getUserById(1)).willReturn(new User("user1", "test", "test", null));
        mockMvc.perform(get("/api/users/user/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", Matchers.is("user1")));
    }

    @Test
    @WithMockUser(username = "user1")
    void shouldGetMe() throws Exception {
        mockMvc.perform(get("/api/users/me")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.username", Matchers.is("user1")));
    }

    @Test
    @WithMockUser(username = "user1")
    void shouldGetUserByArtistId() throws Exception {
        given(userService.getUserByArtistId(1)).willReturn(new User("user1", " test", "test", null));
        mockMvc.perform(get("/api/users/getByArtistId/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", Matchers.is("user1")));
    }

    @Test
    @WithMockUser(username = "user1")
    @Transactional
    @DirtiesContext
    void shouldUpdateUser() throws Exception {
        User user = new User("user2", "test", "test", null);
        given(userService.updateUsers(user)).willReturn(user);
        mockMvc.perform(put("/api/users")
                        .contentType(MediaType.APPLICATION_JSON).content(
                                new ObjectMapper().writeValueAsString(user)
                        ))
                .andExpect(status().isOk())
        ;
    }

    @Test
    @WithMockUser(username = "user1")
    @Transactional
    @DirtiesContext
    void shouldDeleteUser() throws Exception {
        mockMvc.perform(delete("/api/users")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "user1")
    @Transactional
    @DirtiesContext
    void shouldRegisterArtist() throws Exception {
        User user = new User("user1", "test", "test", null);
        given(userService.updateUser(new Artist("", "", "sus"), user)).willReturn(new User("user1", "test", "test", new Artist("", "", "sus")));
        mockMvc.perform(put("/api/users/register-artist")
                        .contentType(MediaType.APPLICATION_JSON).content(
                                new ObjectMapper().writeValueAsString(new Artist("123123", "123123", "Travis"))
                        ))
                .andExpect(status().isOk());
    }
}