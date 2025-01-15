import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ShopComponent } from './features/shop/shop.component';
import { ArtworkDetailsComponent } from './features/shop/artwork-details/artwork-details.component';
import { TestErrorComponent } from './features/test-error/test-error.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ServerErrorComponent } from './shared/components/server-error/server-error.component';
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { authGuard } from './core/guards/auth.guard';
import { emptyCartGuard } from './core/guards/empty-cart.guard';
import { CheckoutSuccessComponent } from './features/checkout-success/checkout-success.component';
import { OrderComponent } from './features/orders/order.component';
import { OrderDetailedComponent } from './features/orders/order-detailed/order-detailed.component';
import { orderCompleteGuard } from './core/guards/order-complete.guard';

export const routes: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: "shop", component: ShopComponent
  },
  {
    path: "shop/:id", component: ArtworkDetailsComponent
  },
  {
    path: "shop/:id", component: ArtworkDetailsComponent
  },
  {
    path: "cart", component: CartComponent
  },
  {
    path: "checkout", component: CheckoutComponent, canActivate: [authGuard, emptyCartGuard]
  },
  {
    path: "checkout/success", component: CheckoutSuccessComponent, canActivate: [authGuard, orderCompleteGuard]
  },
  {
    path: "orders", component: OrderComponent, canActivate: [authGuard]
  },
  {
    path: "orders/:id", component: OrderDetailedComponent, canActivate: [authGuard]
  },
  {
    path: "test-error", component: TestErrorComponent
  },
  {
    path: "not-found", component: NotFoundComponent
  },
  {
    path: "server-error", component: ServerErrorComponent
  },
  {
    path: "**", redirectTo: "not-found", pathMatch: "full",
  },
];
