import {Genre} from "./Genre";
import {Artist} from "./Artist";
import {SongOut} from "./SongOut";
import {UserOut} from "./UserOut";

export interface PostOut {
    id: number;
    likes: number;
    dislikes: number;
    title: string;
    content: string;
    image: string;
    user: UserOut
    genre: Genre
    artist: Artist
    song: SongOut
}
