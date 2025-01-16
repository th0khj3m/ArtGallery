import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AccountService } from './core/services/account.service';
import { HeaderComponent } from "./layout/header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = "PoemArtGallery";
  private accountService = inject(AccountService);

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  isHomeRoute(): boolean {
    return this.router.url === '/';
  }

  setCurrentUser() {
    const userString = localStorage.getItem("user");
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }
}
