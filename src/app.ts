import express, { Express } from "express";
import Cors from "./middleware/cors";
import Keycloak from "keycloak-connect";
import { Server } from "http";
import FileController from "./controllers/fileController";

class App {
  private _app: Express;
  private _port: number;

  constructor(port: number, keycloak: Keycloak.Keycloak){
    this._app = express();
    this._port = port;
    this.initializeMiddlewares(keycloak);
  }

  private initializeMiddlewares(keycloak: Keycloak.Keycloak) {
    const fileCtl = new FileController();
    this._app.use(new Cors().router);
    this._app.use(keycloak.middleware());
    
    // @ts-ignore: 
    this._app.use(fileCtl.path, keycloak.protect(), fileCtl.router);
  }

  public get app() : Express {
    return this._app;
  }
  
  public listen() : Promise<Server> {
    return new Promise( (resolve) => {
      const server = this._app.listen(this._port, () => {
        console.log(`🚀 Server ready on the port ${this._port}!`);
        resolve(server);
      });
    } )
  }

}

export default App;
