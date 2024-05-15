package ch.sbb.soundscore.SoundScore.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "songs")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Song {
    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String title;

    private String image;
    private String link;
    @ManyToOne
    private Genre genre;
    @ManyToOne
    private Artist artist;

    public Song(String title, String image, String link, Genre genre, Artist artist) {
        this.title = title;
        this.image = image;
        this.link = link;
        this.genre = genre;
        this.artist = artist;
    }
}
