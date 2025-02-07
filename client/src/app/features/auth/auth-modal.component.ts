import { CommonModule, JsonPipe } from '@angular/common';
import { MatError, MatLabel } from '@angular/material/form-field';
import { MatCard } from '@angular/material/card';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
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
  private returnUrl: string;
  private passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  validationErrors?: string[];
  isLoginMode = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.returnUrl = data?.returnUrl || "/";
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, , Validators.email]],
    password: ['', Validators.required],
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
      if (typeof password === 'string' && !this.passwordPattern.test(password)) {
        this.validationErrors = [
          "Password must contain at least one letter, one number, one special character (@$!%*?&), and be at least 8 characters long."
        ];
        return;
      }

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
    const activeForm = this.isLoginMode ? this.loginForm : this.registerForm;
    activeForm.reset();
    this.validationErrors = undefined; // Clear manual validation errors
  }
}
