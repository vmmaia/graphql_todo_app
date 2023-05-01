import Priorities from '../enums/Priorities.js';

type Todo = {
    id: number;
    name: string;
    description?: string;
    priority: Priorities;
    flagged: boolean;
};

export default Todo;
