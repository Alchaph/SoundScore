package ch.sbb.soundscore.SoundScore.dtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data

public class LoginResponse {
    private String token;

    private long expiresIn;

}
