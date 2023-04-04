import { notificationType } from "src/notification/notification.interfaces";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../base.entity";
import { User } from "../user/user.entity";

@Entity('notifications')
export class Notification extends BaseEntity {

    @Column({
        type: 'enum',
        enum: notificationType
    })
    notification_type: notificationType.delivery_update

    @Column()
    notification_msg: string

    @Column()
    is_read: boolean

    @ManyToOne(() => User, user => user.notifications)
    @JoinColumn({
        name: 'user_id'
    })
    user: User

}