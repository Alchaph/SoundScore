package entities;

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
    private String title;
    private String image;
    private String link;
    @ManyToOne
    private Genre fk_genre;
    @ManyToOne
    private Artist fk_artist;

    public Song(String title, String image, String link, Genre fk_genre, Artist fk_artist) {
        this.title = title;
        this.image = image;
        this.link = link;
        this.fk_genre = fk_genre;
        this.fk_artist = fk_artist;
    }
}
