import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products?: Product[];
  currentProduct: Product = {};
  currentIndex = -1;
  key = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.retrieveProduct();
  }

  retrieveProduct(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        console.log(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  refreshList(): void {
    this.retrieveProduct();
    this.currentProduct = {};
    this.currentIndex = -1;
  }

  removeAllProducts(): void {
    this.productService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  setActiveProduct(product: Product, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
    console.log('voo nef');
  }

  searchDescription(): void {
    this.currentIndex = -1;
    this.currentProduct = {};

    this.productService.finByKey(this.key).subscribe({
      next: (data) => {
        this.products = data;
        console.log(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
