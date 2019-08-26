import { Application } from 'express';
import { IResolvers, ITypeDefinitions } from 'graphql-tools';
interface EqueumGraphQLServerParams {
    app: Application;
    typeDefs: ITypeDefinitions;
    resolvers: IResolvers<any, any> | IResolvers<any, any>[];
}
declare class EqueumGraphQLServer {
    constructor(params: EqueumGraphQLServerParams);
}
export default EqueumGraphQLServer;
