import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { MatBadge } from "@angular/material/badge";
import { MatDialog } from '@angular/material/dialog';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { AccountService } from '../../core/services/account.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatProgressBar } from "@angular/material/progress-bar";
import { BusyService } from '../../core/services/busy.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    MatBadge,
    RouterLink,
    RouterLinkActive,
    MatProgressBar
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  private dialogService = inject(MatDialog);
  accountService = inject(AccountService);
  busyService = inject(BusyService);
  cartService = inject(CartService);

  openLoginModal() {
    this.dialogService.open(AuthModalComponent);
  }
}
