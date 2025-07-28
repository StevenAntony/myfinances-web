export class SupaBaseService<T, E> {
    public error: E | null = null;
    public data: Array<T> = [];
    public success: boolean = true;
}