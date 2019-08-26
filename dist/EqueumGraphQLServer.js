"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
// import { buildTypeDefsAndResolvers } from 'type-graphql';
const graphql_tools_1 = require("graphql-tools");
class EqueumGraphQLServer {
    constructor(params) {
        const { app, typeDefs, resolvers, } = params;
        const schema = graphql_tools_1.makeExecutableSchema({ typeDefs, resolvers });
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