import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { MatBadge } from "@angular/material/badge";
import { MatDialog } from '@angular/material/dialog';
import { AuthModalComponent } from '../../features/auth/auth-modal.component';
import { AccountService } from '../../core/services/account.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatProgressBar } from "@angular/material/progress-bar";
import { BusyService } from '../../core/services/busy.service';
import { CartService } from '../../core/services/cart.service';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    MatBadge,
    RouterLink,
    RouterLinkActive,
    MatProgressBar,
    MatMenuTrigger,
    MatMenu,
    MatDivider,
    MatMenuItem
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  private dialogService = inject(MatDialog);
  busyService = inject(BusyService);
  cartService = inject(CartService);
  accountService = inject(AccountService);
  private router = inject(Router);

  logout() {
    this.accountService.logout().subscribe({
      next: () => {
        this.accountService.currentUser.set(null);
        this.router.navigateByUrl("/");
      }
    })
  }

  openLoginModal() {
    this.dialogService.open(AuthModalComponent, {
      autoFocus: false,
    });
  }
}
