import { Exclude, Expose } from "class-transformer";
@Exclude()
export class GetAllProductsResponse {
  @Expose()
  username: string;

  @Expose()
  name: string;

  @Expose()
  email: string;
}
