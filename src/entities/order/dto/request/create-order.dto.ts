import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsPositive, IsString } from "class-validator";
import { EntityExist } from "../../../common/decorators/entity-exsist.decorator.js";
import { TransformToBoolean } from "../../../common/decorators/transform-to-boolean.decorator.js";

export class CreateOrderDto {}
