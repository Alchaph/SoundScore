package ch.sbb.soundscore.SoundScore.configs;

import ch.sbb.soundscore.SoundScore.entities.*;
import ch.sbb.soundscore.SoundScore.repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Profile("!test")
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepo;
    private final ArtistRepository artistRepo;
    private final GenreRepository genreRepo;
    private final SongRepository songRepo;
    private final PostRepository postRepo;
    private final CommentRepository commentRepo;
    private final LikeOrDislikeRepository likeRepo;
    private final UserFollowerRepository followerRepo;
    private final UserTagRepository userTagRepo;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepo, ArtistRepository artistRepo, GenreRepository genreRepo,
                      SongRepository songRepo, PostRepository postRepo, CommentRepository commentRepo,
                      LikeOrDislikeRepository likeRepo, UserFollowerRepository followerRepo,
                      UserTagRepository userTagRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.artistRepo = artistRepo;
        this.genreRepo = genreRepo;
        this.songRepo = songRepo;
        this.postRepo = postRepo;
        this.commentRepo = commentRepo;
        this.likeRepo = likeRepo;
        this.followerRepo = followerRepo;
        this.userTagRepo = userTagRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepo.count() > 0) {
            System.out.println("DB already seeded — skipping.");
            return;
        }
        System.out.println("Seeding database...");

        // ── Artists ──────────────────────────────────
        Artist a1 = artistRepo.save(new Artist(null, "Legendary rock band from London", "Queen"));
        Artist a2 = artistRepo.save(new Artist(null, "King of Pop", "Michael Jackson"));
        Artist a3 = artistRepo.save(new Artist(null, "British singer-songwriter", "Ed Sheeran"));
        Artist a4 = artistRepo.save(new Artist(null, "American rapper and producer", "Kendrick Lamar"));
        Artist a5 = artistRepo.save(new Artist(null, "Icelandic avant-garde artist", "Björk"));
        Artist a6 = artistRepo.save(new Artist(null, "German electronic pioneers", "Kraftwerk"));
        Artist a7 = artistRepo.save(new Artist(null, "American singer-songwriter", "Taylor Swift"));
        Artist a8 = artistRepo.save(new Artist(null, "Jamaican reggae legend", "Bob Marley"));

        // ── Genres ───────────────────────────────────
        Genre g1 = genreRepo.save(new Genre("Rock", "Guitar-driven popular music"));
        Genre g2 = genreRepo.save(new Genre("Pop", "Mainstream popular music"));
        Genre g3 = genreRepo.save(new Genre("Hip Hop", "Rhythmic music with rapping"));
        Genre g4 = genreRepo.save(new Genre("Electronic", "Music produced with electronic instruments"));
        Genre g5 = genreRepo.save(new Genre("Reggae", "Jamaican music with offbeat rhythms"));
        Genre g6 = genreRepo.save(new Genre("Indie", "Independent alternative music"));

        // ── Users ────────────────────────────────────
        String pw = passwordEncoder.encode("password123");
        User u1 = userRepo.save(new User("alice",    "alice@test.com",    pw, null, false));
        User u2 = userRepo.save(new User("bob",      "bob@test.com",      pw, null, false));
        User u3 = userRepo.save(new User("charlie",  "charlie@test.com",  pw, a1,  false));
        User u4 = userRepo.save(new User("diana",    "diana@test.com",    pw, a2,  true));
        User u5 = userRepo.save(new User("eve",      "eve@test.com",      pw, a3,  false));
        User u6 = userRepo.save(new User("frank",    "frank@test.com",    pw, a4,  false));
        User u7 = userRepo.save(new User("grace",    "grace@test.com",    pw, a7,  true));
        User u8 = userRepo.save(new User("hank",     "hank@test.com",     pw, a6,  false));

        System.out.println("  Users: 8");

        // ── Songs ────────────────────────────────────
        Song s1 = songRepo.save(new Song("Bohemian Rhapsody",  null, "https://youtu.be/fJ9rUzIMcZQ", g1, a1));
        Song s2 = songRepo.save(new Song("Billie Jean",        null, "https://youtu.be/Zi_XLOBDo_Y", g2, a2));
        Song s3 = songRepo.save(new Song("Shape of You",       null, "https://youtu.be/JGwWNGJdvx8", g2, a3));
        Song s4 = songRepo.save(new Song("HUMBLE.",            null, "https://youtu.be/tvTRZJ-4EyI", g3, a4));
        Song s5 = songRepo.save(new Song("Army of Me",         null, "https://youtu.be/7FJVM1cI3r8", g6, a5));
        Song s6 = songRepo.save(new Song("The Model",          null, "https://youtu.be/OQIYEPe6DwY", g4, a6));
        Song s7 = songRepo.save(new Song("Shake It Off",       null, "https://youtu.be/nfWlot6h_JM", g2, a7));
        Song s8 = songRepo.save(new Song("No Woman, No Cry",   null, "https://youtu.be/jGqrvnN7R3g", g5, a8));

        System.out.println("  Songs: 8");

        // ── Posts ────────────────────────────────────
        Post p1 = postRepo.save(post("Just discovered Bohemian Rhapsody — what a masterpiece!", u1, g1, a1, s1));
        Post p2 = postRepo.save(post("Billie Jean is still the best bassline ever written.",    u2, g2, a2, s2));
        Post p3 = postRepo.save(post("Ed Sheeran writes the catchiest hooks 🎵",                 u3, g2, a3, s3));
        Post p4 = postRepo.save(post("Kendrick is on another level lyrically.",                  u4, g3, a4, s4));
        Post p5 = postRepo.save(post("Björk's production on Army of Me is insane.",              u5, g6, a5, s5));
        Post p6 = postRepo.save(post("Kraftwerk basically invented electronic music.",           u6, g4, a6, s6));
        Post p7 = postRepo.save(post("Say what you want, Taylor Swift is a genius songwriter.",  u7, g2, a7, s7));
        Post p8 = postRepo.save(post("Bob Marley's music transcends generations.",               u8, g5, a8, s8));
        Post p9 = postRepo.save(post("What's your favorite Queen album? Mine is A Night at the Opera.",  u1, g1, a1, null));
        Post p10 = postRepo.save(post("Anyone else think Michael Jackson's Off the Wall is underrated?", u3, g2, a2, null));

        System.out.println("  Posts: 10");

        // ── Comments ─────────────────────────────────
        Comment c1  = commentRepo.save(comment("Totally agree! The operatic section is genius.",   u2, p1, null));
        Comment c2  = commentRepo.save(comment("Freddie's voice is unmatched.",                    u3, p1, null));
        Comment c3  = commentRepo.save(comment("That bassline is iconic for a reason.",            u1, p2, null));
        Comment c4  = commentRepo.save(comment("Sheeran is the modern king of pop.",               u4, p3, null));
        Comment c5  = commentRepo.save(comment("Kendrick's storytelling is next level.",           u5, p4, null));
        Comment c6  = commentRepo.save(comment("A Night at the Opera for sure!",                   u6, p9, null));
        Comment c7  = commentRepo.save(comment("Reply to: agree on Freddie.",                      u4, p1, c2));
        Comment c8  = commentRepo.save(comment("Kraftwerk paved the way for Daft Punk too.",       u7, p6, null));
        Comment c9  = commentRepo.save(comment("Taylor gets too much hate. She's brilliant.",      u8, p7, null));
        Comment c10 = commentRepo.save(comment("Off the Wall is actually his best work IMO.",      u2, p10, null));

        System.out.println("  Comments: 10");

        // ── Likes ────────────────────────────────────
        likeRepo.save(like(p1, u2, true));
        likeRepo.save(like(p1, u3, true));
        likeRepo.save(like(p1, u4, true));
        likeRepo.save(like(p1, u5, false));
        likeRepo.save(like(p2, u1, true));
        likeRepo.save(like(p2, u3, true));
        likeRepo.save(like(p3, u6, true));
        likeRepo.save(like(p3, u7, true));
        likeRepo.save(like(p3, u8, true));
        likeRepo.save(like(p4, u1, true));
        likeRepo.save(like(p4, u2, true));
        likeRepo.save(like(p4, u3, true));
        likeRepo.save(like(p5, u1, true));
        likeRepo.save(like(p6, u3, true));
        likeRepo.save(like(p6, u5, true));
        likeRepo.save(like(p6, u7, true));
        likeRepo.save(like(p7, u1, false));
        likeRepo.save(like(p7, u2, true));
        likeRepo.save(like(p8, u3, true));
        likeRepo.save(like(p8, u4, true));

        System.out.println("  Likes: 20");

        // ── Followers ────────────────────────────────
        followerRepo.save(follow(u2, u1));
        followerRepo.save(follow(u3, u1));
        followerRepo.save(follow(u4, u1));
        followerRepo.save(follow(u1, u2));
        followerRepo.save(follow(u3, u2));
        followerRepo.save(follow(u5, u3));
        followerRepo.save(follow(u6, u3));
        followerRepo.save(follow(u4, u5));
        followerRepo.save(follow(u7, u4));
        followerRepo.save(follow(u8, u4));
        followerRepo.save(follow(u2, u7));
        followerRepo.save(follow(u3, u7));

        System.out.println("  Followers: 12");

        // ── User Tags ────────────────────────────────
        userTagRepo.save(tag(u1, u2, p1, null));
        userTagRepo.save(tag(u3, u4, p4, null));
        userTagRepo.save(tag(u2, u5, p1, c1));

        System.out.println("  UserTags: 3");

        System.out.println("✅ Seeding complete!");
    }

    // ── helpers ─────────────────────────────────────
    private Post post(String content, User user, Genre genre, Artist artist, Song song) {
        Post p = new Post(user, genre, artist, song);
        p.setTitle(content.substring(0, Math.min(60, content.length())));
        p.setContent(content);
        return p;
    }

    private Comment comment(String msg, User user, Post post, Comment parent) {
        return new Comment(msg, user, post, parent);
    }

    private LikeOrDislike like(Post post, User user, boolean isLike) {
        return new LikeOrDislike(post, user, isLike);
    }

    private UserFollower follow(User user, User follower) {
        return new UserFollower(user, follower);
    }

    private UserTag tag(User user, User tagged, Post post, Comment comment) {
        return new UserTag(user, tagged, post, comment);
    }
}
