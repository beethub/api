import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers  from "./resolvers";
import { KeycloakSchemaDirectives } from "keycloak-connect-graphql";

const typeDefs: string = importSchema("src/schema/schema.gql");


const schema = makeExecutableSchema({
  typeDefs: [typeDefs],
  schemaDirectives: {
    auth: KeycloakSchemaDirectives.auth,
    hasRole: KeycloakSchemaDirectives.hasRole
  },
  resolvers: (resolvers as any)
});

export default schema;