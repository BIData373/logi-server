import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/request/create-user.dto.js";
import { UserService } from "./user.service.js";
import { ApiBody, ApiOkResponse } from "@nestjs/swagger";

@Controller("users")
export class UserController {
  constructor(@Inject(UserService) private readonly service: UserService) {}
  @ApiOkResponse()
  @ApiBody({ type: CreateUserDto })
  @Post()
  async createUser(@Body() user: CreateUserDto) {
    await this.service.createUser(user);
  }
}
