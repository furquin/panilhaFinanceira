import { Decimal } from "@prisma/client/runtime/library";
import { ICategory } from "src/category/interfaces/category.interface";
import { IUser } from "src/users/interfaces/user.interface";

export interface IFindExpense{
    id: number;
    userId: number;
    monthId: number;
    categoryId: number;
    name: string;
    price?: Decimal;
    recurrences?: number;
    currentRecurrence?: number;
    createdAt?: Date;
    updatedAt?: Date;
    category: ICategory
    month: {
        id: number;
        name: string;
        createdAt?: Date;
        updatedAt?: Date;
    }
    user: IUser
}