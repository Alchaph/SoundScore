package ch.sbb.soundscore.SoundScore.controllers;


import ch.sbb.soundscore.SoundScore.dtos.*;

import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.services.AuthenticationService;
import ch.sbb.soundscore.SoundScore.services.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/verify/password")
    public ResponseEntity<Boolean> verifyPassword(@RequestBody LoginUserDto user) {
        return ResponseEntity.ok(authenticationService.verifyPassword(user.getUsername(), user.getPassword()));
    }

    @GetMapping("/email-exists/{email}")
    public ResponseEntity<Boolean> emailExists(@PathVariable String email) {
        return ResponseEntity.ok(authenticationService.emailExists(email));
    }
    @PostMapping("/authenticate")
    public boolean authenticate(@RequestBody EmailDTO user) {
        return authenticationService.authenticateWithOTP(user.getEmail());
    }

    @PostMapping("/verify/Otp")
    public boolean verify(@RequestBody Verification verification) {
        return authenticationService.verifyOTP(verification.getUserName(), verification.getOtp());
    }

    @GetMapping("/username/by/email/{email}")
    public ResponseEntity<String> getUsernameByEmail(@PathVariable String email) {
        System.out.println(email);
        return ResponseEntity.ok(authenticationService.getUsernameByEmail(email));
    }

}

