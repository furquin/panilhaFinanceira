import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsBoolean()
  @IsNotEmpty()
  essential: boolean;
  
  @IsNumber()
  @IsOptional()
  recurrence?: number;

  @IsNumber()
  @IsOptional()
  categoryId?: number;

}
