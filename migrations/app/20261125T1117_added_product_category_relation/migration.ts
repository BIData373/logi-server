#!/usr/bin/env -S node

import type { Contract as Start } from "../../snapshots/6e809506dc27efc84881f4f1e5aebefcb885231a901a3c55836b727ec4675de2/contract";
import startContract from "../../snapshots/6e809506dc27efc84881f4f1e5aebefcb885231a901a3c55836b727ec4675de2/contract.json" with { type: "json" };

import type { Contract as End } from "../../snapshots/b470495aa12f2b03b778bee927519ef210eb135d28b575e56a1af19a615056a5/contract";
import endContract from "../../snapshots/b470495aa12f2b03b778bee927519ef210eb135d28b575e56a1af19a615056a5/contract.json" with { type: "json" };

import { Migration, MigrationCLI, col } from "@prisma/orm-postgres/migration";

import postgres from "@prisma/orm-postgres/runtime";
import { contractFromJson } from "@prisma/orm-postgres/static";

const { sql: db, contract } = postgres({
  contract: contractFromJson<End>(endContract),
});

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      // 1. Add nullable category_id column
      this.addColumn({
        schema: "public",
        table: "products",
        column: col("category_id", "int4", {
          codecRef: { codecId: "pg/int4@1" },
        }),
      }),

      // 2. Backfill existing products
      this.dataTransform(contract, "backfill-products-category_id", {
        backfillsColumn: {
          schema: "public",
          table: "products",
          column: "category_id",
        },

        check: () =>
          db.public.products
            .select("id")
            .where((f, fns) => fns.eq(f.category_id, null))
            .limit(1),

        run: () =>
          db.public.products
            .update({ category_id: 1 })
            .where((f, fns) => fns.eq(f.category_id, null)),
      }),

      // 3. Make category_id required
      this.setNotNull({
        schema: "public",
        table: "products",
        column: "category_id",
      }),

      // 4. Create index
      this.createIndex({
        schema: "public",
        table: "products",
        index: "products_category_id_idx_da7213d4",
        columns: ["category_id"],
      }),

      // 5. Create foreign key
      this.addForeignKey({
        schema: "public",
        table: "products",
        foreignKey: {
          name: "products_category_fkey",
          columns: ["category_id"],
          references: {
            schema: "public",
            table: "category",
            columns: ["id"],
          },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
