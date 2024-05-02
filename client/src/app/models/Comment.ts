
export interface Comment {
    id: number;
    title: string;
    message: string;
    fk_post: number;
    fk_user: number;
}
