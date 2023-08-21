export interface Topic extends Record {
    img: Array<Buffer> | string;
    imgSrc?: string
    description: string;
}

export interface ContentItem<T> extends Record {
    appointment: T;
    description: string;
    topic: string;
}

export interface Record { 
    title: string;
    topic: string;
    _id: string;
}