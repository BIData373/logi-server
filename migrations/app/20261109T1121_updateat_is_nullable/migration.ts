#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/3fb72e343dd577ec0d61d7a7881fe7641270ea29d3b7ba954d6b89a528fc269d/contract';
import startContract from '../../snapshots/3fb72e343dd577ec0d61d7a7881fe7641270ea29d3b7ba954d6b89a528fc269d/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/ab31ff6511aa1a7df96829554bb864d0d1f55bc35e74eceeb877a46903e39abd/contract';
import endContract from '../../snapshots/ab31ff6511aa1a7df96829554bb864d0d1f55bc35e74eceeb877a46903e39abd/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropNotNull({ schema: 'public', table: 'images', column: 'updated_at' }),
      this.dropNotNull({ schema: 'public', table: 'products', column: 'updated_at' }),
      this.dropNotNull({ schema: 'public', table: 'users', column: 'updated_at' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
