import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsOptional()
  userId: number;

  @IsBoolean()
  @IsOptional()
  essential: boolean;
  
  @IsNumber()
  @IsOptional()
  monthId?: number;
  
  @IsNumber()
  @IsOptional()
  recurrences?: number;

  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @IsString()
  @IsOptional()
  currentRecurrence?: number

}
