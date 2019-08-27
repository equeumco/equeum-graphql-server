import { Application } from 'express';
import { IResolvers } from 'graphql-tools';
interface EqueumGraphQLServerParams {
    app: Application;
    typeDefs: any;
    resolvers: IResolvers<any, any> | IResolvers<any, any>[];
}
declare class EqueumGraphQLServer {
    constructor(params: EqueumGraphQLServerParams);
}
export default EqueumGraphQLServer;
