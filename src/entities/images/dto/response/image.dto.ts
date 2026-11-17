import { Exclude, Expose } from "class-transformer";
import { ExposeProperty } from "../../../common/deceretors/expose-property.decorator.js";

@Exclude()
export class ImageDto {
  @ExposeProperty()
  name: string;

  @ExposeProperty()
  url: string;
  @Expose()
  id: number;
}
