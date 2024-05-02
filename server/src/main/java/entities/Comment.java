package entities;

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
    private Post fk_post;
    @ManyToOne
    private User fk_user;

    public Comment(String title, String message, Post fk_post, User fk_user) {
        this.title = title;
        this.message = message;
        this.fk_post = fk_post;
        this.fk_user = fk_user;
    }
}
