import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  addToCart(product: Product) {

  }

  private async getOrCreateCart() {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) { // create new shopping cart and add to it
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return this.getCart(result.key);
    } else { // get existing shopping cart and add to it
      return this.getCart(cartId);
    }
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId);
  }
}
