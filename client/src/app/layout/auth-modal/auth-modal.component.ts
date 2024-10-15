import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [FormsModule, MatDialogClose, MatDialogContent, MatDialogTitle],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.css',
})
export class AuthModalComponent {
  accountService = inject(AccountService);
  private dialogRef = inject(MatDialogRef<AuthModalComponent>);
  model: any = {};
  isRegistering = false; // This will determine which form to show

  toggleForm() {
    this.isRegistering = !this.isRegistering;
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.log(error)
    });
    this.dialogRef.close();
  }

  register() {
    console.log(this.model);
  }
}
