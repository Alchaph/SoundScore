package ch.sbb.soundscore.SoundScore.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OTPService {
    private static final Logger log = LoggerFactory.getLogger(OTPService.class);
    private static final long OTP_VALIDITY_MINUTES = 5;
    private static final int MAX_ATTEMPTS = 5;

    private final Random random = new SecureRandom();
    private final Map<String, OtpEntry> otps = new ConcurrentHashMap<>();
    private final Map<String, Integer> attempts = new ConcurrentHashMap<>();

    public String generateOTP(String key) {
        String otp = String.valueOf(100000 + random.nextInt(900000));
        otps.put(key, new OtpEntry(otp, Instant.now()));
        attempts.remove(key);
        log.debug("OTP generated for {}", key);
        return otp;
    }

    public boolean validateOTP(String key, String otp) {
        // Check max attempts
        int currentAttempts = attempts.getOrDefault(key, 0);
        if (currentAttempts >= MAX_ATTEMPTS) {
            otps.remove(key);
            attempts.remove(key);
            log.warn("Max OTP attempts exceeded for {}", key);
            return false;
        }
        attempts.put(key, currentAttempts + 1);

        OtpEntry entry = otps.get(key);
        if (entry == null) {
            return false;
        }

        // Check expiry
        if (Instant.now().isAfter(entry.createdAt.plusSeconds(OTP_VALIDITY_MINUTES * 60))) {
            otps.remove(key);
            attempts.remove(key);
            return false;
        }

        boolean valid = entry.otp.equals(otp);
        if (valid) {
            otps.remove(key);
            attempts.remove(key);
        }
        return valid;
    }

    private record OtpEntry(String otp, Instant createdAt) {}
}
