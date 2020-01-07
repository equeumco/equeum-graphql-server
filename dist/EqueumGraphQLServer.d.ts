import { GraphQLSchema } from 'graphql';
import { EqueumGraphQLServerParams } from './types';
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
