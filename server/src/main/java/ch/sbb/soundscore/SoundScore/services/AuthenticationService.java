package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.dtos.LoginUserDto;
import ch.sbb.soundscore.SoundScore.dtos.RegisterArtistDto;
import ch.sbb.soundscore.SoundScore.dtos.RegisterUserDto;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.entities.Artist;
import ch.sbb.soundscore.SoundScore.repositories.ArtistRepository;
import ch.sbb.soundscore.SoundScore.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;


    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(RegisterUserDto input) { //TODO userName is email
        User user = new User();
        user.setUsername(input.getUsername());
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));

        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input) {
        System.out.println("Hallo");
        System.out.println(input.getEmail());
        System.out.println(input.getPassword());
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );
        System.out.println("Hallo2");
        return userRepository.findByEmail(input.getEmail())
                .orElseThrow();
    }

    public boolean verifyPassword(String email, String password) {
//        System.out.println(userRepository.findByEmail(email).map(User::getPassword).orElseThrow());
//        System.out.println(passwordEncoder.encode(password));
        return passwordEncoder.encode(password).equals(userRepository.findByEmail(email).map(User::getPassword).orElseThrow());
    }
}
