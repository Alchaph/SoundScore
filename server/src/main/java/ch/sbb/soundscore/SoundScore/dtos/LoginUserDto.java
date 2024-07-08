package ch.sbb.soundscore.SoundScore.dtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data

public class LoginUserDto {
    private String username;

    private String password;
}
