export interface Error {
    error: string,
    message: string
}

export interface UserId {
    userId: number,
}

export interface UserInfo extends UserId {
    name: string,
    email: string,
}
