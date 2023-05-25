import { IsNotEmpty, IsString } from "class-validator";

export class UpdateShopDto {
    @IsString()
  shop_name: string;

  @IsString()
  shop_phone_number: string;

  @IsString()
  shop_address: string;

  @IsString()
  shop_description: string;

  @IsString()
  @IsNotEmpty()
  id : string

  constructor(partial : Partial<UpdateShopDto>) {
    Object.assign(this , partial);
  }
}