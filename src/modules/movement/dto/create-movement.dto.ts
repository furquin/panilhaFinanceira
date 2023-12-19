import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";

export class MovementDto {
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
}

export class CreateMovementsDTO {
    @IsNotEmpty({ message: 'O array de movimentações não pode ser vazio' })
    @IsArray({ message: 'Movimentações deve ser um array'})
    @ArrayMinSize(1, { message: 'O array de movimentações deve ter pelo menos 1 movimentação' })
    @ValidateNested({ each: true })
    @Type(() => MovementDto)
    movements: MovementDto[];
}
