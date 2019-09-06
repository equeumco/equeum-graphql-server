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
        const server = new apollo_server_express_1.ApolloServer({
            schema,
            context: ({ req }) => {
                return {
                    user: req.user,
                    authHeader: req.headers.authorization || '',
                };
            },
        });
        server.applyMiddleware({ app });
    }
}
exports.default = EqueumGraphQLServer;
//# sourceMappingURL=EqueumGraphQLServer.js.map