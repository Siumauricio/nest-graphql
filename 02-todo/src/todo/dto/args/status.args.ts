import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsBoolean } from 'class-validator';

@ArgsType()
export class StatusArgs {
  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
