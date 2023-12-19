import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../database/prismaService'
import { BcryptService } from '../../services/bcrypt/bcrypt.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService, private readonly bcrypt: BcryptService) {}
	async create(createUserDto: CreateUserDto) {
		createUserDto.password = await this.bcrypt.hash(createUserDto.password)
		const user = await this.prisma.user.create({
			data: createUserDto,
		})
		delete user.password
		return user
	}

	findAll() {
		return this.prisma.user.findMany()
	}

	findOne(id: number) {
		return `This action returns a #${id} user`
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user with ${updateUserDto}`
	}

	remove(id: number) {
		return `This action removes a #${id} user`
	}
}