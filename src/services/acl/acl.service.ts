import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthPresenter } from 'src/modules/auth/presenter/auth.presenter';

export type actionName = keyof typeof ACLService.prototype.permissions;
type action = actionName | actionName[];

@Injectable()
export class ACLService {
  permissions = {
    'movement.read': ['admin_geral'],
    'movement.delete': ['admin_geral'],
    'movement.create': ['admin_geral'],
    'movement.update': ['admin_geral'],

    'user.read': ['admin_geral'],
    'user.delete': ['admin_geral'],
    'user.create': ['admin_geral'],
    'user.update': ['admin_geral'],

    'category.read': ['admin_geral'],
    'category.delete': ['admin_geral'],
    'category.create': ['admin_geral'],
    'category.update': ['admin_geral'],
  };

  verifyPermission(action: action, auth: AuthPresenter, errorMessage?: string): boolean {
    if (Array.isArray(action)) {
      return action.some((action) => this.verifyPermission(action, auth, errorMessage)) || action.length === 0;
    }

    const allowedRoles = this.permissions[action];

    if (!allowedRoles) {
      throw new ForbiddenException('Você não tem permissão para realizar esta ação.');
    }

    const has = allowedRoles.some((slug) => auth.role.slug === slug);

    if (!has) {
      throw new ForbiddenException(errorMessage ?? 'Sem permissão.');
    }

    return true;
  }

  safeVerifyPermission(action: action, auth: AuthPresenter): boolean {
    try {
      return this.verifyPermission(action, auth);
    } catch (error) {
      return false;
    }
  }

  hasRole(auth: AuthPresenter, slug: string | string[]): boolean {
    if (Array.isArray(slug)) {
      return slug.some((slug) => this.hasRole(auth, slug)) || slug.length === 0;
    }

    return auth.role.slug === slug;
  }
}
