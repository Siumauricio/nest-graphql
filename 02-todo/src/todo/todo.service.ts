import { UpdateTodoInput } from './dto/inputs/update-todo.input';
import { Injectable } from '@nestjs/common';
import { CreateTodoInput } from './dto/inputs';
import { Todo } from './entity/todo.entity';
import { StatusArgs } from './dto/args/status.args';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      description: 'Learn GraphQL',
      done: false,
    },
    {
      id: 2,
      description: 'Probando GraphQL',
      done: true,
    },
    {
      id: 3,
      description: 'Testeando GraphQL',
      done: false,
    },
    {
      id: 4,
      description: 'Hola GraphQL',
      done: true,
    },
  ];

  get totalTodos(): number {
    return this.todos.length;
  }

  get completedTodos(): number {
    return this.todos.filter((todo) => todo.done).length;
  }

  get pendingTodos(): number {
    return this.todos.filter((todo) => !todo.done).length;
  }

  findAll(statusArgs: StatusArgs): Todo[] {
    const { status } = statusArgs;
    console.log(status);
    if (status !== undefined)
      return this.todos.filter((todo) => todo.done === status);
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new Error('Todo not found with id: ' + id);
    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.id = this.todos.length + 1;
    todo.description = createTodoInput.description;
    todo.done = false;
    this.todos.push(todo);
    return todo;
  }

  update(updateTodoInput: UpdateTodoInput): Todo {
    const { id, description, done } = updateTodoInput;
    const todoToUpdate = this.findOne(updateTodoInput.id);

    if (description) todoToUpdate.description = updateTodoInput.description;
    if (done !== undefined) todoToUpdate.done = updateTodoInput.done;

    this.todos = this.todos.map((todo) => {
      return todo.id === id ? todoToUpdate : todo;
    });

    return todoToUpdate;
  }

  delete(id: number): boolean {
    const todoToDelete = this.findOne(id);
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return todoToDelete ? true : false;
  }
}
