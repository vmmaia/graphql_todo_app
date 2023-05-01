import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './graphql/schema.js';

dotenv.config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, { listen: { port: parseInt(process.env.PORT) } });

console.log(`Apollo server listening at: ${url}`);
