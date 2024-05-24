package ch.sbb.soundscore.SoundScore.entities.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "genres")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Genre {
    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String name;

    private String description;

    public Genre(String description, String name) {
        this.description = description;
        this.name = name;
    }
}
