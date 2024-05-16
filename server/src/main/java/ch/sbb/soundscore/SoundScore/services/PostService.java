package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.entities.Post;
import ch.sbb.soundscore.SoundScore.repositories.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> allPosts() {
        return postRepository.findAll();
    }

    public Long newPost(Post post) {
        postRepository.save(post);
        return post.getId();
    }

    public Post editPost(Post post) {
        return postRepository.save(post);
    }

    public Post deletePost(int id) {
        Post post = postRepository.findById((long) id).orElseThrow();
        postRepository.delete(post);
        return post;
    }
    public Post getPost(Long id) {
        return postRepository.findById(id).orElseThrow();
    }
    public void likeOrDislikePost(Long id, boolean like) {
        Post post = postRepository.findById(id).orElseThrow();
        if (like) {
            if (post.getLikes() != null){
                post.setLikes(post.getLikes() + 1);
            } else {
                post.setLikes(1L);
            }
        } else {
            if (post.getDislikes() != null){
                post.setDislikes(post.getDislikes() + 1);
            } else {
                post.setDislikes(1L);
            }        }
        postRepository.save(post);
    }
}
