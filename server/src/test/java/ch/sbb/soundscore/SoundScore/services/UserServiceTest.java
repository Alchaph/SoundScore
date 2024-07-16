package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.entities.Artist;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void allUsers_ShouldReturnUsers_WhenUsersExist() {
        // Given
        User user1 = new User(); // Assume User has an id different from 0
        user1.setId(1L);
        User user2 = new User();// Same here
        user2.setId(2L);
        when(userRepository.findAll()).thenReturn(Arrays.asList(user1, user2));

        // When
        List<User> result = userService.allUsers();

        // Then
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(userRepository).findAll();
    }

    @DirtiesContext
    @Transactional
    @Test
    void updateUser_ShouldUpdateUser_WhenUserExists() {
        // Given
        Artist artist = new Artist(); // setup artist
        UserDetails userDetails = mock(UserDetails.class);
        User user = new User();
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        // When
        User updatedUser = userService.updateUser(artist, userDetails);

        // Then
        assertEquals(artist, updatedUser.getArtist());
        verify(userRepository).findByUsername(anyString());
        verify(userRepository).save(any(User.class));
    }

    @DirtiesContext
    @Transactional
    @Test
    void updateUsers_ShouldEncodePasswordAndSaveUser_WhenGivenUser() {
        // Given
        User user = new User();
        user.setPassword("plainPassword");
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");

        // When
        User updatedUser = userService.updateUsers(user);

        // Then
        assertEquals("encodedPassword", updatedUser.getPassword());
        verify(passwordEncoder).encode("plainPassword");
        verify(userRepository).save(user);
    }

    @Test
    void getUserById_ShouldThrowException_WhenIdIsZero() {
        // When & Then
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            userService.getUserById(0);
        });

        assertEquals("Id must not be 0", exception.getMessage());
    }

    @Test
    void getUserById_ShouldReturnUser_WhenUserExists() {
        // Given
        User user = new User();
        when(userRepository.findById(1)).thenReturn(Optional.of(user));

        // When
        User foundUser = userService.getUserById(1);

        // Then
        assertNotNull(foundUser);
        verify(userRepository).findById(1);
    }

    @DirtiesContext
    @Transactional
    @Test
    void deleteUser_ShouldDeleteUser_WhenUserExists() {
        // Given
        User user = new User();
        user.setUsername("username");
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        User user0 = new User();
        when(userRepository.findById(0)).thenReturn(Optional.of(user0));

        // When
        User deletedUser = userService.deleteUser(any(User.class));

        // Then
        assertNotNull(deletedUser);
        verify(userRepository).findByUsername("username");
        verify(userRepository).findById(0);
        verify(userRepository).deleteUser(any(User.class));

    }

    // Add more tests for other methods and edge cases.
}

