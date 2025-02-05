import { inject, Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { forkJoin, of, tap } from 'rxjs';
import { AccountService } from './account.service';
import { SignalrService } from './signalr.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private cartService = inject(CartService);
  private accountService = inject(AccountService);
  private signalrService = inject(SignalrService)

  init() {
    const cartId = localStorage.getItem("cart_id");
    //Kiểm tra nếu có cartId thì gọi service để lấy giỏ hàng, nếu không có thì trả về null dưới dạng Observable
    const cart$ = cartId ? this.cartService.getCart(cartId) : of(null) 

    return forkJoin({ //Hàm dùng để kết hợp nhiều Observable và trả về kết quả của tất cả các Obs đấy
      cart: cart$,
      user: this.accountService.getUserInfo().pipe(
        tap(user => {
          if (user) this.signalrService.createHubConnection(); //Nếu user tồn tại, tạo kết nối SignalR
        })
      )
    })
  }
}
