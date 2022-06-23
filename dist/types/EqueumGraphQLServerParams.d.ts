import { Application, Request } from 'express';
import { IResolvers } from '@graphql-tools/utils';
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
    /** Resolver functions */
    resolvers: IResolvers<any, any> | IResolvers<any, any>[];
    /** dataloader instance creators */
    loaders?: {
        [key: string]: () => DataLoader<string, any>;
    };
    /** Healthcheck function */
    onHealthCheck?: (req: Request) => Promise<any>;
}
export default EqueumGraphQLServerParams;
