export interface IRoute<T> {
    match: {
        path: string,
        params: T
    }
}

export interface IAppParams {
    appId?: string
}
