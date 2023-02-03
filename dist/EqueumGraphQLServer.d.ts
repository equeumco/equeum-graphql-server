import { ApolloServer } from '@apollo/server';
import { EqueumContext, EqueumGraphQLServerParams } from './types';
/**
 * GraphQL server implementation
 */
declare class EqueumGraphQLServer {
    private params;
    server: ApolloServer<EqueumContext>;
    /**
   * Configures and sets up the server and binds it to Express app.
   *
   * @param params Server parameters
   */
    constructor(params: EqueumGraphQLServerParams);
    initialize(): Promise<void>;
}
export default EqueumGraphQLServer;
