package ch.sbb.soundscore.SoundScore.services;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OTPService {
    private final Random random = new SecureRandom();
    private final Map<String, String> otps = new HashMap<>();

    public String generateOTP(String key) {
        String otp = String.valueOf(100000 + random.nextInt(900000));
        otps.put(key, otp);
        return otp;
    }

    public boolean validateOTP(String key, String otp) {
        return otps.containsKey(key) && otps.get(key).equals(otp);
    }
}