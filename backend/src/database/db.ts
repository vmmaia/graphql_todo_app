import { GetArgs, CreateArgs, DeleteArgs, UpdateArgs } from '../graphql/types.js';
import Todo from '../types/Todo.js';

const todos: Array<Todo> = [];

export const getTodos = (args: GetArgs): Array<Todo> => {
    let res = todos;

    if (args.id !== undefined) {
        res = res.filter((t) => t.id === args.id);
    }

    if (args.priority !== undefined) {
        res = res.filter((t) => t.priority === args.priority);
    }

    if (args.flagged !== undefined) {
        res = res.filter((t) => t.flagged === args.flagged);
    }

    return res;
};

export const createTodo = (args: CreateArgs): Todo => {
    const newTodo: Todo = {
        id: todos.length + 1,
        name: args.name,
        description: args.description,
        priority: args.priority,
        flagged: args.flagged || false,
    };

    todos.push(newTodo);

    return newTodo;
};

export const updateTodo = (args: UpdateArgs) => {
    const todo: Todo | undefined = todos.find((t) => t.id === args.id);

    if (!todo) return false;

    todo.name = args.name ? args.name : todo.name;
    todo.description = args.description ? args.description : todo.description;
    todo.priority = args.priority ? args.priority : todo.priority;
    todo.flagged = args.flagged !== undefined ? args.flagged : todo.flagged;

    return todo;
};

export const deleteTodo = (args: DeleteArgs): boolean => {
    const idx = todos.findIndex((t) => t.id === args.id);

    if (idx === -1) return false;

    todos.splice(idx, 1);

    return true;
};
