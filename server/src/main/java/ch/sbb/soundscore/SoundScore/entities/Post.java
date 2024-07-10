package ch.sbb.soundscore.SoundScore.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

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
    @Transient
    private List<LikeOrDislike> likes;
    @Transient
    private List<LikeOrDislike> dislikes;
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

    public Post(User user, Genre genre, Artist artist, Song song) {
        this.user = user;
        this.genre = genre;
        this.artist = artist;
        this.song = song;
    }
}
