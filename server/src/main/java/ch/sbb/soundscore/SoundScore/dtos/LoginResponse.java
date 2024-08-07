package ch.sbb.soundscore.SoundScore.dtos;

import lombok.Data;

@Data

public class LoginResponse {
    private String token;

    private long expiresIn;

}
