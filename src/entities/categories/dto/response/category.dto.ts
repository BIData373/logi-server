import { Exclude } from "class-transformer";
import { ExposeProperty } from "../../../common/decorators/expose-property.decorator.js";

@Exclude()
export class CategoryDto {
  @ExposeProperty()
  name: string;

  @ExposeProperty()
  slug: string;

  @ExposeProperty()
  id: number;

  @ExposeProperty()
  deletedAt: Date;

  @ExposeProperty()
  createdAt: Date;
}
