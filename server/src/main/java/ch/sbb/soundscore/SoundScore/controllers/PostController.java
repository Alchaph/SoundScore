package ch.sbb.soundscore.SoundScore.controllers;

import ch.sbb.soundscore.SoundScore.entities.Post;
import ch.sbb.soundscore.SoundScore.services.PostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/post")
    public List<Post> allPosts() {
        return this.postService.allPosts();
    }

    @PostMapping("/post")
    public Long newPost(@RequestBody Post post) {
        return postService.newPost(post);
    }

    @PutMapping("/post/{id}")
    public void updatePost(@RequestBody Post post, @PathVariable Long id) {
        postService.updatePost(post, id);
    }

    @DeleteMapping("/post/{id}")
    public void deletePost(@PathVariable int id) {
        postService.deletePost(id);
    }

    @PostMapping("/post/{id}/like")
    public void likeOrDislikePost(@PathVariable Long id, @PathVariable boolean like) {
        postService.likeOrDislikePost(id, like);
    }

}
