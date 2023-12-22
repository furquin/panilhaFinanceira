import { ApiProperty } from "@nestjs/swagger";
import { ICategory } from "src/modules/category/interface/category.interface";
import { IUser } from "src/modules/users/interface";

export class ExpensePresenter {
    @ApiProperty()
    id: number;

    @ApiProperty()
    description: string;
    
    @ApiProperty()
    valueCents: number;

    @ApiProperty()
    recurrences: number;

    @ApiProperty()
    currentRecurrence: number;

    @ApiProperty()
    date: Date;

    @ApiProperty()
    category: ICategory;

    @ApiProperty()
    user: IUser

    constructor(expense: Partial<any>) {
        this.id = expense.id;
        this.description = expense.description;
        this.valueCents = expense.valueCents;
        this.recurrences = expense.recurrences;
        this.currentRecurrence = expense.currentRecurrence;
        this.date = expense.date;
        this.category = expense.category.name
        this.user = expense.user.name
    }
}