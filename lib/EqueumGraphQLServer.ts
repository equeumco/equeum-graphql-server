import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { buildSchema } from 'type-graphql';
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
            loaders = {},
            resolvers,
            app,
            httpServer,
        } = this.params;
        const schema = await buildSchema({
            resolvers: resolvers as any,
            validate: { forbidUnknownValues: false },
        });
        this.server = new ApolloServer<EqueumContext>({
            schema,
            plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
            formatError: (err) => {
                console.error(err);
                return err;
            },
        });

        await this.server.start();
        app.use(
            '/graphql',
            expressMiddleware(this.server, {
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
            }),
        );

        console.log('🚀  Graphql Server ready, Version:', getPackageVersion());
    }
}

export default EqueumGraphQLServer;
