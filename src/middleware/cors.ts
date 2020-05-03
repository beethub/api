import express, { Router, Request, Response, NextFunction } from "express";

class Cors {
  private _router: Router = express.Router();

  constructor(){
    this._router.use(this.setCorsHeaders);
  }

  private setCorsHeaders = (req: Request, res: Response, next: NextFunction) => {
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
  };
  
  public get router() : Router {
    return this._router;
  }
}

export default Cors;