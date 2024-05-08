package ch.sbb.soundscore.SoundScore.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "comments")
@Getter
@Setter
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String message;
    @ManyToOne
    private Post post;
    @ManyToOne
    private User user;

    public Comment(String title, String message, Post post, User user) {
        this.title = title;
        this.message = message;
        this.post = post;
        this.user = user;
    }
}
