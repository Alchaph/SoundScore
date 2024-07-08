package ch.sbb.soundscore.SoundScore.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "likes_and_dislikes")
@Getter
@Setter
@NoArgsConstructor
public class LikeOrDislike {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Post post;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    private boolean isLike;

    public LikeOrDislike(Post post, User user, boolean isLike) {
        this.post = post;
        this.user = user;
        this.isLike = isLike;
    }
}
