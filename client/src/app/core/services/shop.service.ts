import { ShopParams } from './../../shared/models/shopParams';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from '../../shared/models/pagination';
import { Artwork } from '../../shared/models/artwork';

@Injectable({
  providedIn: 'root'
})

export class ShopService {
  baseUrl = "https://localhost:7198/api/"
  private http = inject(HttpClient);

  getArtworks(shopParams: ShopParams) {
    let params = new HttpParams();
    const { sort, priceRange, pageSize, pageNumber, search } = shopParams;

    if (priceRange) {
      params = params.append("minPrice", priceRange.low);
      params = params.append("maxPrice", priceRange.high);
    }

    if (sort) {
      params = params.append("sort", sort);
    }

    if (search) {
      params = params.append("search", shopParams.search);
    }

    params = params.append("pageSize", pageSize);
    params = params.append("pageIndex", pageNumber);

    return this.http.get<Pagination<Artwork>>(this.baseUrl + "artworks", { params });
  }

  getArtwork(id: number) {
    return this.http.get<Artwork>(this.baseUrl + "artworks/" + id);
  }
}
