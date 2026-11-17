import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { CreateUserDto } from "./dto/request/create-user.dto.js";

@Injectable()
export class UserService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}
  async createUser(user: CreateUserDto) {
    return await this.prisma.orm.User.create({
      email: user.email,
      username: user.username,
      name: user.name,
    });
  }
}
