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
        const userAgent = useragent.parse(null).toJSON();
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
      engine: {
        apiKey: 'service:equeum-graph:G6kztz2UtMz_JuSJAe9hyw',
        debugPrintReports: true,
        sendHeaders: { all: true },
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
