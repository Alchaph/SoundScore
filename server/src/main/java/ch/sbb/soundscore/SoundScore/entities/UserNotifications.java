package ch.sbb.soundscore.SoundScore.entities;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class UserNotifications {
    @Id
    @GeneratedValue
    Long id;

    @ManyToOne
    User receiver;

    @ManyToOne
    User sender;

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

    public UserNotifications(User receiver, User sender, @Nullable Post post, @Nullable Comment comment, @Nullable LikeOrDislike likeOrDislike) {
        this.receiver = receiver;
        this.post = post;
        this.comment = comment;
        this.likeOrDislike = likeOrDislike;
    }
}
