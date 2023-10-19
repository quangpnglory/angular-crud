import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

const baseUrl = 'http://localhost:3333/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}/allProducts`);
  }

  get(id: any): Observable<Product> {
    // let url =
    //   typeof id == 'number' ? `${baseUrl}/${id}` : `${baseUrl}?name=${id}`;
    // return this.http.get<Product>(url);
    console.log(id);
    return this.http.get<Product>(`${baseUrl}/${id}`);
  }

  create(product: Product): Observable<any> {
    return this.http.post(`${baseUrl}/create`, product);
  }

  update(name?: string, product?: Product): Observable<any> {
    return this.http.patch(`${baseUrl}?name=${name}`, product);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  finByKey(key: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}?key=${key}`);
  }
}
