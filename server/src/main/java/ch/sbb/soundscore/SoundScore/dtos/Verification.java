package ch.sbb.soundscore.SoundScore.dtos;

public class Verification {
    private String username;
    private String otp;

    // getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }
}