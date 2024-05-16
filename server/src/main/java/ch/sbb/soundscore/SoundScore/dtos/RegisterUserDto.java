package ch.sbb.soundscore.SoundScore.dtos;

public class RegisterUserDto {
    private String email;

    private String password;

    private String username;

    // getters and setters here...

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }
}
