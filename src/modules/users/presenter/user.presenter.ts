import * as Interface from '../interface';


export class UserPresenter {
    id: number;
    name: string;
    email: string;
    role?: {
        id: number;
        name: string;
        slug: string;
    }

    constructor(input: Interface.IUser) {
        this.id = input.id;
        this.name = input.name;
        this.email = input.email;
        this.role = {
            id: input?.role?.id,
            name: input?.role?.name,
            slug: input?.role?.slug,
        }
    }
}