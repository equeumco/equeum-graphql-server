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

To ensure the stability of our services we always specify exact version of the library that we are including. Therefore we are sure that 'npm install' will always install the same version no matter what. Developers then need to update the version for each service manually when that is needed (or together with routinely updating all outdated third-party packages).

```
npm install git+https://github.com/equeumco/equeum-graphql-server#X.Y.Z
```

Where 'X.Y.Z' is the [latest version of the library](../../releases/latest).

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
  // We need to pass this here to make sure /graphql route is just checked for auth
  // but not handled by REST server and left for GraphQL server
  passThroughRoutes: ['/graphql'],
  addAuthToRoutes: ['/graphql]
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

Main class containing GraphQL server implementation. [Working example](#working-example) has copy-paste ready code to bootsrap the server.

### Authentification

EqueumGraphQL server relies on EqueumRESTServer to verify JWT token and add user data to request object. It expects all requests that pass REST server auth middleware to be authenticated. It then reads user data from request object and populates GraphQL context with that data.

### Constructor Parameters

#### app: Application
Express app object to build the server over

#### typeDefs: any
GraphQL type definitions

#### resolvers: IResolvers<any, any> | IResolvers<any, any>[]
Resolver functions

#### loaders: { [key: string]: DataLoader<string, any> }
Custom data loaders. We use [DataLoader](https://github.com/graphql/dataloader) utility to batch and optimise resolving queries. Loaders passed here will be added to context and available to use in your resolvers.

## Types

### EqueumContext

This type defines context that will be available inside each resolver.

## Decorators

### RequireRole

Decorator to be used for access control. By default we suppose that all GraphQL resources are accessible to all users. If we want to limit the access to specific resource, we can add RequireRole decorator to resolver annotation. Valid roles are 'ADMIN' or 'MACHINE', you can also supply multiple roles that are allowed to access this resource by providing an array like ['ADMIN', 'MACHINE'].

```
@RequireRole('ADMIN')
@Query(returns => String)
async test(): Promise<string> {
  return 'I will only be seen by ADMIN';
}
```

```
@RequireRole(['ADMIN', 'MACHINE'])
@Query(returns => String)
async test(): Promise<string> {
  return 'I will only be seen by ADMIN or MACHINE';
}
```

### RequireRoleAtLeast

Similar to `RequireRole` decorator but a little different in terms of how it performs role checks. This decorator is used to limit GraphQL resources to users who have at least certain role defined in [UserRoles](https://github.com/equeumco/equeum-graphql-server/blob/master/lib/constants.ts). For example, `@RequireRoleAtLeast('ADMIN')` equivalents to `@RequireRole(['ADMIN', 'MACHINE'])`.

```
@RequireRoleAtLeast('ADMIN')
@Query(returns => String)
async test(): Promise<string> {
  return 'I will only be seen by ADMIN or MACHINE.';
}
```

## Error handling

All the errors thrown inside resolvers are returned to user. Currently way too detailed error information is sent back. Error handling is a subject to be upgraded heavily in a near future.

Here are exported error classes you can use in your code for standard error responses.

### NotAnOwnerError

Error to be thrown when the uswer is not an owner of the entity he is trying to access or change.

## Documentation

Class and type reference can be found under [/docs](./docs)
