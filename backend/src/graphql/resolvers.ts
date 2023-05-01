import { GetArgs, CreateArgs, DeleteArgs, UpdateArgs } from './types.js';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../database/db.js';
import Priorities, { priorities } from '../enums/Priorities.js';

export default {
    getTodos: (parent: object, args: GetArgs, context: object, info: object) => {
        const priority = args.priority ? priorities[args.priority] : undefined;

        return getTodos({ ...args, priority: priority });
    },
    createTodo: (parent: object, args: CreateArgs, context: object, info: object) => {
        const priority = args.priority ? priorities[args.priority] : Priorities.LOW;

        return createTodo({ ...args, priority: priority });
    },
    deleteTodo: (parent: object, args: DeleteArgs, context: object, info: object) => {
        return deleteTodo({ ...args });
    },
    updateTodo: (parent: object, args: UpdateArgs, context: object, info: object) => {
        const priority = args.priority ? priorities[args.priority] : undefined;

        return updateTodo({ ...args, priority: priority });
    },
};
