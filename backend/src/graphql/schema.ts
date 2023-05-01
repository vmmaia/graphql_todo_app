import res from './resolvers.js';

export const typeDefs = `
    enum Priorities{
        HIGH
        MEDIUM
        LOW
    }

    type Todo{
        id: Int!
        name: String!
        description: String
        priority: Priorities!
        flagged: Boolean!
    }

    type Query{
        getTodos(id: Int, priority: Priorities, flagged: Boolean): [Todo]
    }

    type Mutation{
        createTodo(name: String!, description: String, priority: Priorities!, flagged: Boolean): Todo
        updateTodo(id: Int!, name: String, description: String, priority: Priorities, flagged: Boolean): Todo
        deleteTodo(id: Int!): Boolean
    }
`;

export const resolvers = {
    Query: {
        getTodos: res.getTodos,
    },
    Mutation: {
        createTodo: res.createTodo,
        updateTodo: res.updateTodo,
        deleteTodo: res.deleteTodo,
    },
};
