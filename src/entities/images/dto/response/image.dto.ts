import { Exclude } from "class-transformer";
import { ExposeProperty } from "../../../common/decorators/expose-property.decorator.js";

@Exclude()
export class ImageDto {
  @ExposeProperty()
  name: string;

  @ExposeProperty()
  url: string;

  @ExposeProperty()
  id: number;
}
