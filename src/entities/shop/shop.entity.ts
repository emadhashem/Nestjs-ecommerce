import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';

@Entity('shops')
export class Shop extends BaseEntity {
  @Column()
  shop_name: string;

  @Column()
  shop_description: string;

  @ManyToOne(() => User, (user) => user.shops)
  @JoinColumn({
    name: 'shop_owner_id',
  })
  shop_owner: User;

  @Column({ nullable: true })
  shop_address: string;

  @Column({ nullable: true })
  shop_phone_number: string;

  @OneToMany(() => Product, (product) => product.shop)
  products: Product[];
}
