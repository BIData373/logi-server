import { BadRequestException } from "@nestjs/common";

export function ToIdArr(arr: number[]): { id: number }[] {
  return arr.map((id) => {
    if (!Number.isSafeInteger(id))
      throw new BadRequestException(`Invalid ID: ${id} id need to be integer`);
    return { id };
  });
}
