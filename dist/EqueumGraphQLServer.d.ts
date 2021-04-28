import { GraphQLSchema } from 'graphql';
import { ApolloServer } from 'apollo-server-express';
import { EqueumGraphQLServerParams } from './types';
/**
 * GraphQL server implementation
 */
declare class EqueumGraphQLServer {
    schema: GraphQLSchema;
    server: ApolloServer;
    /**
   * Configures and sets up the server and binds it to Express app.
   *
   * @param params Server parameters
   */
    constructor(params: EqueumGraphQLServerParams);
    getSchema(): GraphQLSchema;
    createTestClient(): import("apollo-server-testing").ApolloServerTestClient;
}
export default EqueumGraphQLServer;
