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

    @Nullable
    @ManyToOne
    UserFollower userFollower;

    @Nullable
    @ManyToOne
    UserTag userTag;

    @Column(name = "`read`")
    boolean read;

    public UserNotifications(User receiver, User sender, Post post, Comment comment, LikeOrDislike likeOrDislike, UserFollower userFollower, UserTag userTag) {
        this.receiver = receiver;
        this.sender = sender;
        this.post = post;
        this.comment = comment;
        this.likeOrDislike = likeOrDislike;
        this.userFollower = userFollower;
        this.userTag = userTag;
        this.read = false;
    }
}
