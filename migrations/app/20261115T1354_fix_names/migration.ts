#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/aa066fa6b87d9bb7524432255ce910d8fa4d87b1be5b73caeecd6f7cc07c4feb/contract';
import endContract from '../../snapshots/aa066fa6b87d9bb7524432255ce910d8fa4d87b1be5b73caeecd6f7cc07c4feb/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/ab31ff6511aa1a7df96829554bb864d0d1f55bc35e74eceeb877a46903e39abd/contract';
import startContract from '../../snapshots/ab31ff6511aa1a7df96829554bb864d0d1f55bc35e74eceeb877a46903e39abd/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropNotNull({ schema: 'public', table: 'images', column: 'product_id' }),
      this.setNotNull({ schema: 'public', table: 'users', column: 'name' }),
      this.setNotNull({ schema: 'public', table: 'users', column: 'username' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
