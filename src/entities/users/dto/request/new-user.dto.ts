import { IsString } from "class-validator";

export class NewUserDto {
  @IsString()
  username: string;

  @IsString()
  name: string;

  @IsString()
  email: string;
}
