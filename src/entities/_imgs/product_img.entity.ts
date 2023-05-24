import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Product } from '../product/product.entity';

@Entity('product_imgs')
export class ProductImg extends BaseEntity {
  @ManyToOne(() => Product, (product) => product.product_imgs)
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;

  @Column()
  url: string;
}
