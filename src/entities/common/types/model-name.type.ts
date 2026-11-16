import type { Contract } from "../../../prisma/contract";

export type ModelName =
  keyof Contract["domain"]["namespaces"]["public"]["models"];
