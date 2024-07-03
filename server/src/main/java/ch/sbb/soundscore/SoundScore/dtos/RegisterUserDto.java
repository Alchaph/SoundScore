package ch.sbb.soundscore.SoundScore.dtos;

public class RegisterUserDto {
    private String email;

    private String password;

    private String userName;

    // getters and setters here...

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getUserName() {
        return userName;
    }
}
