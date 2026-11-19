import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/request/create-user.dto.js";
import { UserService } from "./user.service.js";
import { ApiBody, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { ToSwaggerAndInstace } from "../common/deceretors/to-swagger-and-instace.decorator.js";
import { UserDto } from "./dto/response/user.dto.js";

@Controller("users")
export class UserController {
  constructor(private readonly service: UserService) {}
  @Post()
  @ApiOperation({ operationId: "createUser" })
  @ApiBody({ type: CreateUserDto })
  @ToSwaggerAndInstace(UserDto)
  async createUser(@Body() user: CreateUserDto) {
    return await this.service.createUser(user);
  }
}
