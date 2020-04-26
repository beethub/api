import FormData from "form-data";
import { DataSource } from "apollo-datasource";
import http from "http";
import { services } from "../config";

class FileDataSource extends DataSource {
  private _options: URL;
  private context;

  constructor() {
    super();
    this._options = new URL(services.fileUrl);
  }

  initialize(config) {
    this.context = config.context;
  }

  public async storeFile(path: string, file): Promise<string> {
    const fd = new FormData();
    const { createReadStream, filename, mimetype } = await file;
    fd.append("file", createReadStream(), {
      filename: filename,
      contentType: mimetype,
    });
    const request = http.request({
      method: "post",
      host: this._options.hostname,
      port: this._options.port,
      path: path,
      headers: fd.getHeaders()
    });

    const response : any = await new Promise((resolve, reject) => {
      fd.pipe(request)
        .on("error", (error) => {
          console.error(error);
          reject(error);
        })
        .on("response", (res) => {
          //console.log(res);
          resolve(res);
        });
    });
    
    if (response.statusCode !== 200) {
      const error = new Error("Request Failed.\n" + `Status Code: ${response.statusCode}`);
      throw error;
    }
    let rawData = "";
    const out = await new Promise<{url: string}>((resolve, reject) => {
      response.on("data", (chunk) => {
        rawData += chunk;
      });
      response.on("end", () => {
        try {
          const parsedData = JSON.parse(rawData);
          resolve(parsedData);
        } catch (e) {
          console.error(e.message);
          reject(e);
        }
      });
    });

    //console.log(out);
    return out.url;
  }
}

export default FileDataSource;
