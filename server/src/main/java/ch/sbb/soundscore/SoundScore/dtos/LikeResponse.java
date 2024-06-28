package ch.sbb.soundscore.SoundScore.dtos;

public class LikeResponse {
    private boolean liked;
    private boolean alreadyLikedOrDisliked;

    public LikeResponse(boolean liked, boolean alreadyLikedOrDisliked) {
        this.liked = liked;
        this.alreadyLikedOrDisliked = alreadyLikedOrDisliked;
    }
}
