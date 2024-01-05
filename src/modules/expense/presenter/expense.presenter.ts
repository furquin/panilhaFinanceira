import { ApiProperty } from "@nestjs/swagger";
import { IExpense } from "src/modules/expense/interface/expense.interface";
import { DateTime } from 'luxon';

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
    date: string;

    @ApiProperty()
    category: string;

    @ApiProperty()
    user: string

    constructor(expense: Partial<IExpense>) {
        this.id = expense.id;
        this.description = expense.description;
        this.valueCents = expense.valueCents;
        this.recurrences = expense.recurrences;
        this.currentRecurrence = expense.currentRecurrence;
        this.date = DateTime.fromJSDate(expense.date).toFormat('dd/MM/yyyy')
        this.category = expense.category.name
        this.user = expense.user.name
    }
}