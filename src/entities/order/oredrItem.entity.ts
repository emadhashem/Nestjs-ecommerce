import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "../base.entity";
import { Product } from "../product/product.entity";
import { Order } from "./order.entity";

@Entity('order_items')
export class OrderItem extends BaseEntity {
    
    @ManyToOne(() => Order, order => order.order_items)
    @JoinColumn({
        name : 'order_id'
    })
    order : Order

    @OneToOne(() => Product)
    @JoinColumn({
        name : 'product_id'
    })
    product : Product

    @Column()
    count : number
}