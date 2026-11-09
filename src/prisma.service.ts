import { Injectable } from "@nestjs/common";
import { db } from "./prisma/db.js";

@Injectable()
export class PrismaService {
  readonly db = db;
  readonly orm = db.orm.public;
  readonly sql = db.sql.public;
}
