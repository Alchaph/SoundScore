package ch.sbb.soundscore.SoundScore.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "replies")
@Getter
@Setter
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Reply extends Comment {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    private Comment comment;

    public Reply(String title, String message, Post post, User user, Comment comment) {
        super(title, message, post, user);
        this.comment = comment;
    }
}
