import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { UpdateItemInput } from './dto/inputs/update-item.input';
import { CreateItemInput } from './dto/inputs/create-item.input';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  async createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
  ): Promise<Item> {
    return this.itemsService.create(createItemInput);
  }

  @Query(() => [Item], { name: 'findAll' })
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Query(() => Item, { name: 'findOne' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @Mutation(() => Item)
  async updateItem(
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
  ): Promise<Item> {
    return this.itemsService.update(updateItemInput.id, updateItemInput);
  }

  @Mutation(() => Item)
  removeItem(@Args('id', { type: () => ID }) id: string) {
    return this.itemsService.remove(id);
  }
}
