import type { ModelName, Models } from "./model-name.type";

export type Relations<T extends ModelName> = keyof Models[T]["relations"];
