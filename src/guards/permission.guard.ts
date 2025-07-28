import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permission = this.reflector.get<string>(
      'permission',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const user = request.session.user;
    if (!user) {
      throw new ForbiddenException('Không có quyền truy cập!!');
    }
    if (user.userRole.some((item: string) => item === permission)) return true;

    throw new ForbiddenException('Không có quyền truy cập!!');
  }
}
