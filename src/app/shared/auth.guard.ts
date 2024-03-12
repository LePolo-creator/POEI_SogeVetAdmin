import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login/services/login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  if(authService.isAuthenticated())
    return true;
  router.navigate(["/login"]);
  return false;
};
