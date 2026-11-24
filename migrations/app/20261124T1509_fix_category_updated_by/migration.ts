#!/usr/bin/env -S node
import type { Contract as End } from "../../snapshots/6e809506dc27efc84881f4f1e5aebefcb885231a901a3c55836b727ec4675de2/contract";
import endContract from "../../snapshots/6e809506dc27efc84881f4f1e5aebefcb885231a901a3c55836b727ec4675de2/contract.json" with { type: "json" };
import type { Contract as Start } from "../../snapshots/cba04c622d84c6408f1bb11ec097d405936b72fbef45910e3f83fea13b168d8e/contract";
import startContract from "../../snapshots/cba04c622d84c6408f1bb11ec097d405936b72fbef45910e3f83fea13b168d8e/contract.json" with { type: "json" };
import { Migration, MigrationCLI } from "@prisma/orm-postgres/migration";

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.alterColumnType({
        schema: "public",
        table: "category",
        column: "updated_by",
        type: "int4",
        using: "NULL::int4",
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
