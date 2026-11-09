import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { NewUserDto } from "./dto/request/new-user.dto.js";

@Injectable()
export class UsersService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}
  async createUser(user: NewUserDto) {
    console.log(user);
    await this.prisma.orm.Users.create({
      email: user.email,
      username: user.username,
      name: user.name,
    });
  }
}
