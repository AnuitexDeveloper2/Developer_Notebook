export interface ActionResponse<T> {
    payload: ReducerResponse<T>
}

export interface ReducerResponse<T> {
    data?: T;
    error: string;
}