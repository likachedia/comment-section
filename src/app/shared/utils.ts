export interface Image {
    png: string;
    webp: string;
}

export interface User {
    image: Image;
    username: string;
}

export interface Comment {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: User;
    replies?: Reply[];
}

export type Reply = Comment & { replyingTo: string};

export interface Data {
    currentUser: User,
    comments: Comment[]
}