import { IsNumber, IsString } from "class-validator"


export class CreatePorductDto {

    @IsString()
    name: string

    @IsString()
    category_name: string

    @IsString()
    description: string

    @IsNumber()
    price: number

    @IsNumber()
    stock_quantity : number
}