package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.entities.LikeOrDislike;
import ch.sbb.soundscore.SoundScore.entities.Post;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.repositories.CommentRepository;
import ch.sbb.soundscore.SoundScore.repositories.LikeOrDislikeRepository;
import ch.sbb.soundscore.SoundScore.repositories.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final LikeOrDislikeRepository likeOrDislikeRepository;
    private final CommentRepository commentRepository;

    public PostService(PostRepository postRepository, LikeOrDislikeRepository likeOrDislikeRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.likeOrDislikeRepository = likeOrDislikeRepository;
        this.commentRepository = commentRepository;
    }

    public List<Post> allPosts() {
        return postRepository.findAll().stream().map(post -> {
            post.setDislikes(this.likeOrDislikeRepository.dislikesByPostId(post.getId()));
            post.setLikes(this.likeOrDislikeRepository.likesByPostId(post.getId()));
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
        postRepository.deleteLikes(post);
        postRepository.delete(post);
        return post;
    }

    public Post getPost(Long id) {
        Post post = postRepository.findById(id).orElseThrow();
        post.setDislikes(this.likeOrDislikeRepository.dislikesByPostId(post.getId()));
        post.setLikes(this.likeOrDislikeRepository.likesByPostId(post.getId()));
        return post;
    }


    public boolean likeOrDislikePost(Long id, boolean like, User user) {
        boolean added;
        Post post = postRepository.findById(id).orElseThrow();
        if (like) {
            added = handleLike(post, user);
        } else {
            added = handleDislike(post, user);
        }
        return added;
    }

    private boolean handleLike(Post post, User user) {
        boolean added = false;
        if (likeOrDislikeRepository.existsLikeOrDislikeByPostAndUserAndLikeTrue(post, user)) {
            likeOrDislikeRepository.deleteLikeOrDislikeByPostAndUserAndLikeIsTrue(post, user);
        } else {
            likeOrDislikeRepository.save(new LikeOrDislike(post, user, true));
            added = true;
        }
        return added;
    }

    private boolean handleDislike(Post post, User user) {
        boolean added = false;
        if (likeOrDislikeRepository.existsLikeOrDislikeByPostAndUserAndLikeIsFalse(post, user)) {
            likeOrDislikeRepository.deleteLikeOrDislikeByPostAndUserAndLikeIsFalse(post, user);
        } else {
            likeOrDislikeRepository.save(new LikeOrDislike(post, user, false));
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
