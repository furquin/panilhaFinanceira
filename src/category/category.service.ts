import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { PrismaService } from 'src/database/prismaService'

@Injectable()
export class CategoryService {
	constructor(private readonly prismaService: PrismaService) {}
	async create(createCategoryDto: CreateCategoryDto) {
		return await this.prismaService.category.create({data: createCategoryDto})
	}

	findAll() {
		return `This action returns all category`
	}

	findOne(id: number) {
		return `This action returns a #${id} category`
	}

	update(id: number, updateCategoryDto: UpdateCategoryDto) {
		return `This action updates a #${id} category with ${updateCategoryDto}`
	}

	remove(id: number) {
		return `This action removes a #${id} category`
	}
}
