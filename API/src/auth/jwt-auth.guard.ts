import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
    ){
        super();
    }

    async canActivate(
        context: ExecutionContext,)
    {
        const canActivate = await super.canActivate(context);

        if(!canActivate)
            return false;

        const requiredRole = this.reflector.getAllAndOverride<string>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if(!requiredRole)
            return true;
        
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if(!token)
            throw new UnauthorizedException("Token inesistente");

        const payload = this.jwtService.verify(token);
        const userRole = payload.role || "";

        if(userRole != requiredRole)
            throw new UnauthorizedException("Não autorizado");

        return true;
    }
}