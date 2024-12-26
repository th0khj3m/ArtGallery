import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../shared/models/order';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [ RouterLink, DatePipe, DecimalPipe ],
  standalone: true,
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  private orderService = inject(OrderService);
  orders: Order[] = [];

  ngOnInit(): void {
    this.orderService.getOrdersForUsers().subscribe({
      next: orders => this.orders = orders
    })
  }
}
