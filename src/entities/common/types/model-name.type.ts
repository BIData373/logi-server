import type { Contract } from "../../../prisma/contract";

export type ModelName = keyof Models;
export type Models = Contract["domain"]["namespaces"]["public"]["models"];
