import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
  applyDecorators,
  createParamDecorator,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from 'src/database/prisma.service';
import { ACLService, actionName } from 'src/services/acl/acl.service';
import { UserPresenter } from '../users/presenter/user.presenter';
import { AuthPresenter } from './presenter/auth.presenter';

export function GuardRoute(...actions: actionName[]) {
  return applyDecorators(
    SetMetadata('actions', actions),
    UseGuards(AuthGuard, ActionGuard) //
  );
}

export const Auth = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.auth;
});

@Injectable()
export class AuthGuard {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new ForbiddenException('Token não encontrado.');
    }

    try {
      const auth = await this.getAuthFromToken(token);
      request['auth'] = auth;
    } catch (e) {
      throw new ForbiddenException(e instanceof ForbiddenException ? e.message : 'Token inválido.');
    }

    return true;
  }
  async getAuthFromToken(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET_KEY'),
    });
    const auth = await this.getAuth(payload.id);
    return auth;
  }

  private async getAuth(userId: number) {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
      include: { role: true },
    });

    if (!user) {
      throw new ForbiddenException('Usuário não encontrado.');
    }

    return new AuthPresenter({ user: new UserPresenter(user), role: user.role });
  }
  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

@Injectable()
class ActionGuard implements CanActivate {
  constructor(
    private readonly aclService: ACLService //
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const actions = Reflect.getMetadata('actions', context.getHandler());
    const request = context.switchToHttp().getRequest();

    const { auth } = request;

    if (!auth) {
      throw new UnauthorizedException('Sem token de autenticação.');
    }

    return this.aclService.verifyPermission(actions, auth);
  }
}
