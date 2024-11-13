import { CommonModule, JsonPipe } from '@angular/common';
import { MatError, MatLabel } from '@angular/material/form-field';
import { MatCard } from '@angular/material/card';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../core/services/snackbar.service';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule, FormsModule, MatCard,
    MatLabel, MatButton, MatDialogClose, MatDialogContent,
    MatDialogTitle, MatButton, MatInput, MatFormField, JsonPipe, MatError, TextInputComponent],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss',
})

export class AuthModalComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private dialogRef = inject(MatDialogRef<AuthModalComponent>);
  private snack = inject(SnackbarService);
  private router = inject(Router);
  returnUrl = "/shop";
  validationErrors?: string[];

  constructor() {
    const url = inject(MAT_DIALOG_DATA)?.returnUrl || "/";
    if (url) this.returnUrl = url;
  }

  isLoginMode = true;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, , Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    confirmPassword: ['', Validators.required]
  });

  onSubmit() {
    if (this.isLoginMode) {
      this.accountService.login(this.loginForm.value).subscribe({
        next: () => {
          this.accountService.getUserInfo().subscribe();
          this.dialogRef.close();
          this.router.navigateByUrl(this.returnUrl);
        }
      })
    }
    else {
      const { password, confirmPassword } = this.registerForm.value;
      if (password !== confirmPassword) {
        // Add the error message to validationErrors
        this.validationErrors = ["Passwords must match."];
        return;
      }
      this.accountService.register(this.registerForm.value).subscribe({
        next: () => {
          this.snack.success("Registration successful - You can now login");
          this.toggleMode();
        },
        error: errors => this.validationErrors = errors
      })
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
