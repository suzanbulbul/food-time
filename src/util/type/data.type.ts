export interface PaginationData<T> {
    data: T[];
    config: any;
    headers: any;
    request: any;
    status: number;
    statusText: string;
}