package ch.sbb.soundscore.SoundScore.dtos;

public class LoginUserDto {
    private String email;

    private String password;

    // getters and setters here...

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
