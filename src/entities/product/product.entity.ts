import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base.entity";
import { Category } from "../category/category.entity";
import { Review } from "../review/review.entity";
import { Shop } from "../shop/shop.entity";
import { ProductImg } from "../_imgs/product_img.entity";


@Entity('products')
export class Product extends BaseEntity {

    @Column({
        unique : true
    })
    product_name: string

    @Column()
    product_description: string

    @Column()
    product_price: number

    @Column()
    product_stock_quantity: number

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({
        name: 'category_id',

    })
    category: Category

    @ManyToOne(() => Shop, shop => shop.products)
    @JoinColumn({
        name: 'shop_id'
    })
    shop: Shop

    @OneToMany(() => Review, review => review.product)
    reviews: Review[]

    @OneToMany(() => ProductImg, p_imgs => p_imgs.product)
    product_imgs: ProductImg[]
}