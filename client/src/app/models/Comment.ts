import {Post} from "./Post";
import {User} from "./User";

export interface Comment {
  id?: number;
  title: string;
  message: string;
  parent?: Comment;
  children?: Comment[];
  post: Post;
  user: User;
}
