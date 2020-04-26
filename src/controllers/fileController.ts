import express, { Request, Response } from "express";
import { Controller } from "./controller";
import http from "http";
import querystring from "querystring";
import { services } from "../config";

class FileController implements Controller {
  private _router = express.Router();
  private _path = "/file";
  private _options: URL;

  constructor(){
    this._initializeRoutes();
    this._options = new URL(services.fileUrl);
  }

  get router() {
    return this._router;
  }
  get path() {
    return this._path;
  }

  private _initializeRoutes() {
    this._router.get("/ticket", this._returnFile("ticket"))
  }

  private _returnFile = (type: string) => ( req: Request, res: Response ) => {
    const key = req.query.key.toString();
    const qs = querystring.stringify({key});
    const path = `/${type}/${"kster"}?${qs}`;
    console.log(path);
    http.get({
      host: this._options.hostname,
      port: this._options.port,
      path: path,
    }, (resp) => {
      res.setHeader('content-disposition', resp.headers['content-disposition']!);
      res.setHeader('Content-type', resp.headers['content-type']!);
      resp.pipe(res);
    })
  }
}

export default FileController;

