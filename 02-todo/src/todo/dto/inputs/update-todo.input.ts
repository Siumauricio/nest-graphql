import { Field, InputType, Int } from '@nestjs/graphql';
import {
  Min,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsInt,
  IsOptional,
  IsBoolean,
} from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id: number;

  @Field(() => String, {
    description: 'Description of the todo',
    nullable: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @IsOptional()
  description?: string;

  @Field(() => Boolean, {
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
