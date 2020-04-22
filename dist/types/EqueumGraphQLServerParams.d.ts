import { Application } from 'express';
import { IResolvers } from 'graphql-tools';
import DataLoader from 'dataloader';
/**
 * Object containing set of parameters that can be passed to the constructor
 * of EqueumGraphQLServer.
 */
interface EqueumGraphQLServerParams {
    /** Express app object to build the server over */
    app: Application;
    /** GraphQL type definitions */
    typeDefs: any;
    /** Additional context parameters to be added */
    loaders: {
        [key: string]: typeof DataLoader;
    };
    /** Resolver functions */
    resolvers: IResolvers<any, any> | IResolvers<any, any>[];
}
export default EqueumGraphQLServerParams;
