export interface Topic extends Record {
    img: Array<Buffer>;
    imgSrc?: string
}

export interface ContentItem extends Record {
    appointment: string
}

export interface Record {
    title: string;
    _id?: string;
    description: string;
}