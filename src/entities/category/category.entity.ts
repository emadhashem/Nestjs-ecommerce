import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Product } from '../product/product.entity';

@Entity('category')
export class Category extends BaseEntity {
  @Column({
    unique: true,
  })
  category_name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
