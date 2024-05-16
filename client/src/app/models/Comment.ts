import {Post} from "./Post";
import {User} from "./User";

export interface Comment {
    id?: number;
    title: string;
    message: string;
    post: Post;
    user: User;
}
