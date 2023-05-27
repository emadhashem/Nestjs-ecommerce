import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Category } from '../category/category.entity';
import { Review } from '../review/review.entity';
import { Shop } from '../shop/shop.entity';
import { FileEntity } from '../_imgs/file.entity';

@Entity('products')
export class Product extends BaseEntity {
  @Column()
  product_name: string;

  @Column()
  product_description: string;

  @Column()
  product_price: number;

  @Column()
  product_stock_quantity: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({
    name: 'category_id',
  })
  category: Category;

  @ManyToOne(() => Shop, (shop) => shop.products)
  @JoinColumn({
    name: 'shop_id',
  })
  shop: Shop;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @OneToMany(() => FileEntity, (files) => files.product)
  files: FileEntity[];
}
