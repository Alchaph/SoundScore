package ch.sbb.soundscore.SoundScore.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DataTransferDTO {
    private String data;

    public DataTransferDTO(String data) {
        this.data = data;
    }
}
