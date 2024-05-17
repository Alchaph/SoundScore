package ch.sbb.soundscore.SoundScore.controllers;

import ch.sbb.soundscore.SoundScore.entities.Reply;
import ch.sbb.soundscore.SoundScore.services.ReplyService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/replies")
public class ReplyController {

    ReplyService replyService;

    public ReplyController(ReplyService replyService) {
        this.replyService = replyService;
    }

    @GetMapping("/get/{id}")
    public Reply getReplyByCommentId(@PathVariable Long id) {
        return replyService.getReplyByCommentId(id);
    }

    @PostMapping("/create")
    public Reply createReply(@RequestBody Reply reply) {
        return replyService.createReply(reply);
    }

    @PutMapping("/update")
    public Reply updateReply(@RequestBody Reply reply) {
        return replyService.updateReply(reply);
    }

    @DeleteMapping("/delete/{id}")
    public Reply deleteReply(@PathVariable Long id) {
        return replyService.deleteReply(id);
    }
}