import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';

@Entity('reviews')
export class Review extends BaseEntity {
  @Column()
  rating: number;

  @Column()
  comment: string;

  @Column()
  is_public: boolean;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews)
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;
}
