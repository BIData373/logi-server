import { BadRequestException } from "@nestjs/common";

export const transformToIdArr = ({ value }: { value: string }) => {
  const arr = value.split(",").map(Number);
  if (!Array.isArray(arr)) return value;
  return arr.map((id) => {
    if (!Number.isSafeInteger(id))
      throw new BadRequestException(`Invalid ID: ${id} id need to be integer`);
    return { id };
  });
};
