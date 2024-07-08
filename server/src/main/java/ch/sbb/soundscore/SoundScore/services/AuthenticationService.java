package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.dtos.LoginUserDto;
import ch.sbb.soundscore.SoundScore.dtos.RegisterUserDto;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.repositories.UserRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;

    private final OTPService otpService;
    private final JavaMailSender mailSender;


    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public boolean authenticateWithOTP(String username) {
        String otp = otpService.generateOTP(username);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(username);
        message.setSubject("Your 2FA Code");
        message.setText("Your Code is " + otp);
        mailSender.send(message);
        return true;
    }

    public boolean verifyOTP(String username, String otp) {
        return otpService.validateOTP(username, otp);
    }


    public AuthenticationService(
            UserRepository userRepository, OTPService otpService, JavaMailSender mailSender,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.otpService = otpService;
        this.mailSender = mailSender;
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(RegisterUserDto input) {
        User user = new User();
        user.setUsername(input.getUsername());
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));

        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getUsername(),
                        input.getPassword()
                )
        );
        return userRepository.findByUsername(input.getUsername())
                .orElseThrow();
    }

    public boolean verifyPassword(String username, String password) {
        User user = userRepository.findByUsername(username).orElseThrow();
        return passwordEncoder.matches(password, user.getPassword());
    }

    public boolean emailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public String getUsernameByEmail(String email) {
        return userRepository.findByEmail(email).map(User::getUsername).orElseThrow();
    }

    public String getEmailByUsername(String username) {
        return userRepository.findByUsername(username).map(User::getEmail).orElseThrow();
    }
}