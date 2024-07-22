package ch.sbb.soundscore.SoundScore.dtos;


import lombok.Data;

@Data
public class RegisterUserDto {
    private String email;

    private String password;

    private String username;

    public RegisterUserDto(String email, String password, String username) {
        this.email = email;
        this.password = password;
        this.username = username;
    }
}
