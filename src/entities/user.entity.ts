import { BeforeInsert, Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";
import * as bcrypt from 'bcrypt'

@Entity('users')
export class UserEntity extends BaseEntity {
    @Column()
    f_name: string
    @Column()
    l_name: string
    @Column({
        unique : true
    })
    email: string
    @Column()
    password: string
    @Column({
        nullable : true
    })
    address: string
    @Column({
        nullable : true
    })
    phone: string
    // @Column()
    // photo: string

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12)
    }

    static async comparePassword(candidatePass: string, hashedPass: string) {
        return await bcrypt.compare(candidatePass, hashedPass);
    }
}