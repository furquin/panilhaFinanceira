import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateExpenseDto {
    @IsString({ message: 'A descrição deve ser uma string' })
    @IsOptional()
    description: string;

    @IsNumber({}, { message: 'O valor deve ser um número' })
    @IsNotEmpty({ message: 'O valor não pode ser vazio' })
    valueCents: number;

    @IsNumber({}, { message: 'A recorrência deve ser um número' })
    @IsNotEmpty({ message: 'A recorrência não pode ser vazia' })
    @Min(1, { message: 'A recorrência deve ser maior que 0' })
    recurrences: number;

    @IsNumber({}, { message: 'A categoria deve ser um número' })
    @IsNotEmpty({ message: 'A categoria não pode ser vazia' })
    categoryId: number;

    @IsString({ message: 'O tipo deve ser uma string' })
    @IsOptional()
    type?: string;
}
