package ch.sbb.soundscore.SoundScore.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @Column(columnDefinition = "LONGTEXT")
    private String image;
    private Long likes;
    private Long dislikes;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Genre genre;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Artist artist;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
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
