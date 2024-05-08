import {Artist} from "./Artist";


export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  tel: string;
  created: string;
  artist?: Artist;
}
