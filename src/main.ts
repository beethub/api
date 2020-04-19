import express, { Express, NextFunction, Request, Response } from "express";
import { ApolloServer  } from "apollo-server-express";
import schema from "./schema";
import ReceiptAPI from "./dataSources/receipt";
import Keycloak from "keycloak-connect";
import { KeycloakContext } from "keycloak-connect-graphql";
import { kcConfig } from "./config";

const app : Express = express();

console.log(kcConfig);

const keycloak = new Keycloak({ scope: "openid" }, kcConfig as any);

app.use(keycloak.middleware());

const server: ApolloServer = new ApolloServer({
  schema,
  context: ({ req }) => {
    return {
      kauth: new KeycloakContext({ req } as any),
    };
  },
  dataSources: () => ({
    receiptApi: new ReceiptAPI()
  })
});

app.use( (req :Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

