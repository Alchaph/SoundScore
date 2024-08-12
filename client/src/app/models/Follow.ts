import {User} from "./User";

export interface Follow {
    id: number;
    user: User;
    follower: User;
 }
