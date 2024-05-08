import {Genre} from "./Genre";
import {Artist} from "./Artist";


export interface Song {
  id?: number;
  title: string;
  image: string;
  link: string;
  genre: Genre;
  artist: Artist;
}
