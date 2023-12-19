import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { PrismaService } from "src/database/prisma.service";
import { UserPresenter } from "../users/presenter/user.presenter";

@Injectable()
export class AuthService {
	constructor(
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService,
    ) {}

    async signIn(email: string, password: string): Promise<{ user: UserPresenter; token: string }> {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: email,
            },
        })

        if (!user) {
            throw new NotFoundException('User not found')
        }

        const isPasswordValid = await compare(password, user.password)

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password')
        }

        return { 
            user: new UserPresenter(user),
            token: this.jwtService.sign({id: user.id}, {secret: this.configService.get<string>('JWT_SECRET_KEY')})
        }
    }
} 