import { Exclude, Expose } from "class-transformer";

@Exclude()
export class GetImageResponseDto {
  @Expose()
  name: string;
}
