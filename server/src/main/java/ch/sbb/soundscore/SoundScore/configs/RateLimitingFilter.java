package ch.sbb.soundscore.SoundScore.configs;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

/**
 * Simple in-memory rate limiter.
 * Limits requests per IP address — configurable via application properties.
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class RateLimitingFilter implements Filter {

    @Value("${app.rate-limit.enabled:true}")
    private boolean enabled;

    @Value("${app.rate-limit.requests-per-minute:120}")
    private int maxRequestsPerMinute;

    private final ConcurrentHashMap<String, RateWindow> counters = new ConcurrentHashMap<>();

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        if (!enabled) {
            chain.doFilter(request, response);
            return;
        }

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String clientIp = getClientIp(httpRequest);
        long now = System.currentTimeMillis();

        counters.compute(clientIp, (key, window) -> {
            if (window == null || now - window.windowStart > TimeUnit.MINUTES.toMillis(1)) {
                return new RateWindow(now, 1);
            }
            window.count++;
            return window;
        });

        RateWindow window = counters.get(clientIp);
        if (window != null && window.count > maxRequestsPerMinute) {
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            httpResponse.setStatus(429);
            httpResponse.setContentType("application/json");
            httpResponse.getWriter().write("{\"error\":\"Too many requests. Please wait a moment.\"}");
            return;
        }

        chain.doFilter(request, response);
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isBlank()) {
            return xForwardedFor.split(",")[0].trim();
        }
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isBlank()) {
            return xRealIp;
        }
        return request.getRemoteAddr();
    }

    private static class RateWindow {
        final long windowStart;
        int count;

        RateWindow(long windowStart, int count) {
            this.windowStart = windowStart;
            this.count = count;
        }
    }
}
