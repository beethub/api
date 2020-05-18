import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolvers";
import { KeycloakSchemaDirectives } from "keycloak-connect-graphql";
import path from "path";
import { fileLoader, mergeTypes } from "merge-graphql-schemas";

const typesArray = fileLoader(path.join(__dirname, "./schema/*.gql"));

const typeDefs = mergeTypes(typesArray, { all: true });

const schema = makeExecutableSchema({
  typeDefs: [typeDefs],
  schemaDirectives: {
    auth: KeycloakSchemaDirectives.auth,
    hasRole: KeycloakSchemaDirectives.hasRole,
  },
  resolvers: resolvers as any,
});

export default schema;
