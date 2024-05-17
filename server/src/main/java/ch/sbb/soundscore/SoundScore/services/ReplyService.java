package ch.sbb.soundscore.SoundScore.services;

import ch.sbb.soundscore.SoundScore.entities.Reply;
import ch.sbb.soundscore.SoundScore.repositories.ReplyRepository;
import org.springframework.stereotype.Service;

@Service
public class ReplyService {
    ReplyRepository replyRepository;

    public ReplyService(ReplyRepository replyRepository) {
        this.replyRepository = replyRepository;
    }

    public Reply getReplyByCommentId(Long id) {
        return replyRepository.findById(id).orElse(null);
    }

    public Reply createReply(Reply reply) {
        return replyRepository.save(reply);
    }

    public Reply updateReply(Reply reply) {
        return replyRepository.save(reply);
    }

    public Reply deleteReply(Long id) {
        Reply reply = replyRepository.findById(id).orElse(null);
        if (reply != null) {
            replyRepository.delete(reply);
        }
        return reply;
    }
}
