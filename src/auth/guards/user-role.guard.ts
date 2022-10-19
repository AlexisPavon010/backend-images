import { CanActivate, ExecutionContext, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[] = this.reflector.get('roles', context.getHandler())

    if (!validRoles) return true
    
    if (validRoles.length === 0) return true

    const req = context.switchToHttp().getRequest();
    if (!req.user) throw new BadRequestException("User not found (Roles)");

    for (const role of req.user.roles) {
      if (validRoles.includes(role)) {
        return true
      }
    }

    throw new ForbiddenException(`User ${req.user.username} need a valid role: ${validRoles} `);
  }
}
