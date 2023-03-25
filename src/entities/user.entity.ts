import { BeforeInsert, Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";
import bycrpt from 'bcrypt'

@Entity('users')
export class UserEntity extends BaseEntity {
    @Column()
    f_name: string
    @Column()
    l_name: string
    @Column()
    email: string
    @Column()
    password: string
    @Column()
    address: string
    @Column()
    phone: string
    // @Column()
    // photo: string

    @BeforeInsert()
    async hashPassword() {
        this.password = await bycrpt.hash(this.password, 12)
    }

    static async comparePassword(candidatePass: string, hashedPass: string) {
        return await bycrpt.compare(candidatePass, hashedPass);
    }
}