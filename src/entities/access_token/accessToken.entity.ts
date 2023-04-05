import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('access_tokens')
export class AccessToken {
    @PrimaryGeneratedColumn('increment')
    id : number

    @Column('longtext')
    token : string
}