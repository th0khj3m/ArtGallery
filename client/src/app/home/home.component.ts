import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Artwork } from '../shared/models/artwork';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  baseUrl = "https://localhost:7198/api/"
  http = inject(HttpClient);
  users: any;
  artworks: Artwork[] = [];

  ngOnInit(): void {
    this.getArtworks();
    this.getUsers();
  }

  getUsers() {
    this.http.get(this.baseUrl + "users").subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log("Request has completed")
    })
  }

  getArtworks() {
    this.http.get<Pagination<Artwork>>(this.baseUrl + "artworks").subscribe({
      next: response => this.artworks = response.data,
      error: error => console.log(error),
      complete: () => console.log("Request has completed")
    })
  }
}
