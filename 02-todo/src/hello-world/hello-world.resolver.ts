import { Resolver, Query, Float, Int, Args } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, { description: 'Returns a string', name: 'hello' })
  helloWorld() {
    return 'Hello world!';
  }

  @Query(() => Float, { name: 'randomNumber' })
  getRandomNumber() {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: 'randomFromZeroTo',
    description: 'From 0 to argument To default(6)',
  })
  randomFromZeroTo(@Args('to', { type: () => Int }) to = 6): number {
    return Math.floor(Math.random() * to);
  }
}
