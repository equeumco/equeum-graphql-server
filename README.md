# Equeum GraphQL Server

Implementation of GraphQL server. Takes in type definitions and resolvers and configures GraphQL server with authenticated user data in context and other standard things. Apollo Federation ready. Also exports Equeum specific type definitions.

## Requirements

Scripts inside package.json rely on [npx](https://www.npmjs.com/package/npx) to be installed globally. To install it run:

```
npm install -g npx
```

You also need EqueumRESTServer as it provides standard implementation for web service and provides authentification and security.

```
npm install git+ssh://github.com/equeumco/equeum-rest-server.git
```

## Installation

```
npm install git+ssh://github.com/equeumco/equeum-graphql-server.git
```

## Working example

```
import express, { Router, Request, Response } from 'express';
import EqueumRESTServer from 'equeum-rest-server';
import EqueumGraphQLServer from 'equeum-graphql-server';

const app = express();

const typeDefs = `
  type Query {
    testQuery: String
  }
`;

const resolvers = {
  Query: {
    testQuery: () => 'Test response'
  }
};

new EqueumRESTServer({
  app,
  // We need to pass this here to make sure /graphql path is not handled by REST server
  // and left for GraphQL server
  passThroughRoutes: ['/graphql']
});
new EqueumGraphQLServer({
  app,
  typeDefs,
  resolvers
});

const port: number = 4000;
app.listen(port, () => console.log(`Server is listening on http://localhost:${port}`));
```

If using [TypeGraphQL](https://typegraphql.ml/) for automatically generating schema you first build type definitions and resolvers and then pass them to the constructor.

```
import { buildTypeDefsAndResolvers } from 'type-graphql';

buildTypeDefsAndResolvers({ resolvers: [ ... ] }).then(({ typeDefs, resolvers }) => {
  new EqueumGraphQLServer({
    app,
    typeDefs,
    resolvers,
  });
});
```

## EqueumGraphQLServer (default export)

Main class containing GraphQL server implementation. [Working example](#Working Example) has copy-paste ready code to bootsrap the server.

### Authentification

EqueumGraphQL server relies on EqueumRESTServer to verify JWT token and add user data to request object. It expects all requests that pass REST server auth middleware to be authenticated. It then reads user data from request object and populates GraphQL context with that data.

## Types

### EqueumContext

This type defines context that will be available inside each resover.

## Error handling

All the errors thrown inside resolvers are returned to user. Currently way too detailed error information is sent back. Error handling is a subject to be upgraded heavily in a near future.

## Documentation

Class and type reference can be found under [/docs](./docs)