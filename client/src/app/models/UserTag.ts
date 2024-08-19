import {User} from "./User";
import {Post} from "./Post";
import {Comment} from "./Comment";


export interface UserTag {
  id?: number;
  user: User;
  taggedUser: User;
  post?: Post;
  comment?: Comment;
}
