import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { SignalrService } from '../../core/services/signalr.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe, DecimalPipe, NgIf } from '@angular/common';
import { AddressPipe } from '../../shared/pipes/address.pipe';
import { PaymentCardPipe } from '../../shared/pipes/payment-card.pipe';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [
    MatButton, 
    RouterLink,
    MatProgressSpinnerModule,
    DatePipe,
    AddressPipe,
    DecimalPipe,
    PaymentCardPipe,
    NgIf
  ],
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.scss',
})
export class CheckoutSuccessComponent {
  signalrService = inject(SignalrService);
}
