import {Post} from "./Post";
import {User} from "./User";

export interface Comment {
  id?: number;
  title: string;
  message: string;
  comment: Comment;
  post: Post;
  user: User;
}
