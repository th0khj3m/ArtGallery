import { Component, inject } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, AuthModalComponent, MatButton],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css' ,
})

export class NavComponent {
  accountService = inject(AccountService);
  private dialogService = inject(MatDialog);
  model: any = {};

  logout() {
    this.accountService.logout();
  }

  openLoginModal() {
    this.dialogService.open(AuthModalComponent);
  }
}
