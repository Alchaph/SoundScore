package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.entities.Artist;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.repositories.UserNotificationsRepository;
import ch.sbb.soundscore.SoundScore.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserNotificationsRepository userNotificationsRepository;

    @Mock
    private UserDetails userDetails;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        userService = new UserService(userRepository, passwordEncoder, userNotificationsRepository);

        when(userDetails.getUsername()).thenReturn("testuser");
    }

    @Test
    public void testAllUsers() {
        User user1 = new User();
        user1.setId(1L);
        User user2 = new User();
        user2.setId(2L);
        when(userRepository.findAll()).thenReturn(Arrays.asList(user1, user2));
        when(userNotificationsRepository.getUserNotificationsByUserId(anyLong())).thenReturn(new ArrayList<>());

        List<User> users = userService.allUsers();

        assertEquals(2, users.size());
        verify(userNotificationsRepository, times(2)).getUserNotificationsByUserId(anyLong());
    }

    @Test
    public void testUpdateUser() {
        User user = new User();
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);
        Artist artist = new Artist();

        User updatedUser = userService.updateUser(artist, userDetails);

        assertEquals(artist, updatedUser.getArtist());
        verify(userRepository).save(user);
    }

    @Test
    public void testUpdateUsers() {
        User user = new User();
        user.setPassword("oldPassword");
        when(passwordEncoder.encode("oldPassword")).thenReturn("encodedPassword");
        when(userRepository.save(user)).thenReturn(user);

        User updatedUser = userService.updateUsers(user);

        assertEquals("encodedPassword", updatedUser.getPassword());
        verify(userRepository).save(user);
    }

    @Test
    public void testGetUserById() {
        User user = new User();
        user.setId(1L);
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(userNotificationsRepository.getUserNotificationsByUserId(1L)).thenReturn(new ArrayList<>());

        User foundUser = userService.getUserById(1);

        assertEquals(1, foundUser.getId());
        verify(userNotificationsRepository).getUserNotificationsByUserId(1L);
    }

    @Test
    public void testGetUserByArtistId() {
        User user = new User();
        when(userRepository.getUserByArtistId(1)).thenReturn(user);

        User foundUser = userService.getUserByArtistId(1);

        assertEquals(user, foundUser);
    }

    @Test
    public void testDeleteUser() {
        User user = new User();
        User user0 = new User();
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(userRepository.findById(0)).thenReturn(Optional.of(user0));

        User deletedUser = userService.deleteUser(userDetails);

        assertEquals(user, deletedUser);
        verify(userRepository).createUser0IfNotExists();
        verify(userRepository).UpdateUsersPosts(user, user0);
        verify(userRepository).UpdateUsersLikes(user, user0);
        verify(userRepository).UpdateUsersComments(user, user0);
        verify(userRepository).UpdateUsersFollowersFollower(user, user0);
        verify(userRepository).UpdateUsersFollowersUser(user, user0);
        verify(userRepository).updateUsersNotificationsSender(user, user0);
        verify(userRepository).deleteUser(user);
    }
}