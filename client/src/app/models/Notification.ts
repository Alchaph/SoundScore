import {User} from "./User";
import {Post} from "./Post";
import {Comment} from "./Comment";
import {LikeOrDislike} from "./LikeOrDislike";

export interface Notification {
  id?: number,
  receiver: User,
  sender: User,
  post?: Post,
  comment: Comment,
  likeOrDislike: LikeOrDislike,
  read: boolean
}
