package ch.sbb.soundscore.SoundScore.Controller;

import ch.sbb.soundscore.SoundScore.controllers.UserNotificationController;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.entities.UserNotifications;
import ch.sbb.soundscore.SoundScore.repositories.UserNotificationsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class UserNotificationControllerTest {

    @InjectMocks
    private UserNotificationController userNotificationController;

    @Mock
    private UserNotificationsRepository userNotificationsRepository;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userNotificationController).build();
    }

    @Test
    public void testMarkAsRead() throws Exception {
        UserNotifications notification = new UserNotifications();
        notification.setId(1L);
        notification.setRead(false);

        when(userNotificationsRepository.findById(1L)).thenReturn(Optional.of(notification));
        when(userNotificationsRepository.save(any(UserNotifications.class))).thenReturn(notification);

        mockMvc.perform(put("/api/notifications/markAsRead/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(notification.getId()))
                .andExpect(jsonPath("$.read").value(true));
    }

    @Test
    public void testMarkAllAsRead() throws Exception {
        User user = new User();
        user.setId(1L);

        UserNotifications notification = new UserNotifications();
        notification.setId(1L);
        notification.setRead(false);
        notification.setUser(user);

        when(userNotificationsRepository.findAll()).thenReturn(Collections.singletonList(notification));
        when(userNotificationsRepository.save(any(UserNotifications.class))).thenReturn(notification);

        mockMvc.perform(put("/api/notifications/markAllAsRead")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\":1,\"username\":\"testuser\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(notification.getId()))
                .andExpect(jsonPath("$[0].read").value(true));
    }
}