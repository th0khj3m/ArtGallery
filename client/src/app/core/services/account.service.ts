import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../shared/models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "https://localhost:7198/api/";
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);

  login(model: any) {
    return this.http.post<User>(this.baseUrl + "account/login", model).pipe(
      map(user => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    )
  }

  register(model:any) {
  }

  logout() {
    localStorage.removeItem("user");
    this.currentUser.set(null);
  }

  getUsers() {
    return this.http.get(this.baseUrl + "users");
  }

}
