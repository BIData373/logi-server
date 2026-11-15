import { Body, Controller, Inject, Post } from "@nestjs/common";
import type { CreateUserDto } from "./dto/request/create-user.dto.js";
import { UsersService } from "./users.service.js";

@Controller("users")
export class UsersController {
  constructor(@Inject(UsersService) private readonly service: UsersService) {}

  @Post()
  async newProduct(@Body() user: CreateUserDto) {
    await this.service.createUser(user);
  }
}
