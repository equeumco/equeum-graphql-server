import { Application } from 'express';
import { IResolvers } from 'graphql-tools';

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
}

export default EqueumGraphQLServerParams;
