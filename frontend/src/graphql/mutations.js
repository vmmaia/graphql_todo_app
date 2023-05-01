import { gql } from '@apollo/client';

const mutations = {
    CREATE_TODO: gql`
        mutation ($name: String!, $priority: Priorities!, $flagged: Boolean, $description: String) {
            createTodo(name: $name, priority: $priority, flagged: $flagged, description: $description) {
                id
                name
                description
                priority
                flagged
            }
        }
    `,
    UPDATE_TODO: gql`
        mutation ($id: Int!, $name: String, $priority: Priorities, $flagged: Boolean, $description: String) {
            updateTodo(id: $id, name: $name, priority: $priority, flagged: $flagged, description: $description) {
                id
                name
                description
                priority
                flagged
            }
        }
    `,
    DELETE_TODO: gql`
        mutation ($id: Int!) {
            deleteTodo(id: $id)
        }
    `,
};

export default mutations;
