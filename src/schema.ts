import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers  from "./resolvers";
import { KeycloakSchemaDirectives } from "keycloak-connect-graphql";
import path from "path";

const typeDefs: string = importSchema(path.join(__dirname, "./schema/schema.gql"));

const schema = makeExecutableSchema({
  typeDefs: [typeDefs],
  schemaDirectives: {
    auth: KeycloakSchemaDirectives.auth,
    hasRole: KeycloakSchemaDirectives.hasRole
  },
  resolvers: (resolvers as any)
});

export default schema;