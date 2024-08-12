package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.entities.LikeOrDislike;
import ch.sbb.soundscore.SoundScore.entities.Post;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.entities.UserNotifications;
import ch.sbb.soundscore.SoundScore.repositories.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final LikeOrDislikeRepository likeOrDislikeRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final UserNotificationsRepository userNotificationsRepository;

    public PostService(PostRepository postRepository, LikeOrDislikeRepository likeOrDislikeRepository, CommentRepository commentRepository, UserRepository userRepository, UserNotificationsRepository userNotificationsRepository) {
        this.postRepository = postRepository;
        this.likeOrDislikeRepository = likeOrDislikeRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.userNotificationsRepository = userNotificationsRepository;
    }

    public List<Post> allPosts() {
        return postRepository.findAll().stream().map(post -> {
            post.setDislikes(this.likeOrDislikeRepository.dislikesByPostId(post.getId()));
            post.setLikes(this.likeOrDislikeRepository.likesByPostId(post.getId()));
            post.getUser().setNotifications(userNotificationsRepository.getUserNotificationsByUserId(post.getUser().getId()));
            post.getUser().setFollowers(userRepository.getFollowers(post.getUser().getId()));
            return post;
        }).collect(Collectors.toList());
    }

    public Post newPost(Post post) {
        return postRepository.save(post);
    }

    public Post editPost(Post post) {
        return postRepository.save(post);
    }

    public Post deletePost(Long id) {
        Post post = postRepository.findById(id).orElseThrow();
        commentRepository.deleteAllByPost(post);
        userNotificationsRepository.deleteAllByPost(post);
        postRepository.deleteLikes(post);
        postRepository.delete(post);

        return post;
    }

    public Post getPost(Long id) {
        Post post = postRepository.findById(id).orElseThrow();
        post.setDislikes(this.likeOrDislikeRepository.dislikesByPostId(post.getId()));
        post.setLikes(this.likeOrDislikeRepository.likesByPostId(post.getId()));
        post.getUser().setNotifications(userNotificationsRepository.getUserNotificationsByUserId(post.getUser().getId()));
        post.getUser().setFollowers(userRepository.getFollowers(post.getUser().getId()));
        return post;
    }


    public boolean likeOrDislikePost(Long id, boolean like, UserDetails user) {
        boolean added;
        Post post = postRepository.findById(id).orElseThrow();
        if (like) {
            added = handleLike(post, userRepository.findByUsername(user.getUsername()).orElseThrow());
        } else {
            added = handleDislike(post, userRepository.findByUsername(user.getUsername()).orElseThrow());
        }
        return added;
    }

    private boolean handleLike(Post post, User user) {
        boolean added = false;
        if (likeOrDislikeRepository.existsLikeOrDislikeByPostAndUserAndLikeTrue(post, user)) {
            userNotificationsRepository.deleteAllByLikeOrDislike(likeOrDislikeRepository.getLikeOrDislikeByPostAndUser(post, user).orElseThrow());
            likeOrDislikeRepository.deleteLikeOrDislikeByPostAndUserAndLikeIsTrue(post, user);
        } else {
            LikeOrDislike likeOrDislike = likeOrDislikeRepository.save(new LikeOrDislike(post, user, true));
            userNotificationsRepository.save(new UserNotifications(post.getUser(), user, post, null,likeOrDislike, null, null));
            added = true;
        }
        return added;
    }

    private boolean handleDislike(Post post, User user) {
        boolean added = false;
        if (likeOrDislikeRepository.existsLikeOrDislikeByPostAndUserAndLikeIsFalse(post, user)) {
            userNotificationsRepository.deleteAllByLikeOrDislike(likeOrDislikeRepository.getLikeOrDislikeByPostAndUser(post, user).orElseThrow());
            likeOrDislikeRepository.deleteLikeOrDislikeByPostAndUserAndLikeIsFalse(post, user);
        } else {
            LikeOrDislike likeOrDislike = likeOrDislikeRepository.save(new LikeOrDislike(post, user, false));
            userNotificationsRepository.save(new UserNotifications(post.getUser(), user, post, null,likeOrDislike, null, null));
            added = true;
        }
        return added;
    }

    public String hasLikedOrDisliked(Long id, User user) {
        Post post = postRepository.findById(id).orElseThrow();
        if (likeOrDislikeRepository.existsLikeOrDislikeByPostAndUserAndLikeIsFalse(post, user)) {
            return "{\"alreadyLikedOrDisliked\":true,\"liked\":false}";
        } else if (likeOrDislikeRepository.existsLikeOrDislikeByPostAndUserAndLikeTrue(post, user)) {
            return "{\"alreadyLikedOrDisliked\":true,\"liked\":true}";
        } else {
            return "{\"alreadyLikedOrDisliked\":false,\"liked\":false}";
        }
    }
}
