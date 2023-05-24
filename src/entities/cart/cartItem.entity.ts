import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Product } from '../product/product.entity';
import { Cart } from './cart.entity';

@Entity('cart_items')
export class CartItem extends BaseEntity {
  @ManyToOne(() => Cart, (cart) => cart.cart_items)
  @JoinColumn({
    name: 'cart_id',
  })
  cart: Cart;

  @OneToOne(() => Product)
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;
}
