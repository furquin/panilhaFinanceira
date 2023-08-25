export interface IUser {
    id: number;
    name: string;
    email?: string;
    role?: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}