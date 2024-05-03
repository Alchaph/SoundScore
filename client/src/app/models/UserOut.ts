import {Artist} from "./Artist";


export interface UserOut {
  id: number;
  username: string;
  password: string;
  email: string;
  tel: string;
  created: string;
  artist: Artist;
}
