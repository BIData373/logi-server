#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/a7f2b7b91702d1b16207faadaf1a36e99e417e0c29ba83ad2b69c99a6ebdcf8d/contract';
import endContract from '../../snapshots/a7f2b7b91702d1b16207faadaf1a36e99e417e0c29ba83ad2b69c99a6ebdcf8d/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/d89c94d7402e3623f4237ea7689e4a3adc8e5d9439adb0f1e831dbdff95448fb/contract';
import startContract from '../../snapshots/d89c94d7402e3623f4237ea7689e4a3adc8e5d9439adb0f1e831dbdff95448fb/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'cart_items',
        columns: [
          col('created_at', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('created_by', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('deleted_at', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('quantity', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('status', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('variant_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cart_items',
        index: 'cart_items_created_by_idx_e13bb8bf',
        columns: ['created_by'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cart_items',
        index: 'cart_items_variant_id_idx_4a7fac73',
        columns: ['variant_id'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'cart_items',
        foreignKey: {
          name: 'cart_item_created_by_fkey',
          columns: ['created_by'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'cart_items',
        foreignKey: {
          name: 'cart_item_variant_id_fkey',
          columns: ['variant_id'],
          references: { schema: 'public', table: 'variants', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
