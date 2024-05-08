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
    private String title;
    private String content;
    private String image;
    private Long likes;
    private Long dislikes;
    @ManyToOne
    private User user;
    @ManyToOne
    private Genre genre;
    @ManyToOne
    private Artist artist;
    @ManyToOne
    private Song song;

    public Post(Long likes, Long dislikes, User user, Genre genre, Artist artist, Song song) {
        this.likes = likes;
        this.dislikes = dislikes;
        this.user = user;
        this.genre = genre;
        this.artist = artist;
        this.song = song;
    }
}
