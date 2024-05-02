package ch.sbb.soundscore.SoundScore.Response;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {

    private String token;

    private long expiresIn;

}
