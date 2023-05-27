import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import * as bycrpt from 'bcrypt';
import { Shop } from '../shop/shop.entity';
import { Order } from '../order/order.entity';
import { Cart } from '../cart/cart.entity';
import { Payment } from '../payment/payment.entity';
import { Review } from '../review/review.entity';
import { Notification } from '../notification/notification.entity';
import { UserRoles } from './user-types';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  user_name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  address: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column({
    nullable: true,
  })
  photo: string;

  @Column({
    type : 'enum',
    enum : UserRoles,
    default : UserRoles.user
  })
  role : string 

  @OneToMany(() => Shop, (shop) => shop.shop_owner, {onDelete : 'CASCADE'})
  shops: Shop[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bycrpt.hash(this.password, 12);
  }

  static async comparePassword(candidatePass: string, hashedPass: string) {
    return await bycrpt.compare(candidatePass, hashedPass);
  }
}
