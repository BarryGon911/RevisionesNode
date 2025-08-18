
import { IsMongoId, Min, IsInt } from 'class-validator';
export class AddItemDto {
  @IsMongoId() productId: string;
  @IsInt() @Min(1) quantity: number;
}
export class UpdateItemDto {
  @IsInt() @Min(1) quantity: number;
}
