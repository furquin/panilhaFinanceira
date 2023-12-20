import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

export class MovementDto {
  description: string;

  valueCents: number;

  recurrences: number;

  categoryId: number;
}

export class CreateMovementsDTO {
  movements: MovementDto[];
}
