package ch.sbb.soundscore.SoundScore.Exeption;

import ch.sbb.soundscore.SoundScore.exeption.GlobalExceptionHandler;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.BadCredentialsException;

import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.assertEquals;

class GlobalExceptionHandlerTest {

    private GlobalExceptionHandler handler;

    @BeforeEach
    public void setUp() {
        handler = new GlobalExceptionHandler();
    }

    @Test
    public void handleBadCredentialsException() {
        BadCredentialsException ex = new BadCredentialsException("Invalid username or password");
        ProblemDetail detail = handler.handleSecurityException(ex);

        assertEquals(401, detail.getStatus());
        assertEquals("Invalid username or password", detail.getDetail());
        assertEquals("The username or password is incorrect", detail.getProperties().values().toString().replaceAll("[\\[\\]]", ""));
    }

    @Test
    public void handleAccountStatusException() {
        AccountStatusException ex = new AccountStatusException("Account locked") {};
        ProblemDetail detail = handler.handleSecurityException(ex);

        assertEquals(403, detail.getStatus());
        assertEquals("Account locked", detail.getDetail());
        assertEquals("The account is locked", detail.getProperties().values().toString().replaceAll("[\\[\\]]", ""));
    }

    @Test
    public void handleAccessDeniedException() {
        AccessDeniedException ex = new AccessDeniedException("Access denied");
        ProblemDetail detail = handler.handleSecurityException(ex);

        assertEquals(403, detail.getStatus());
        assertEquals("Access denied", detail.getDetail());
        assertEquals("You are not authorized to access this resource", detail.getProperties().values().toString().replaceAll("[\\[\\]]", ""));
    }

    @Test
    public void handleSignatureException() {
        SignatureException ex = new SignatureException("Invalid JWT signature");
        ProblemDetail detail = handler.handleSecurityException(ex);

        assertEquals(403, detail.getStatus());
        assertEquals("Invalid JWT signature", detail.getDetail());
        assertEquals("The JWT signature is invalid", detail.getProperties().values().toString().replaceAll("[\\[\\]]", ""));
    }

    @Test
    public void handleExpiredJwtException() {
        ExpiredJwtException ex = Mockito.mock(ExpiredJwtException.class);
        Mockito.when(ex.getMessage()).thenReturn("JWT token expired");
        ProblemDetail detail = handler.handleSecurityException(ex);

        assertEquals(403, detail.getStatus());
        assertEquals("JWT token expired", detail.getDetail());
        assertEquals("The JWT token has expired", detail.getProperties().values().toString().replaceAll("[\\[\\]]", ""));
    }

    @Test
    public void handleNoSuchElementException() {
        NoSuchElementException ex = new NoSuchElementException("Resource not found");
        ProblemDetail detail = handler.handleSecurityException(ex);

        assertEquals(500, detail.getStatus());
        assertEquals("Resource not found", detail.getDetail());
        assertEquals("The requested resource was not found", detail.getProperties().values().toString().replaceAll("[\\[\\]]", ""));
    }

    @Test
    public void handleUnknownException() {
        Exception ex = new Exception("Unknown error");
        ProblemDetail detail = handler.handleSecurityException(ex);

        assertEquals(500, detail.getStatus());
        assertEquals("Unknown error", detail.getDetail());
        assertEquals("Unknown internal server error.", detail.getProperties().values().toString().replaceAll("[\\[\\]]", ""));
    }
}