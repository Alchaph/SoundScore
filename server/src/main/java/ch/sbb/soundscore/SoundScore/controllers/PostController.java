package ch.sbb.soundscore.SoundScore.controllers;

import ch.sbb.soundscore.SoundScore.dtos.LikeResponse;
import ch.sbb.soundscore.SoundScore.entities.Post;
import ch.sbb.soundscore.SoundScore.entities.User;
import ch.sbb.soundscore.SoundScore.services.PostService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    @GetMapping("/get/{id}")
    public Post getPost(@PathVariable Long id) {
        return postService.getPost(id);
    }
    @PostMapping("/create")
    public Post newPost(@RequestBody Post post) {
        return postService.newPost(post);
    }

    @PutMapping("/edit")
    public Post editPost(@RequestBody Post post) {
        return postService.editPost(post);
    }

    @DeleteMapping("/delete/{id}")
    public Post deletePost(@PathVariable Long id) {
        return postService.deletePost(id);
    }

    @PostMapping("/like/{id}")
    public boolean likeOrDislikePost(@PathVariable Long id, @RequestBody boolean like) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return postService.likeOrDislikePost(id, like, currentUser);
    }

    @GetMapping("/get/liked/{id}")
    public String hasLikedOrDisliked(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return postService.hasLikedOrDisliked(id, currentUser);
    }
}
