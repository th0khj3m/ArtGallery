import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthModalComponent } from '../../features/auth/auth-modal.component';
import { map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const dialogService = inject(MatDialog);

  if (accountService.currentUser()) {
    return of(true);
  } else {
    const returnUrl = state.url
    return accountService.getAuthState().pipe(
      map(auth => {
        if (auth.isAuthenticated) {
          return true;
        } else {
          dialogService.open(AuthModalComponent, {
            autoFocus: false,
            data: { returnUrl }
          });
          return false;
        }
      })
    )
  }
};
