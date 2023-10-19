import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentProduct: Product = {
    name: '',
    description: '',
    price: 0,
  };

  message = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      console.log(this.route.snapshot.params['id']);
      this.getProduct(this.route.snapshot.params['id']);
    }
  }

  getProduct(id: number): void {
    this.productService.get(id).subscribe({
      next: (data) => {
        this.currentProduct = data;
        // this.viewMode = true;
        console.log(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  updateProduct(): void {
    this.message = '';
    this.productService
      .update(this.currentProduct.name, this.currentProduct)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This product has been updated';
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  deleteProduct(): void {
    this.productService.delete(this.currentProduct.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
