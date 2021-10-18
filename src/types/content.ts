export interface Topic {
    title: string;
    img: Array<Buffer>;
    imgSrc?: string
    _id: string;
    description: string
}

export interface Record {
    title: string;
    _id: string;
    description: string;
}