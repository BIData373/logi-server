import { Allow } from "class-validator";

export class GetContextDto {
  @Allow()
  context: Object;
}
