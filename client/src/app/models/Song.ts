
export interface Song {
    id: number;
    title: string;
    image: string;
    link: string;
    fk_genre: number;
    fk_artist: number;
}
