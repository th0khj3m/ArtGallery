import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from '../../shared/models/pagination';
import { Artwork } from '../../shared/models/artwork';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "https://localhost:7198/api/"
  private http = inject(HttpClient);

  getArtworks() {
    return this.http.get<Pagination<Artwork>>(this.baseUrl + "artworks?pageSize=15");
  }

}
