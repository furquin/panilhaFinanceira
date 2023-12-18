import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prismaService'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
	constructor(private readonly prismaService: PrismaService) {}
	async create(createCategoryDto: CreateCategoryDto) {
		return await this.prismaService.category.create({data: createCategoryDto})
	}

	async findAll() {
		return await this.prismaService.category.findMany()
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
