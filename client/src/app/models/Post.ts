import {Genre} from "./Genre";
import {Artist} from "./Artist";
import {Song} from "./Song";
import {User} from "./User";

export interface Post {
  id?: number;
  likes: number;
  dislikes: number;
  title: string;
  content: string;
  image: string;
  creator: User
  genre?: Genre
  artist?: Artist
  song?: Song
}
