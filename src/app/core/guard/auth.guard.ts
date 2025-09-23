import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (tokenService.getToken()) {
    if (!tokenService.getSenhaAlterada()) {
      return router.parseUrl('/alterar-senha');
    }
    return true;
  }
  return router.parseUrl('/login');
};
