"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const federation_1 = require("@apollo/federation");
class EqueumGraphQLServer {
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
                return { no: 'context' };
            },
        });
        server.applyMiddleware({ app });
        // buildTypeDefsAndResolvers({ resolvers }).then(({ typeDefs, resolvers }:
        //   IExecutableSchemaDefinition<any>) => {
        //   const schema = makeExecutableSchema({ typeDefs, resolvers });
        //   const server = new ApolloServer({
        //     schema,
        //     context: ({ req }: { req: Request }) => {
        //       return { no: 'context' };
        //     },
        //   });
        //   server.applyMiddleware({ app });
        // });
    }
}
exports.default = EqueumGraphQLServer;
//# sourceMappingURL=EqueumGraphQLServer.js.map