import {Post} from "./Post";
import {User} from "./User";

export interface LikeOrDislike {
  id?: number,
  post: Post,
  user: User,
  like: boolean
}
