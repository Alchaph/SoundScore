package ch.sbb.soundscore.SoundScore.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class EmailDTO {
    private String email;

    public EmailDTO(String email) {
        this.email = email;
    }
}
