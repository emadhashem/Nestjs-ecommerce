import { IsString, MinLength } from "class-validator"

export class CreateShopDto {
    @IsString()
    @MinLength(5)
    name: string

    @IsString()
    address: string

    @IsString()
    phone: string

    email: string

    @IsString()
    description: string

}