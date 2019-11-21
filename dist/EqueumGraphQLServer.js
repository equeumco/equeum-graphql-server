"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const federation_1 = require("@apollo/federation");
/**
 * GraphQL server implementation
 */
class EqueumGraphQLServer {
    /**
     * Configures and sets up the server and binds it to Express app.
     *
     * @param params Server parameters
     */
    constructor(params) {
        const { app, typeDefs, resolvers, } = params;
        const federatedTypeDefs = apollo_server_express_1.gql(typeDefs);
        const federatedResolvers = resolvers;
        const schema = federation_1.buildFederatedSchema([{
                typeDefs: federatedTypeDefs,
                resolvers: federatedResolvers,
            }]);
        this.schema = schema;
        const server = new apollo_server_express_1.ApolloServer({
            schema,
            context: ({ req }) => {
                const authHeader = req.headers.authorization || '';
                const headerParts = authHeader.split(' ');
                const authToken = headerParts && headerParts.length > 1 ? headerParts[1] : '';
                return {
                    user: req.user,
                    authToken,
                    authHeader,
                };
            },
            formatError: (err) => {
                console.error(err);
                return err;
            },
        });
        server.applyMiddleware({ app });
    }
    getSchema() {
        return this.schema;
    }
}
exports.default = EqueumGraphQLServer;
//# sourceMappingURL=EqueumGraphQLServer.js.map