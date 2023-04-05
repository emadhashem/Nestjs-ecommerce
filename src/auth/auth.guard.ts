import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthRepository } from './auth.repository';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService, private reflector: Reflector,
    private readonly authrepo: AuthRepository
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const req = context.switchToHttp().getRequest<Request>()
    const res = context.switchToHttp().getRequest<Response>()
    const token = this.extractTokenFromHeader(req)
    if (!token) {

      throw new UnauthorizedException('Please login ');
    }
    const findTK = await this.authrepo.findToken(token)
    if (findTK) throw new UnauthorizedException('U are Not authrized ,Please login ');
    try {
      const { sub } = await this.jwtService.verifyAsync(token)
      req['user'] = { user: sub, token }
    } catch (error) {
      throw new UnauthorizedException('Your session id ended');
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
