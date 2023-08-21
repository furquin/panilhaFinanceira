import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateExpenseDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsNumber()
	@IsNotEmpty()
	price: number

	@IsNumber()
	@IsNotEmpty()
	userId: number

	@IsNumber()
	recurrence: number

	@IsNumber()
	categoryId: number

	@IsBoolean()
	essential: boolean

}
