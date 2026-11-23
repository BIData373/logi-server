#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/4f1277cfe21b75013108df6c3369341f79e7955ed890b51eda5bee7f86f5527b/contract';
import startContract from '../../snapshots/4f1277cfe21b75013108df6c3369341f79e7955ed890b51eda5bee7f86f5527b/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/d89c94d7402e3623f4237ea7689e4a3adc8e5d9439adb0f1e831dbdff95448fb/contract';
import endContract from '../../snapshots/d89c94d7402e3623f4237ea7689e4a3adc8e5d9439adb0f1e831dbdff95448fb/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'order_items',
        column: col('estimated_date', 'timestamptz(3)', {
          codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
        }),
      }),
      this.createIndex({
        schema: 'public',
        table: 'orders',
        index: 'order_created_By_e13bb8bf',
        columns: ['created_by'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'orders',
        foreignKey: {
          name: 'orders_created_by_fkey',
          columns: ['created_by'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
