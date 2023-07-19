export interface Topic extends Record {
    img: Array<Buffer> | string;
    imgSrc?: string
    description: string;
}

export interface ContentItem extends Record {
    appointment: Record;
    description: string;
    topic: string;
}

export interface Record { 
    title: string;
    topic: string;
    _id: string;
}