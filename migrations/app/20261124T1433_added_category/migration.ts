#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/a7f2b7b91702d1b16207faadaf1a36e99e417e0c29ba83ad2b69c99a6ebdcf8d/contract';
import startContract from '../../snapshots/a7f2b7b91702d1b16207faadaf1a36e99e417e0c29ba83ad2b69c99a6ebdcf8d/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/cba04c622d84c6408f1bb11ec097d405936b72fbef45910e3f83fea13b168d8e/contract';
import endContract from '../../snapshots/cba04c622d84c6408f1bb11ec097d405936b72fbef45910e3f83fea13b168d8e/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'category',
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
          col('image_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('updated_by', 'timestamptz(3)', {
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'], { name: 'category_pkey' })],
      }),
      this.addColumn({
        schema: 'public',
        table: 'images',
        column: col('category_id', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
      }),
      this.createIndex({
        schema: 'public',
        table: 'category',
        index: 'category_created_by_idx_e13bb8bf',
        columns: ['created_by'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'category',
        index: 'category_image_id_idx_07d46388',
        columns: ['image_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'images',
        index: 'images_category_id_idx_da7213d4',
        columns: ['category_id'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'category',
        foreignKey: {
          name: 'category_created_by_fkey',
          columns: ['created_by'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'category',
        foreignKey: {
          name: 'category_image_fkey',
          columns: ['image_id'],
          references: { schema: 'public', table: 'images', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'images',
        foreignKey: {
          name: 'images_category_id_fkey',
          columns: ['category_id'],
          references: { schema: 'public', table: 'category', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
