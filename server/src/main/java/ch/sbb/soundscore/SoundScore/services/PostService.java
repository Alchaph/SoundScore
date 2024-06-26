package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.dtos.LikeResponse;
import ch.sbb.soundscore.SoundScore.entities.LikeOrDislike;
import ch.sbb.soundscore.SoundScore.entities.Post;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.repositories.CommentRepository;
import ch.sbb.soundscore.SoundScore.repositories.LikeOrDislikeRepository;
import ch.sbb.soundscore.SoundScore.repositories.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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
        return postRepository.findAll();
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
        return postRepository.findById(id).orElseThrow();
    }

    public boolean likeOrDislikePost(Long id, boolean like, User user) {
        boolean added = false;
        Post post = postRepository.findById(id).orElseThrow();
        if (like) {
            if (post.getLikes() != null) {
                if (likeOrDislikeRepository.existsLikeOrDislikeByPostAndUserAndLikeTrue(post, user)) {
                    likeOrDislikeRepository.deleteLikeOrDislikeByPostAndUserAndLikeIsTrue(post, user);
                    post.setLikes(post.getLikes() - 1);
                } else {
                    likeOrDislikeRepository.save(new LikeOrDislike(post, user, true));
                    added = true;
                    post.setLikes(post.getLikes() + 1);
                }
            } else {
                post.setLikes(1L);
            }
        } else {
            if (post.getDislikes() != null) {
                if (likeOrDislikeRepository.existsLikeOrDislikeByPostAndUserAndLikeIsFalse(post, user)) {
                    likeOrDislikeRepository.deleteLikeOrDislikeByPostAndUserAndLikeIsFalse(post, user);
                    post.setDislikes(post.getDislikes() - 1);
                } else {
                    likeOrDislikeRepository.save(new LikeOrDislike(post, user, false));
                    added = true;
                    post.setDislikes(post.getDislikes() + 1);
                }
            } else {
                post.setDislikes(1L);
            }
        }
        postRepository.save(post);
        return added;
    }

    public String hasLikedOrDisliked(Long id, User user) {
        Post post = postRepository.findById(id).orElseThrow();
        if (likeOrDislikeRepository.existsLikeOrDislikeByPostAndUserAndLikeIsFalse(post, user)) {
            return  "{\"alreadyLikedOrDisliked\":true,\"liked\":false}";
        } else if (likeOrDislikeRepository.existsLikeOrDislikeByPostAndUserAndLikeTrue(post, user)) {
            return  "{\"alreadyLikedOrDisliked\":true,\"liked\":true}";
        } else {
            return "{\"alreadyLikedOrDisliked\":false,\"liked\":false}";
        }
    }
}
