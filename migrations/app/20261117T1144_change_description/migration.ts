#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/aa066fa6b87d9bb7524432255ce910d8fa4d87b1be5b73caeecd6f7cc07c4feb/contract';
import startContract from '../../snapshots/aa066fa6b87d9bb7524432255ce910d8fa4d87b1be5b73caeecd6f7cc07c4feb/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/c6e21ae114be88762d1b2befc8e64f98fc32eae0201c2fc0bceebde63eb40488/contract';
import endContract from '../../snapshots/c6e21ae114be88762d1b2befc8e64f98fc32eae0201c2fc0bceebde63eb40488/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      ...this.renameColumn({
        schema: 'public',
        table: 'products',
        column: 'discrption',
        to: 'description',
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
