import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsPositive, IsString } from "class-validator";
import { EntityExist } from "../../../common/deceretors/entity-exsist.decorator.js";
import { TransformToBoolean } from "../../../common/deceretors/transform-to-boolean.decorator.js";

export class CreateOrderDto {}
