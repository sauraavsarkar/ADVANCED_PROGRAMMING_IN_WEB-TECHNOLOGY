import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class SessionGuard implements CanActivate {
  canActivate(context: ExecutionContext
    ): boolean {
    const request = context.switchToHttp().getRequest();

    // Log the session object to see its contents
    console.log('Session object:', request.session);

    if (request.session.email) {
      // Authentication successful
      return true;
    } else {
      // Authentication failed
      console.log('Authentication failed. Session or email is missing.');
      return false;
    }
  }
}
