import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { User } from '../user/user.entity';
import { CartItem } from './cartItem.entity';

@Entity('carts')
export class Cart extends BaseEntity {
  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @OneToMany(() => CartItem, (cartItems) => cartItems.cart)
  cart_items: CartItem[];
}
