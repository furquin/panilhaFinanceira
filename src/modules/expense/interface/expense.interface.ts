import { ICategory } from "src/modules/category/interface/category.interface";
import { IUser } from "src/modules/users/interface";

export interface IExpense {
    id: number;
    userId: number
    description: string;
    valueCents: number;
    createdAt: Date;
    updatedAt: Date;
    recurrences: number;
    currentRecurrence: number;
    categoryId: number
    date: Date;
    type: string;
    
    category: ICategory;
    user: IUser;
}