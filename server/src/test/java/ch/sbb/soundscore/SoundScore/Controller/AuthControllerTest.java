package ch.sbb.soundscore.SoundScore.Controller;

import ch.sbb.soundscore.SoundScore.controllers.AuthenticationController;
import ch.sbb.soundscore.SoundScore.dtos.*;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.services.AuthenticationService;
import ch.sbb.soundscore.SoundScore.services.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class AuthControllerTest {

    @InjectMocks
    private AuthenticationController authenticationController;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationService authenticationService;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(authenticationController).build();
    }

    @Test
    public void testRegister() throws Exception {
        RegisterUserDto registerUserDto = new RegisterUserDto("email", "password", "username");
        User user = new User();

        when(authenticationService.signup(any(RegisterUserDto.class))).thenReturn(user);

        mockMvc.perform(post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"testuser\",\"password\":\"password\"}"))
                .andExpect(status().isOk());
    }

    @Test
    public void testAuthenticate() throws Exception {
        LoginUserDto loginUserDto = new LoginUserDto("testuser", "password");
        User user = new User();
        String token = "jwtToken";

        when(authenticationService.authenticate(any(LoginUserDto.class))).thenReturn(user);
        when(jwtService.generateToken(any(User.class))).thenReturn(token);
        when(jwtService.getExpirationTime()).thenReturn(3600L);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"testuser\",\"password\":\"password\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value(token))
                .andExpect(jsonPath("$.expiresIn").value(3600));
    }

    @Test
    public void testVerifyPassword() throws Exception {
        when(authenticationService.verifyPassword("testuser", "password")).thenReturn(true);

        mockMvc.perform(post("/api/auth/verify-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"testuser\",\"password\":\"password\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }

    @Test
    public void testEmailExists() throws Exception {
        when(authenticationService.emailExists("test@example.com")).thenReturn(true);

        mockMvc.perform(get("/api/auth/email-exists/test@example.com"))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }

    @Test
    public void testUsernameExists() throws Exception {
        when(authenticationService.usernameExists("testuser")).thenReturn(true);

        mockMvc.perform(get("/api/auth/username-exists/testuser"))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }

    @Test
    public void testAuthenticateWithOTP() throws Exception {
        when(authenticationService.authenticateWithOTP(any(String.class))).thenReturn(true);

        mockMvc.perform(post("/api/auth/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"data\":\"otpData\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }

    @Test
    public void testVerifyOTP() throws Exception {
        when(authenticationService.verifyOTP("testuser", "123456")).thenReturn(true);

        mockMvc.perform(post("/api/auth/verify-Otp")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"testuser\",\"otp\":\"123456\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }

    @Test
    public void testGetUsernameByEmail() throws Exception {
        DataTransferDTO dto = new DataTransferDTO();
        dto.setData("testuser");
        when(authenticationService.getUsernameByEmail("test@example.com")).thenReturn(dto);

        mockMvc.perform(get("/api/auth/username-by-email/test@example.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").value("testuser"));
    }

    @Test
    public void testGetEmailByUsername() throws Exception {
        DataTransferDTO dto = new DataTransferDTO();
        dto.setData("test@example.com");
        when(authenticationService.getEmailByUsername("testuser")).thenReturn(dto);

        mockMvc.perform(get("/api/auth/email-by-username/testuser"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").value("test@example.com"));
    }

    @Test
    public void testUpdatePassword() throws Exception {
        User user = new User();
        UpdatePasswordDto updatePasswordDto = new UpdatePasswordDto("testuser", "password");

        when(authenticationService.updatePassword(any(UpdatePasswordDto.class))).thenReturn(user);

        mockMvc.perform(put("/api/auth/update-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"testuser\",\"oldPassword\":\"oldpassword\",\"newPassword\":\"newpassword\"}"))
                .andExpect(status().isOk());
    }

    @Test
    public void testDeleteAccount() throws Exception {
        User user = new User();

        when(authenticationService.deleteAccount("testuser")).thenReturn(user);

        mockMvc.perform(delete("/api/auth/delete-account/testuser"))
                .andExpect(status().isOk());
    }
}