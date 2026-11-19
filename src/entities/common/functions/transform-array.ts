import { BadRequestException } from "@nestjs/common";

export function transformToIdArray(arr: number[]): { id: number }[] {
  return arr.map((id) => {
    return { id };
  });
}
