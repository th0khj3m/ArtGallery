import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { inject } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  const snack = inject(SnackbarService);

  return accountService.getAuthState().pipe(
    map(auth => {
      if (auth.isAuthenticated && accountService.isAdmin()) {
        return true;
      }
      else {
        // Log the current URL that the user tried to access
        snack.error("You do not have permission to access this page.");
        router.navigateByUrl("/shop").then(() => {
          // Resolve the navigation promise before returning false
        });
        return false;
      }
    })
  )

};
