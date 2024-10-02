import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);
  users: any;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.http.get("https://localhost:7198/api/users").subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log("Request has completed")
    })
  }
}
