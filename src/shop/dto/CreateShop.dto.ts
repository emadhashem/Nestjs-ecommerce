import { IsString } from 'class-validator';

export class CreateShopDto {
  @IsString()
  shop_name: string;

  @IsString()
  shop_phone_number: string;

  @IsString()
  shop_address: string;

  @IsString()
  shop_description: string;
}
