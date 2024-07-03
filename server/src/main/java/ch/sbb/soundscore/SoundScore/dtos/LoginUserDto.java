package ch.sbb.soundscore.SoundScore.dtos;

public class LoginUserDto {
    private String userName;

    private String password;

    // getters and setters here...

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }
}
