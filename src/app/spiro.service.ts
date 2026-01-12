import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Spiro {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get('https://dummyjson.com/products');
  }

  getSingleProduct(id: string): Observable<any> {
    return this.http.get(`https://dummyjson.com/products/${id}`);
  }
}
