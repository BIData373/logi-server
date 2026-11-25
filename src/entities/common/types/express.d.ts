import { Account } from "src/account/account.entity";

declare module "express" {
  interface Request {
    user?: { sub: number };
  }
}
