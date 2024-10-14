import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { MatBadge } from "@angular/material/badge";
import { MatDialog } from '@angular/material/dialog';
import { AuthModalComponent } from '../../auth-modal/auth-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    MatBadge,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private dialogService = inject(MatDialog);

  openLoginModal() {
    this.dialogService.open(AuthModalComponent);
  }

}
