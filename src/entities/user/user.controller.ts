import { Body, Controller, Inject, Post } from "@nestjs/common";
import type { CreateUserDto } from "./dto/request/create-user.dto.js";
import { UserService } from "./user.service.js";

@Controller("users")
export class UserController {
  constructor(@Inject(UserService) private readonly service: UserService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    await this.service.createUser(user);
  }
}
