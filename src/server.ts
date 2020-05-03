import { ApolloServer } from "apollo-server-express";
import Keycloak from "keycloak-connect";
import { KeycloakContext } from "keycloak-connect-graphql";
import { createLightship } from "lightship";

import { kcConfig } from "./config";
import schema from "./schema";
import ReceiptAPI from "./dataSources/receipts/receiptApi";
import App from "./app";
import FileDataSource from "./dataSources/fileDataSource";

const keycloak: Keycloak.Keycloak = new Keycloak({ scope: "openid" }, kcConfig as any);

const app = new App(4000, keycloak);

const graphqlServer: ApolloServer = new ApolloServer({
  schema,
  context: ({ req }) => {
    return {
      kauth: new KeycloakContext({ req } as any),
    };
  },
  dataSources: () => ({
    receiptApi: new ReceiptAPI(),
    fileDataSource: new FileDataSource()
  }),
});

graphqlServer.applyMiddleware({ app: app.app });

const shutDownTime = 20 * 1000;
const lightship = createLightship({shutdownHandlerTimeout: shutDownTime});

app.listen().then(server =>{
  lightship.signalReady(); 
  lightship.registerShutdownHandler(async () => {
    await new Promise((resolve, reject) =>{
      setTimeout(() => {
       resolve 
      }, shutDownTime);
    });
    server.close();
  });  
});
