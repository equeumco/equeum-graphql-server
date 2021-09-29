import { ApolloServer, gql, ServerRegistration } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import useragent from 'useragent';
import { EqueumContext, EqueumGraphQLServerParams } from './types';
import { getPackageVersion } from './utils';

/**
 * GraphQL server implementation
 */
class EqueumGraphQLServer {
    server: ApolloServer;
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
            onHealthCheck,
        } = params;

        this.server = new ApolloServer({
            typeDefs: gql(typeDefs),
            resolvers: resolvers as any,
            context: ({ req }: { req: any }): EqueumContext => {
                const authHeader: string = req.headers.authorization || '';
                const headerParts = authHeader.split(' ');
                const authToken = headerParts && headerParts.length > 1 ? headerParts[1] : '';
                const userAgent = useragent.parse(req.headers['user-agent']).toJSON();
                const loaderInstances = {};
                Object.keys(loaders).map((key) => {
                    loaderInstances[key] = loaders[key]();
                });
                // isInternal flag should be set inside request object
                // if you use right equeum-rest-server version.s
                return {
                    authToken,
                    authHeader,
                    userAgent,
                    user: req.user,
                    isInternal: req.headers['is-internal'] === 'true',
                    loaders:loaderInstances,
                };
            },
            formatError: (err) => {
                console.error(err);
                return err;
            },
        });
        const middlewares: ServerRegistration = { app };
        if (onHealthCheck) {
            middlewares.onHealthCheck = onHealthCheck;
        }
        this.server.applyMiddleware(middlewares);
        console.log(`EqueumGraphQLServer (v${getPackageVersion()}) initialized.`);
    }
    createTestClient() {
        return createTestClient(this.server);
    }
}

export default EqueumGraphQLServer;
