import { EqueumGraphQLServerParams } from './types';
import { GraphQLSchema } from 'graphql';
/**
 * GraphQL server implementation
 */
declare class EqueumGraphQLServer {
    schema: GraphQLSchema;
    /**
     * Configures and sets up the server and binds it to Express app.
     *
     * @param params Server parameters
     */
    constructor(params: EqueumGraphQLServerParams);
    getSchema(): GraphQLSchema;
}
export default EqueumGraphQLServer;
