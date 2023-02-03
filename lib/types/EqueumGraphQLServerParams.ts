import http from 'http';
import { IResolvers } from '@graphql-tools/utils';
import DataLoader from 'dataloader';
import { Application } from 'express';

/**
 * Object containing set of parameters that can be passed to the constructor
 * of EqueumGraphQLServer.
 */
interface EqueumGraphQLServerParams {
    /** Express app object to build the server over */
    app: Application;
    /** Express app object to build the server over */
    httpServer: http.Server;
    /** Resolver functions */
    resolvers: IResolvers<any, any>[];
    /** dataloader instance creators */
    loaders?: { [key: string]: () => DataLoader<string, any> };
}

export default EqueumGraphQLServerParams;
