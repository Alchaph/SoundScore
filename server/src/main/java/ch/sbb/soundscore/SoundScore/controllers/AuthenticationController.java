package ch.sbb.soundscore.SoundScore.controllers;


import ch.sbb.soundscore.SoundScore.dtos.*;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.services.AuthenticationService;
import ch.sbb.soundscore.SoundScore.services.JwtService;
import org.hibernate.internal.build.AllowNonPortable;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/verify-password")
    public ResponseEntity<Boolean> verifyPassword(@RequestBody LoginUserDto user) {
        return ResponseEntity.ok(authenticationService.verifyPassword(user.getUsername(), user.getPassword()));
    }

    @GetMapping("/email-exists/{email}")
    public ResponseEntity<Boolean> emailExists(@PathVariable String email) {
        return ResponseEntity.ok(authenticationService.emailExists(email));
    }

    @GetMapping("/username-exists/{username}")
    public ResponseEntity<Boolean> usernameExists(@PathVariable String username) {
        return ResponseEntity.ok(authenticationService.usernameExists(username));
    }

    @PostMapping("/authenticate")
    public boolean authenticate(@RequestBody DataTransferDTO user) {
        return authenticationService.authenticateWithOTP(user.getData());
    }

    @PostMapping("/verify-Otp")
    public boolean verify(@RequestBody Verification verification) {
        return authenticationService.verifyOTP(verification.getUsername(), verification.getOtp());
    }

    @GetMapping("/username-by-email/{email}")
    public ResponseEntity<DataTransferDTO> getUsernameByEmail(@PathVariable String email) {
        return ResponseEntity.ok(authenticationService.getUsernameByEmail(email));
    }

    @GetMapping("/email-by-username/{username}")
    public ResponseEntity<DataTransferDTO> getEmailByUsername(@PathVariable String username) {
        return ResponseEntity.ok(authenticationService.getEmailByUsername(username));
    }

    @PutMapping("/update-password")
    public ResponseEntity<User> updatePassword(@RequestBody UpdatePasswordDto updatePasswordDto) {
        return ResponseEntity.ok(authenticationService.updatePassword(updatePasswordDto));
    }

    @DeleteMapping("/delete-account/{username}")
    public ResponseEntity<User> deleteAccount(@PathVariable String username) {
        return ResponseEntity.ok(authenticationService.deleteAccount(username));
    }

}

