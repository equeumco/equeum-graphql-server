import { ApolloServer } from 'apollo-server-express';
import { EqueumGraphQLServerParams } from './types';
/**
 * GraphQL server implementation
 */
declare class EqueumGraphQLServer {
    server: ApolloServer;
    /**
   * Configures and sets up the server and binds it to Express app.
   *
   * @param params Server parameters
   */
    constructor(params: EqueumGraphQLServerParams);
    createTestClient(): import("apollo-server-testing").ApolloServerTestClient;
}
export default EqueumGraphQLServer;
