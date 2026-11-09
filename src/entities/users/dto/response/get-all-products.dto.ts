import { Exclude, Expose, Type, plainToInstance } from "class-transformer";
@Exclude()
export class GetAllProductsResponse {
  username: string;
  name: string;
  email: string;
}
