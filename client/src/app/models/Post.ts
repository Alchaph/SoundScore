
export interface Post {
  id: number;
  likes: number;
  dislikes: number;
  fk_user: number;
  fk_genre: number;
  fk_artist: number;
  fk_song: number;
}
