package ch.sbb.soundscore.SoundScore.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDto {
    String password;
    String username;

    public LoginDto(String password, String username) {
        this.password = password;
        this.username = username;
    }
}
