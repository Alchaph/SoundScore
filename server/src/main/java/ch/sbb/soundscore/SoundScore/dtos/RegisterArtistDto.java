package ch.sbb.soundscore.SoundScore.dtos;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data

public class RegisterArtistDto {

    private String name;
    private String description;
    private String image;

}
