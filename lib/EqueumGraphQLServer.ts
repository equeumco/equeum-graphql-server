import { ApolloServer, gql } from 'apollo-server-express';
import { Application } from 'express';
import { buildFederatedSchema } from '@apollo/federation';
import { IResolvers } from 'graphql-tools';
import { EqueumContext } from './types';

interface EqueumGraphQLServerParams {
  app: Application;
  typeDefs: any;
  resolvers: IResolvers<any, any> | IResolvers<any, any>[];
}

class EqueumGraphQLServer {
  constructor(params: EqueumGraphQLServerParams) {
    const {
      app,
      typeDefs,
      resolvers,
    } = params;

    const federatedTypeDefs = gql(typeDefs);
    const federatedResolvers: any = resolvers;

    const schema = buildFederatedSchema([{
      typeDefs: federatedTypeDefs,
      resolvers: federatedResolvers,
    }]);

    const server = new ApolloServer({
      schema,
      context: ({ req }: { req: any }): EqueumContext => {
        return {
          user: req.user,
        };
      },
    });

    server.applyMiddleware({ app });
  }
}

export default EqueumGraphQLServer;
