package ch.sbb.soundscore.SoundScore.entities;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.bind.DefaultValue;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class UserNotifications {
    @Id
    @GeneratedValue
    Long id;

    @ManyToOne
    User user;

    @Nullable
    @ManyToOne
    Post post;

    @Nullable
    @ManyToOne
    Comment comment;

    @Nullable
    @ManyToOne
    LikeOrDislike likeOrDislike;

    @Column(name = "`read`")
    boolean read;

    public UserNotifications(User user, @Nullable Post post, @Nullable Comment comment, @Nullable LikeOrDislike likeOrDislike) {
        this.user = user;
        this.post = post;
        this.comment = comment;
        this.likeOrDislike = likeOrDislike;
    }
}
