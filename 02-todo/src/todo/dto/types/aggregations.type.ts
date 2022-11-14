import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: ' Todo Quick Aggregations' })
export class AggregationsType {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  pending: number;

  @Field(() => Int)
  completed: number;

  @Field(() => Int, { deprecationReason: 'Use total instead' })
  totalTodosCompleted: number;
}
