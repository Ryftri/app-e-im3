interface Meta {
    status: number
}

export interface ApiResponse<T> {
    data: T;
    meta: Meta;
}