import {Genre} from "./Genre";
import {Artist} from "./Artist";


export interface SongOut {
  id: number;
  title: string;
  image: string;
  link: string;
  genre: Genre;
  artist: Artist;
}
