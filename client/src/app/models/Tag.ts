import {User} from "./User";
import {Post} from "./Post";
import {Comment} from "./Comment";


export interface Tag {
  id: number;
  user: User;
  taggedUser: User;
  post: Post;
  comment: Comment;
}
