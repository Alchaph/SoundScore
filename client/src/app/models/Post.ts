import {Genre} from "./Genre";
import {Artist} from "./Artist";
import {Song} from "./Song";
import {User} from "./User";
import {LikeOrDislike} from "./LikeOrDislike";

export interface Post {
  id?: number;
  likes: LikeOrDislike[];
  dislikes: LikeOrDislike[];
  title: string;
  content: string;
  image: string;
  user: User
  genre?: Genre
  artist?: Artist
  song?: Song
}
