import { GraphQLSchema } from 'graphql';
import { ApolloServer, gql } from 'apollo-server-express';
import { buildFederatedSchema } from '@apollo/federation';
import useragent from 'useragent';
import { EqueumContext, EqueumGraphQLServerParams } from './types';
import { getPackageVersion } from './utils';

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
      loaders = {},
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
        const authHeader: string = req.headers.authorization || '';
        const headerParts = authHeader.split(' ');
        const authToken = headerParts && headerParts.length > 1 ? headerParts[1] : '';
        console.log('-----user agent data in request header-----', req.headers['user-agent']);
        const userAgent = useragent.parse(req.headers['user-agent']).toJSON();
        const loaderInstances = {};
        Object.keys(loaders).map((key) => {
          loaderInstances[key] = loaders[key]();
        });
        return {
          user: req.user,
          authToken,
          authHeader,
          userAgent,
          loaders:loaderInstances,
        };
      },
      formatError: (err) => {
        console.error(err);
        return err;
      },
    });

    server.applyMiddleware({ app });
    console.log(`EqueumGraphQLServer (v${getPackageVersion()}) initialized.`);
  }

  getSchema(): GraphQLSchema {
    return this.schema;
  }
}

export default EqueumGraphQLServer;
