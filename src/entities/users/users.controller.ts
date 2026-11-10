import { Body, Controller, Inject, Post } from "@nestjs/common";
import type { NewUserDto } from "./dto/request/new-user.dto.js";
import { UsersService } from "./users.service.js";

@Controller("users")
export class UsersController {
  constructor(@Inject(UsersService) private readonly service: UsersService) {}

  @Post()
  async newProduct(@Body() user: NewUserDto) {
    await this.service.createUser(user);
  }
}
