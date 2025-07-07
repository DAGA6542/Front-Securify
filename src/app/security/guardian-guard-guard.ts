import {CanActivateFn, Router} from '@angular/router';
import {LoginService} from '../services/login-service';
import {inject} from '@angular/core';

export const guardianGuardGuard: CanActivateFn = (route, state) => {
  let loginService = inject(LoginService);
  let router = inject(Router);
  console.log(loginService.getToken());
  if (loginService.getToken()!=null) {
    return true;
  } else {
    router.navigate(['/authenticate']);
    return false;
  }
};
