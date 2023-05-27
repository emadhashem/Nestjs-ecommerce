import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Product } from '../product/product.entity';

@Entity('file')
export class FileEntity extends BaseEntity {

  @ManyToOne(() => Product, (product) => product.files)
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;

  @Column()
  original_name: string;

  @Column()
  file_name: string;

  @Column()
  path: string;
}
