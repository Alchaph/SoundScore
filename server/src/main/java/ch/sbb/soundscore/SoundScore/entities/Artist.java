package ch.sbb.soundscore.SoundScore.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "artists")
@Getter
@Setter
@NoArgsConstructor
public class Artist {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private String image;

    public Artist(String image, String description, String name) {
        this.image = image;
        this.description = description;
        this.name = name;
    }
}
