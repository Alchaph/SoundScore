package ch.sbb.soundscore.SoundScore.entities;

import jakarta.annotation.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class UserTag {
    @GeneratedValue
    @Id
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private User taggedUser;

    @Nullable
    @ManyToOne
    private Post post;

    @Nullable
    @ManyToOne
    private Comment comment;

    public UserTag(User user, User taggedUser, Post post, Comment comment) {
        this.user = user;
        this.taggedUser = taggedUser;
        this.post = post;
        this.comment = comment;
    }

}
