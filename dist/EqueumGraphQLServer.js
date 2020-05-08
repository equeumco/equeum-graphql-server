"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const federation_1 = require("@apollo/federation");
const useragent_1 = __importDefault(require("useragent"));
const utils_1 = require("./utils");
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
        const { app, typeDefs, loaders = {}, resolvers, } = params;
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
                const userAgent = useragent_1.default.parse(null).toJSON();
                const loaderInstances = {};
                Object.keys(loaders).map((key) => {
                    loaderInstances[key] = loaders[key]();
                });
                return {
                    user: req.user,
                    authToken,
                    authHeader,
                    userAgent,
                    loaders: loaderInstances,
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
        console.log(`EqueumGraphQLServer (v${utils_1.getPackageVersion()}) initialized.`);
    }
    getSchema() {
        return this.schema;
    }
}
exports.default = EqueumGraphQLServer;
//# sourceMappingURL=EqueumGraphQLServer.js.map