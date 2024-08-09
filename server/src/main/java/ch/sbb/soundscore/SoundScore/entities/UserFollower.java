package ch.sbb.soundscore.SoundScore.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class UserFollower {
    @Id
    @GeneratedValue
    Long id;

    @ManyToOne
    User user;

    @ManyToOne
    User follower;

    public UserFollower(User user, User follower) {
        this.user = user;
        this.follower = follower;
    }
}
