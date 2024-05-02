package ch.sbb.soundscore.SoundScore.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "posts")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue
    private Long id;
    private Long likes;
    private Long dislikes;
    @ManyToOne
    private User fk_user;
    @ManyToOne
    private Genre fk_genre;
    @ManyToOne
    private Artist fk_artist;
    @ManyToOne
    private Song fk_song;

    public Post(Long likes, Long dislikes, User fk_user, Genre fk_genre, Artist fk_artist, Song fk_song) {
        this.likes = likes;
        this.dislikes = dislikes;
        this.fk_user = fk_user;
        this.fk_genre = fk_genre;
        this.fk_artist = fk_artist;
        this.fk_song = fk_song;
    }
}
