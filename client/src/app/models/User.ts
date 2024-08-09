import {Artist} from "./Artist";
import {Notification} from "./Notification";


export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  notifications: Notification[];
  followers: User[];
  premium: boolean;
  artist?: Artist;
  created_at?: Date;
  updated_at?: Date;
  enabled?: boolean;
  authorities?: any;
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
  accountNonExpired?: boolean;
}
