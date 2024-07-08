package ch.sbb.soundscore.SoundScore.dtos;


import lombok.Data;

@Data
public class LikeResponse {
    private boolean liked;
    private boolean alreadyLikedOrDisliked;

    public LikeResponse(boolean liked, boolean alreadyLikedOrDisliked) {
        this.liked = liked;
        this.alreadyLikedOrDisliked = alreadyLikedOrDisliked;
    }
}
