package ch.sbb.soundscore.SoundScore.dtos;

public class UpdatePasswordDto {
    private String email;
    private String password;

    public UpdatePasswordDto(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
