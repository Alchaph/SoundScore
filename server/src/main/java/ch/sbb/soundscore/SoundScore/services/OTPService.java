package ch.sbb.soundscore.SoundScore.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OTPService {
    private static final Logger log = LoggerFactory.getLogger(OTPService.class);
    private final Random random = new SecureRandom();
    private final Map<String, String> otps = new HashMap<>();

    public String generateOTP(String key) {
        String otp = String.valueOf(100000 + random.nextInt(900000));
        System.out.println("Generated OTP: " + otp);
        System.out.println("Generated OTP for: " + key);
        otps.put(key, otp);
        return otp;
    }

    public boolean validateOTP(String key, String otp) {
        return otps.containsKey(key) && otps.get(key).equals(otp);
    }
}