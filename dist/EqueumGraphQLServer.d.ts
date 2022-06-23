import { ApolloServer } from 'apollo-server-express';
import { EqueumGraphQLServerParams } from './types';
/**
 * GraphQL server implementation
 */
declare class EqueumGraphQLServer {
    private params;
    server: ApolloServer;
    /**
   * Configures and sets up the server and binds it to Express app.
   *
   * @param params Server parameters
   */
    constructor(params: EqueumGraphQLServerParams);
    initialize(): Promise<void>;
}
export default EqueumGraphQLServer;
