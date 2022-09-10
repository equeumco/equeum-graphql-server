"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
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
        this.params = params;
        const { typeDefs, loaders = {}, resolvers, } = params;
        this.server = new apollo_server_express_1.ApolloServer({
            typeDefs: (0, apollo_server_express_1.gql)(typeDefs),
            resolvers: resolvers,
            context: ({ req }) => {
                var _a;
                const authHeader = req.headers.authorization || '';
                const headerParts = authHeader.split(' ');
                const authToken = headerParts && headerParts.length > 1 ? headerParts[1] : '';
                const userAgent = useragent_1.default.parse(req.headers['user-agent']).toJSON();
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
                    user: Object.assign(Object.assign({}, req.user), { headers: req.headers, clientIP: (_a = req.headers['x-forwarded-for']) === null || _a === void 0 ? void 0 : _a.toString() }),
                    isInternal: req.headers['is-internal'] === 'true',
                    loaders: loaderInstances,
                };
            },
            formatError: (err) => {
                console.error(err);
                return err;
            },
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const { app, onHealthCheck, } = this.params;
            yield this.server.start();
            const middlewares = { app };
            if (onHealthCheck) {
                middlewares.onHealthCheck = onHealthCheck;
            }
            this.server.applyMiddleware(middlewares);
            console.log(`EqueumGraphQLServer (v${(0, utils_1.getPackageVersion)()}) initialized.`);
        });
    }
}
exports.default = EqueumGraphQLServer;
//# sourceMappingURL=EqueumGraphQLServer.js.map