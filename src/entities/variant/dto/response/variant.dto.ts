import { Exclude, Expose, Type } from "class-transformer";
import { ExposeProperty } from "../../../common/deceretors/expose-property.decorator.js";
import { ImageDto } from "../../../images/dto/response/image.dto.js";

@Exclude()
export class VariantDto {
  @ExposeProperty()
  id: number;

  @ExposeProperty()
  name: string;

  @ExposeProperty()
  createdBy: number;

  @ExposeProperty()
  description: string;

  @ExposeProperty()
  sku: string;

  @ExposeProperty()
  isPrivate: boolean;
}
