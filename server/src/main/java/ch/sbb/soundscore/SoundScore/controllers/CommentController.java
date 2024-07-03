package ch.sbb.soundscore.SoundScore.controllers;

import ch.sbb.soundscore.SoundScore.entities.Comment;
import ch.sbb.soundscore.SoundScore.services.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class    CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/create")
    public Comment createComment(@RequestBody Comment comment) {
        return commentService.createComment(comment);
    }

    @DeleteMapping("/delete/{id}")
    public Comment deleteComment(@PathVariable Long id) {
        commentService.baseId = id;
        return commentService.deleteComment(id);
    }

    @PutMapping("/edit")
    public Comment updateComment(@RequestBody Comment comment) {
        return commentService.editComment(comment);
    }

    @GetMapping("/get/{id}")
    public Comment getComment(@PathVariable Long id) {
        return commentService.getCommentById(id);
    }

    @GetMapping("/get/commentsByPostId/{postId}")
    public List<Comment> getCommentsByPostId(@PathVariable Long postId) {
        return commentService.getCommentsByPostId(postId);
    }
}