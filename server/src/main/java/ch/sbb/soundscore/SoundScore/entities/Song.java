package ch.sbb.soundscore.SoundScore.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @Column(columnDefinition = "LONGTEXT")
    private String image;
    @Column(columnDefinition = "LONGTEXT")
    private String link;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Genre genre;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private Artist artist;

    public Song(String title, String image, String link, Genre genre, Artist artist) {
        this.title = title;
        this.image = image;
        this.link = link;
        this.genre = genre;
        this.artist = artist;
    }
}
