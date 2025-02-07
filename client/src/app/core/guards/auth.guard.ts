import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthModalComponent } from '../../features/auth/auth-modal.component';
import { map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const dialogService = inject(MatDialog);
  const router = inject(Router);
  const returnUrl = state.url

  if (accountService.currentUser()) {
    return of(true);
  } else {
    return accountService.getAuthState().pipe(
      map(auth => {
        if (auth.isAuthenticated) {
          return true;
        } else {
          // Define the returnUrl, and adjust it if necessary
          const returnUrl = state.url === '/admin' ? '/shop' : state.url;

          // Open the modal with the adjusted returnUrl
          const dialogRef = dialogService.open(AuthModalComponent, {
            autoFocus: false,
            data: { returnUrl }
          });

          // Listen for when the dialog is closed
          dialogRef.afterClosed().subscribe(() => {
            // If dialog was closed (user didn't log in), and the URL is '/admin'
            if (!auth.isAuthenticated && state.url === '/admin') {
              // Redirect to the '/shop' page
              router.navigateByUrl('/shop').then(() => {
                // Additional actions after navigation, if needed
              });
            }
          });
          return false;
        }
      })
    )
  }
};
