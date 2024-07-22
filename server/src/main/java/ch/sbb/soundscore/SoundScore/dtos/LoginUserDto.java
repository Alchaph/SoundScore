package ch.sbb.soundscore.SoundScore.dtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data

public class LoginUserDto {
    private String username;

    private String password;

    public LoginUserDto(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
