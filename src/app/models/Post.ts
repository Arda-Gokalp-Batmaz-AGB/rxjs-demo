import { Comment } from "./Comment";

export interface Post {
    id: number,
    title: string,
    text: string,
    authorId: number,
    comments: Comment[]
}