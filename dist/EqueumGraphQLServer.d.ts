import { EqueumGraphQLServerParams } from './types';
/**
 * GraphQL server implementation
 */
declare class EqueumGraphQLServer {
    /**
     * Configures and sets up the server and binds it to Express app.
     *
     * @param params Server parameters
     */
    constructor(params: EqueumGraphQLServerParams);
}
export default EqueumGraphQLServer;
