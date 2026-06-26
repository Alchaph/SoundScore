# SoundScore

Music social platform — share posts about songs, rate tracks, follow artists, climb the leaderboard.

## Start

```bash
docker compose up -d
```

Open **http://localhost**.

## Local network access

Others on the same WiFi can reach it at **http://mcair.local** (your Mac's Bonjour hostname). For a friendlier URL, rename your Mac in _System Settings → General → About → Name_ to `soundscore` — then it's **http://soundscore.local**.

## Seeding

The database auto-seeds with 8 test users, artists, songs, posts, and likes on first start. To disable:

```yaml
# docker-compose.yml
SEEDING_ENABLED: "false"
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

## Local development (no Docker)

```bash
# Terminal 1 — database
docker compose up -d db

# Terminal 2 — backend (Java 21 required)
cd server
JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home \
  MAIL_PASSWORD=dummy ./mvnw spring-boot:run

# Terminal 3 — frontend
cd client
npm install --legacy-peer-deps
npx ng serve
```

Frontend runs on **http://localhost:4200**, backend on **http://localhost:8080**. The dev build uses `localhost:8080/api` directly (no Caddy proxy).
