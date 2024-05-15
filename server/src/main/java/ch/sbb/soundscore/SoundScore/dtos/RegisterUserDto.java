package ch.sbb.soundscore.SoundScore.dtos;

public class RegisterUserDto {
    private String email;

    private String password;

    private String fullName;

    // getters and setters here...

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getFullName() {
        return fullName;
    }
}
