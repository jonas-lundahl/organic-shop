import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import 'rxjs/add/operator/take'; // takes one object from observable and then unsubscribes

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {}; // set to non-null to avoid NullPointerException during page load
  id;
  defaultProductImage = 'http://futureuniversity.com/wp-content/uploads/sites/9/2015/02/default-placeholder-1024x1024-570x321.png';

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private productService: ProductService, private router: Router) {
    this.categories$ = this.categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).take(1).subscribe(p => this.product = p);
    }
  }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(this.id);
    this.router.navigate(['admin/products']);
  }

  ngOnInit() {
  }

}
