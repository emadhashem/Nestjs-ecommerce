import { paymentMethods } from 'src/order/order.interfaces';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Order } from '../order/order.entity';
import { User } from '../user/user.entity';

@Entity('payments')
export class Payment extends BaseEntity {
  @Column()
  amount: number;

  @Column({
    type: 'enum',
    enum: paymentMethods,
  })
  payment_method: paymentMethods.cash_on_delivery;

  @OneToOne(() => Order)
  @JoinColumn({
    name: 'order_id',
  })
  order: Order;

  @ManyToOne(() => User, (user) => user.payments)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
}
