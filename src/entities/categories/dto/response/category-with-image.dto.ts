import { Exclude, Type } from "class-transformer";
import { ExposeProperty } from "../../../common/decorators/expose-property.decorator.js";
import { CategoryDto } from "./category.dto.js";
import { ImageDto } from "../../../images/dto/response/image.dto.js";

@Exclude()
export class CategoryWithImageDto extends CategoryDto {
  @ExposeProperty({ type: ImageDto })
  @Type(() => ImageDto)
  image: ImageDto;
}
