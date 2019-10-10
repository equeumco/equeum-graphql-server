import { ApolloServer, gql } from 'apollo-server-express';
import { buildFederatedSchema } from '@apollo/federation';
import { EqueumContext, EqueumGraphQLServerParams } from './types';
import { GraphQLSchema } from 'graphql';

/**
 * GraphQL server implementation
 */
class EqueumGraphQLServer {
  schema: GraphQLSchema;
  /**
   * Configures and sets up the server and binds it to Express app.
   *
   * @param params Server parameters
   */
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
    this.schema = schema;

    const server = new ApolloServer({
      schema,
      context: ({ req }: { req: any }): EqueumContext => {
        return {
          user: req.user,
          authHeader: req.headers.authorization || '',
        };
      },
    });

    server.applyMiddleware({ app });
  }

  getSchema(): GraphQLSchema {
    return this.schema;
  }
}

export default EqueumGraphQLServer;
