import { gql } from '@apollo/client';

const queries = {
    GET_FULL_TODO_BY_ID: gql`
        query ($id: Int) {
            getTodos(id: $id) {
                id
                name
                description
                priority
                flagged
            }
        }
    `,
    GET_TODOS_BY_FLAGGED: gql`
        query ($flagged: Boolean) {
            getTodos(flagged: $flagged) {
                id
                name
                priority
                flagged
            }
        }
    `,
    GET_TODOS_BY_PRIORITY: gql`
        query ($priority: Priorities) {
            getTodos(priority: $priority) {
                id
                name
                priority
                flagged
            }
        }
    `,
    GET_ALL_TODOS: gql`
        query {
            getTodos {
                id
                name
                priority
                flagged
            }
        }
    `,
};

export default queries;
