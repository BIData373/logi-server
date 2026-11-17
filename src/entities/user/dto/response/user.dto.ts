import { Exclude, Expose } from "class-transformer";
import { ExposeProperty } from "../../../common/deceretors/expose-property.decorator.js";
@Exclude()
export class UserDto {
  @ExposeProperty()
  username: string;

  @ExposeProperty()
  name: string;

  @ExposeProperty()
  email: string;
}
