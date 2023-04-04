import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Cart } from "src/entities/cart/cart.entity";
import { CartItem } from "src/entities/cart/cartItem.entity";
import { Category } from "src/entities/category/category.entity";
import { Notification } from "src/entities/notification/notification.entity";
import { Order } from "src/entities/order/order.entity";
import { OrderItem } from "src/entities/order/oredrItem.entity";
import { Payment } from "src/entities/payment/payment.entity";
import { Product } from "src/entities/product/product.entity";
import { Review } from "src/entities/review/review.entity";
import { Shop } from "src/entities/shop/shop.entity";
import { User } from "src/entities/user/user.entity";
import { ProductImg } from "src/entities/_imgs/product_img.entity";

export default (): TypeOrmModuleOptions => (
    {
        type: 'mysql',
        port: +process.env.DBPORT,
        host: process.env.DBHOST,
        username: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
        database: process.env.DBNAME,
        synchronize: true,
        entities: [User, Shop, Category,
            Product, ProductImg, Order,
            OrderItem, Cart, CartItem,
            Payment, Review, Notification
        ]
    }
)