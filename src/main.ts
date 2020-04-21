import express, { Express, NextFunction, Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import Keycloak from "keycloak-connect";
import { KeycloakContext } from "keycloak-connect-graphql";
import { createLightship } from "lightship";
import { Server } from "http";

import { kcConfig } from "./config";
import schema from "./schema";
import ReceiptAPI from "./dataSources/receipt";

const app: Express = express();

const keycloak = new Keycloak({ scope: "openid" }, kcConfig as any);

app.use(keycloak.middleware());

const graphqlServer: ApolloServer = new ApolloServer({
  schema,
  context: ({ req }) => {
    return {
      kauth: new KeycloakContext({ req } as any),
    };
  },
  dataSources: () => ({
    receiptApi: new ReceiptAPI(),
  }),
});

app.use((req: Request, res: Response, next: NextFunction) => {
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

graphqlServer.applyMiddleware({ app });

const shutDownTime = 20 * 1000;

const lightship = createLightship({shutdownHandlerTimeout: shutDownTime});

const server: Server = app.listen({ port: 4000 }, () =>{
  console.log(`🚀 Server ready at http://:4000${graphqlServer.graphqlPath}`);
  lightship.signalReady();  
});

lightship.registerShutdownHandler(async () => {
  await new Promise((resolve, reject) =>{
    setTimeout(() => {
     resolve 
    }, shutDownTime);
  });
  server.close();
});

