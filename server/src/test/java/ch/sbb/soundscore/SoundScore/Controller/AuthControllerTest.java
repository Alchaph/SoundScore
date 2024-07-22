package ch.sbb.soundscore.SoundScore.Controller;

import ch.sbb.soundscore.SoundScore.dtos.LoginUserDto;
import ch.sbb.soundscore.SoundScore.dtos.RegisterUserDto;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.services.AuthenticationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
@TestPropertySource(locations = "classpath:application-test.properties")
public class AuthControllerTest {
    @Autowired
    MockMvc mockMvc;
    RegisterUserDto registerUserDto;
    LoginUserDto loginUserDto;
    String registerUserDtoAsJson;
    String loginUserDtoAsJson;
    @Mock
    AuthenticationService authenticationService;

    @BeforeEach
    public void setUp() {
        registerUserDto = new RegisterUserDto("test", "test", "test");
        loginUserDto = new LoginUserDto("test", "test");
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        try {
            registerUserDtoAsJson = ow.writeValueAsString(registerUserDto);
            loginUserDtoAsJson = ow.writeValueAsString(loginUserDto);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }


    @DirtiesContext
    @Transactional
    @Test
    void register() throws Exception {
        doReturn(new User("test","test","test", null)).when(authenticationService).signup(registerUserDto);
        mockMvc.perform(post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registerUserDtoAsJson)
                )
                .andExpect(status().isOk());
    }

    @DirtiesContext
    @Transactional
    @Test
    void authenticate() throws Exception {
        mockMvc.perform(post("/api/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginUserDtoAsJson)
                )
                .andExpect(status().isOk());
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registerUserDtoAsJson)
                )
                .andExpect(status().isOk())
                .andExpect(result ->
                        result.getResponse()
                                .getContentAsString()
                                .contains("token"));
    }

}
