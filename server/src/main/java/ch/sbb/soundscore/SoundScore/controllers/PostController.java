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

    @GetMapping("/get/all")
    public List<Post> allPosts() {
        return this.postService.allPosts();
    }

    @PostMapping("/create")
    public Long newPost(@RequestBody Post post) {
        return postService.newPost(post);
    }

    @PutMapping("/edit")
    public Post editPost(@RequestBody Post post) {
        return postService.editPost(post);
    }

    @DeleteMapping("/delete/{id}")
    public Post deletePost(@PathVariable int id) {
        return postService.deletePost(id);
    }

    @PostMapping("/like/{id}")
    public void likeOrDislikePost(@PathVariable Long id, @RequestBody boolean like) {
        postService.likeOrDislikePost(id, like);
    }

}
