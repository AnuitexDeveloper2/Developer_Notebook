export interface Topic extends Record {
    img: Array<Buffer>;
    imgSrc?: string
    description: string;
}

export interface ContentItem extends Record {
    appointment: string;
    description: string;
    topic: string;
}

export interface Record {
    title: string;
    _id: string;
}