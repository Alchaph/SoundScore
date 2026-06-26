# SoundScore

Music social platform — share posts about songs, rate tracks, follow artists, climb the leaderboard.

## Quick Start (Self-Hosted)

```bash
./setup.sh
```

Open **http://localhost:8888**.

The script generates a secure `.env` with random passwords and JWT secret, then starts everything with Docker.

## Manual Start

```bash
# 1. Copy and configure environment
cp .env.example .env
# Edit .env — at minimum set DB_ROOT_PASSWORD and JWT_SECRET_KEY

# 2. Generate secrets (run these and paste into .env)
openssl rand -base64 32 | tr -d '/+' | head -c 24   # DB password
openssl rand -base64 64                                # JWT secret

# 3. Start
docker compose up -d
```

## Configuration

All settings are in `.env`:

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_ROOT_PASSWORD` | *(required)* | MariaDB root password |
| `DB_NAME` | `sound` | Database name |
| `JWT_SECRET_KEY` | *(required)* | JWT signing secret (base64) |
| `MAIL_HOST` | `smtp.gmail.com` | SMTP server |
| `MAIL_PORT` | `587` | SMTP port |
| `MAIL_USERNAME` | *(empty)* | SMTP username |
| `MAIL_PASSWORD` | *(empty)* | SMTP password (empty = OTP logged to console) |
| `SEEDING_ENABLED` | `true` | Auto-seed test data on first run |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:4200,http://localhost:8888` | Comma-separated CORS origins |
| `APP_PORT` | `8888` | Public HTTP port |
| `CLOUDFLARE_TUNNEL_TOKEN` | *(empty)* | Cloudflare Tunnel token for public access |
| `RATE_LIMIT_REQUESTS_PER_MINUTE` | `120` | API rate limit per IP |

## Seeding

The database auto-seeds with 8 test users, artists, songs, posts, and likes on first start. To disable:

```env
# .env
SEEDING_ENABLED=false
```

Then `docker compose down -v && docker compose up -d` for a blank database.

### Test accounts (when seeded)

| Username | Password |
|----------|----------|
| alice | password123 |
| bob | password123 |
| charlie | password123 |
| diana | password123 |

All eight users use `password123`.

## Mail / OTP

When `MAIL_PASSWORD` is empty, OTP codes are printed to the backend container logs instead of being emailed:

```bash
docker compose logs backend | grep "DEV MODE"
```

## Cloudflare Tunnel (public access)

To expose SoundScore publicly via Cloudflare Tunnel:

```bash
# 1. Get your tunnel token from Cloudflare Zero Trust dashboard
# 2. Add it to .env:
#    CLOUDFLARE_TUNNEL_TOKEN=<your-token>
# 3. Start with tunnel profile
docker compose --profile tunnel up -d
```

You can also add SoundScore to an existing shared Cloudflare Tunnel by adding this to your `cloudflared` ingress config:

```yaml
- hostname: your-domain.com
  service: http://caddy:8888
```

Make sure the cloudflared container can reach the `caddy` hostname on the Docker network.

The app uses `Content-Security-Policy: upgrade-insecure-requests` to enforce HTTPS when served through a tunnel. Update `environments.prod.ts` and `CORS_ALLOWED_ORIGINS` with your public domain.

## E2E Tests

```bash
cd client
npm install --legacy-peer-deps
PLAYWRIGHT_BASE_URL=http://localhost:8888 npx playwright test
```

Tests cover auth endpoints, CORS, frontend serving, and security headers.

## Local development (no Docker)

```bash
# Terminal 1 — database
docker compose up -d db

# Terminal 2 — backend (Java 21 required)
cd server
./mvnw spring-boot:run

# Terminal 3 — frontend
cd client
npm install --legacy-peer-deps
npx ng serve
```

Frontend runs on **http://localhost:4200**, backend on **http://localhost:8080**.

## Architecture

```
Browser → Caddy (:8888) → /api/* → backend (:8080) → MariaDB
                         → /*     → frontend (:80, nginx)
```

## Security

- All secrets managed via `.env` (never committed)
- JWT Bearer token authentication
- Rate limiting (120 req/min per IP by default)
- Security headers via Caddy: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `cross-origin-opener-policy`, `upgrade-insecure-requests`
- Passwords hashed with BCrypt
- OTP codes expire after 5 minutes, max 5 attempts
- CSRF disabled (API uses stateless JWT, no cookies)
- CORS restricted to configured origins
