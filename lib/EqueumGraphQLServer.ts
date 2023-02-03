import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import useragent from 'useragent';
import { EqueumContext, EqueumGraphQLServerParams } from './types';
import { getPackageVersion } from './utils';

/**
 * GraphQL server implementation
 */
class EqueumGraphQLServer {
    server: ApolloServer<EqueumContext>;
    /**
   * Configures and sets up the server and binds it to Express app.
   *
   * @param params Server parameters
   */
    constructor(private params: EqueumGraphQLServerParams) {
    }
    async initialize() {
        const {
            typeDefs,
            loaders = {},
            resolvers,
        } = this.params;

        this.server = new ApolloServer<EqueumContext>({
            typeDefs,
            resolvers,
            formatError: (err) => {
                console.error(err);
                return err;
            },
        });
        const { url } = await startStandaloneServer(this.server, {
            context: async ({ req }) => {
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
                    user: {
                        ...(req as any).user,
                        headers: req.headers,
                        clientIP: req.headers['x-forwarded-for']?.toString(),
                    },
                    isInternal: req.headers['is-internal'] === 'true',
                    loaders: loaderInstances,
                };
            },
            listen: { port: 4000 },
        });
        console.log(`🚀  Server ready at ${url}, Version:`, getPackageVersion());
        await this.server.start();
    }
}

export default EqueumGraphQLServer;
