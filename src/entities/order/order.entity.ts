import { deliveryStatus, paymentMethods } from "src/order/order.interfaces";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base.entity";
import { User } from "../user/user.entity";
import { OrderItem } from "./oredrItem.entity";

@Entity('orders')
export class Order extends BaseEntity {

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn({
        name: 'user_id'
    })
    user: User

    @Column()
    total_cost: number

    @Column()
    delivery_cost: number

    @Column({
        type: 'enum',
        enum: paymentMethods
    })
    payment_method: paymentMethods.cash_on_delivery

    @Column({
        type: 'enum',
        enum: deliveryStatus
    })
    delivery_status: deliveryStatus.pending

    @Column()
    delivery_address: string

    @OneToMany(() => OrderItem, item => item.order)
    order_items : OrderItem[]
}