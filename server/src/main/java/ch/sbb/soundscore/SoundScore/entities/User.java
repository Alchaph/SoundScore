package ch.sbb.soundscore.SoundScore.entities;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Date;
import java.util.Collection;
import java.util.List;

@Table(name = "users")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue
    private Long id;
    private String username;
    private String password;
    private String email;
    private String tel;
    private Date created;
    @ManyToOne
    @Nullable
    private Artist fk_artist;
    @Column(nullable = false)
    private boolean isAccountNonExpired;
    @Column(nullable = false)
    private boolean isAccountNonLocked;
    @Column(nullable = false)
    private boolean isCredentialsNonExpired;
    @Column(nullable = false)
    private boolean isEnabled;

    public User(String username, String password, String email, String tel, Date created, Artist fk_artist) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.tel = tel;
        this.created = created;
        this.fk_artist = fk_artist;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
