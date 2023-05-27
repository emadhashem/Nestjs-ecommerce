import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserRoles } from "src/entities/user/user-types";


@Injectable()
export class AdminRoleGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean{
        const req = context.switchToHttp().getRequest()
        if(req['user'].role && req['user'].role === UserRoles.admin) return true
        return false
    }
}

export const ADMIN_ROLE_GUARD = 'ADMIN_ROLE_GUARD'