import { ApolloServer } from 'apollo-server-express';
import { Application, Request } from 'express';
// import { buildTypeDefsAndResolvers } from 'type-graphql';
import { IResolvers, ITypeDefinitions, makeExecutableSchema } from 'graphql-tools';

interface EqueumGraphQLServerParams {
  app: Application;
  typeDefs: ITypeDefinitions;
  resolvers: IResolvers<any, any> | IResolvers<any, any>[];
}

class EqueumGraphQLServer {
  constructor(params: EqueumGraphQLServerParams) {
    const {
      app,
      typeDefs,
      resolvers,
    } = params;

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const server = new ApolloServer({
      schema,
      context: ({ req }: { req: Request }) => {
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

export default EqueumGraphQLServer;
